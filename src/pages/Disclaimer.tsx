import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Scale, AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <Scale className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Disclaimer
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Important Notice Banner */}
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">Important Legal Notice</h2>
                <p className="text-foreground leading-relaxed">
                  Alaska Listings LLC is a <strong>listing service only</strong>. We do not participate in, endorse, verify, or guarantee any transactions, products, services, or claims made in listings. All transactions are conducted entirely between buyers and sellers at their own risk.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-8">
            
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">No Warranty or Guarantee</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alaska Listings LLC makes NO WARRANTIES OR GUARANTEES regarding any listings, items, services, or parties using our platform. This includes but is not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>The accuracy, completeness, or truthfulness of any listing</li>
                <li>The quality, safety, legality, or merchantability of items listed</li>
                <li>The identity, trustworthiness, or reliability of any user</li>
                <li>The ability of sellers to complete sales or buyers to complete purchases</li>
                <li>The condition, history, or ownership of any item</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Transaction Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                ALL TRANSACTIONS ARE CONDUCTED ENTIRELY BETWEEN BUYERS AND SELLERS. Alaska Listings LLC:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Does not inspect, verify, or authenticate any items or listings</li>
                <li>Does not handle money, goods, or services for any transaction</li>
                <li>Does not mediate disputes between parties</li>
                <li>Does not provide escrow or payment protection services</li>
                <li>Has no control over and accepts no liability for any transaction</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Buyer Responsibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are considering purchasing an item or service through our platform, YOU ARE SOLELY RESPONSIBLE for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Verifying the identity and reliability of the seller</li>
                <li>Inspecting items before purchase</li>
                <li>Verifying titles, ownership, and legal status of items (especially vehicles, boats, real estate)</li>
                <li>Conducting title searches and lien checks where applicable</li>
                <li>Obtaining professional inspections (home inspections, marine surveys, mechanical inspections)</li>
                <li>Understanding and complying with all applicable laws and regulations</li>
                <li>Securing safe payment methods and meeting locations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Seller Responsibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are posting a listing, YOU ARE SOLELY RESPONSIBLE for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>The accuracy and truthfulness of your listing</li>
                <li>Your legal right to sell the item or provide the service</li>
                <li>Compliance with all applicable laws, including disclosure requirements</li>
                <li>Providing clear title and documentation where applicable</li>
                <li>Any tax obligations arising from sales</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                UNDER NO CIRCUMSTANCES SHALL ALASKA LISTINGS LLC, ITS OWNERS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY DAMAGES WHATSOEVER ARISING FROM OR RELATED TO:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Any listing or its content</li>
                <li>Any transaction or attempted transaction</li>
                <li>Any communication between users</li>
                <li>Any loss, damage, injury, or death related to items or services listed</li>
                <li>Any fraud, misrepresentation, or illegal activity by users</li>
                <li>Any failure of the platform or services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Vehicle & Vessel Sales</h2>
              <p className="text-muted-foreground leading-relaxed">
                For vehicles, boats, and other titled property: ALWAYS verify title status with the Alaska DMV or appropriate agency, check for liens, obtain a vehicle history report, and have a qualified mechanic or surveyor inspect the item before purchase. We do not verify any ownership claims.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Real Estate Transactions</h2>
              <p className="text-muted-foreground leading-relaxed">
                For real estate listings: Listings are for informational purposes only. ALWAYS work with licensed real estate professionals, attorneys, and title companies. Conduct proper due diligence including title searches, property inspections, surveys, and review of all relevant documents.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Guide Services & Equipment</h2>
              <p className="text-muted-foreground leading-relaxed">
                For guide services and equipment listings: Verify all licenses, permits, insurance, and qualifications independently. Outdoor activities in Alaska carry inherent risks. We do not verify credentials or safety records.
              </p>
            </section>

            <section className="bg-secondary/30 rounded-xl p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">Acknowledgment</h2>
              <p className="text-foreground leading-relaxed">
                BY USING ALASKA LISTINGS LLC SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO THIS DISCLAIMER. YOU ACCEPT FULL RESPONSIBILITY FOR ANY TRANSACTIONS YOU ENGAGE IN AND RELEASE ALASKA LISTINGS LLC FROM ALL LIABILITY.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
