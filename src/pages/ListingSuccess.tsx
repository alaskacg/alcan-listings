import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export default function ListingSuccess() {
  const [searchParams] = useSearchParams();
  const [activated, setActivated] = useState(false);
  const listingId = searchParams.get('listing_id') || localStorage.getItem('pending_listing_id');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (listingId && !activated) {
      supabase
        .from('listings')
        .update({ status: 'active', payment_status: 'paid' })
        .eq('id', listingId)
        .then(() => {
          setActivated(true);
          localStorage.removeItem('pending_listing_id');
        });
    }
  }, [listingId, activated]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
            <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground">
            Your listing is now live and visible to thousands of Alaska buyers for 60 days.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left space-y-3">
            <h3 className="font-semibold text-blue-900">What happens next?</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>✓ Your listing is live and searchable immediately</li>
              <li>✓ Interested buyers will contact you directly</li>
              <li>✓ You can manage your listing from your dashboard</li>
              <li>✓ Listing stays active for 60 days</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/browse" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90">
              Browse Listings
            </Link>
            <Link to="/" className="px-6 py-3 border border-input rounded-lg font-semibold hover:bg-accent">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
