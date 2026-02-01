import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ECOSYSTEM_HUB_URL = 'https://jneflbektcqalwhgfuyo.supabase.co/functions/v1/ecosystem-listings';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, listing_id } = await req.json();

    console.log(`Ecosystem sync action: ${action}, listing: ${listing_id}`);

    switch (action) {
      case 'push_listing': {
        // Fetch the listing to push
        const { data: listing, error: fetchError } = await supabase
          .from('listings')
          .select('*')
          .eq('id', listing_id)
          .single();

        if (fetchError || !listing) {
          console.error('Failed to fetch listing:', fetchError);
          return new Response(
            JSON.stringify({ success: false, error: 'Listing not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Push to ecosystem hub
        const hubPayload = {
          action: 'receive_listing',
          source_site: 'alcan',
          listing: {
            id: listing.id,
            title: listing.title,
            description: listing.description,
            price: listing.price,
            category: listing.category,
            region: listing.region,
            location: listing.location,
            images: listing.images,
            contact_email: listing.contact_email,
            contact_phone: listing.contact_phone,
            contact_name: listing.contact_name,
            created_at: listing.created_at,
            source_site: 'alcan',
          }
        };

        console.log('Pushing listing to ecosystem hub:', hubPayload);

        try {
          const hubResponse = await fetch(ECOSYSTEM_HUB_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(hubPayload),
          });

          const hubResult = await hubResponse.json();
          console.log('Ecosystem hub response:', hubResult);

          // Update listing to mark as syndicated
          await supabase
            .from('listings')
            .update({ syndicate_to_statewide: true })
            .eq('id', listing_id);

          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'Listing pushed to ecosystem hub',
              hub_response: hubResult 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } catch (hubError) {
          console.error('Failed to push to ecosystem hub:', hubError);
          // Don't fail the whole operation if hub is unavailable
          return new Response(
            JSON.stringify({ 
              success: true, 
              warning: 'Listing created but hub sync failed - will retry',
              error: hubError instanceof Error ? hubError.message : 'Hub unavailable'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      case 'sync_all_active': {
        // Sync all active paid listings to the hub
        const { data: listings, error } = await supabase
          .from('listings')
          .select('*')
          .eq('status', 'active')
          .in('payment_status', ['paid', 'beta_free'])
          .order('created_at', { ascending: false });

        if (error) throw error;

        const results = [];
        for (const listing of listings || []) {
          try {
            const hubPayload = {
              action: 'receive_listing',
              source_site: 'alcan',
              listing: {
                id: listing.id,
                title: listing.title,
                description: listing.description,
                price: listing.price,
                category: listing.category,
                region: listing.region,
                location: listing.location,
                images: listing.images,
                contact_email: listing.contact_email,
                contact_phone: listing.contact_phone,
                contact_name: listing.contact_name,
                created_at: listing.created_at,
                source_site: 'alcan',
              }
            };

            const hubResponse = await fetch(ECOSYSTEM_HUB_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(hubPayload),
            });

            results.push({ id: listing.id, status: hubResponse.ok ? 'synced' : 'failed' });
          } catch (e) {
            results.push({ id: listing.id, status: 'error' });
          }
        }

        console.log(`Synced ${results.filter(r => r.status === 'synced').length}/${listings?.length || 0} listings`);

        return new Response(
          JSON.stringify({ success: true, results, total: listings?.length || 0 }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'provide_listings': {
        // Endpoint for the hub to pull our listings
        const { data: listings, error } = await supabase
          .from('listings')
          .select(`
            id, title, description, price, category, region, location,
            images, contact_email, contact_phone, contact_name,
            created_at
          `)
          .eq('status', 'active')
          .in('payment_status', ['paid', 'beta_free'])
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;

        // Add source_site to each listing
        const listingsWithSource = (listings || []).map(l => ({
          ...l,
          source_site: 'alcan'
        }));

        console.log(`Providing ${listingsWithSource.length} listings to ecosystem hub`);

        return new Response(
          JSON.stringify({ 
            success: true, 
            listings: listingsWithSource,
            count: listingsWithSource.length,
            source: 'alcan'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Ecosystem sync error:', errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
