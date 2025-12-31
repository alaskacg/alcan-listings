import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, FileText, AlertTriangle, Scale } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-8">
              
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using Alaska Listings LLC's services ("Services"), including but not limited to aklistings.com and all affiliated domain properties, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Alaska Listings LLC operates an online classified listing platform that allows users to post advertisements for goods and services. Our Services include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Hosting of user-submitted listings for a fee of $10 per listing</li>
                  <li>Display of listings for a period of 60 days from the date of publication</li>
                  <li>Categorization of listings across multiple specialized websites and regional platforms</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">3. Listing Service Only</h2>
                <div className="bg-secondary/50 rounded-xl p-4 mb-4 border border-border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-foreground text-sm font-medium">
                      IMPORTANT: Alaska Listings LLC is a LISTING SERVICE ONLY. We do not participate in, facilitate, endorse, or guarantee any transactions between users.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We provide a platform for users to post and view listings. All transactions, negotiations, inspections, and exchanges of goods, services, or money occur solely between the parties involved. Alaska Listings LLC is not a party to any transaction and assumes no responsibility for the completion, quality, safety, or legality of any transaction.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">4. User Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">By using our Services, you agree to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate, truthful, and complete information in your listings</li>
                  <li>Ensure you have the legal right to sell any items or services listed</li>
                  <li>Comply with all applicable local, state, and federal laws</li>
                  <li>Not post fraudulent, misleading, or deceptive listings</li>
                  <li>Not post prohibited items including illegal goods, stolen property, or hazardous materials</li>
                  <li>Conduct your own due diligence before completing any transaction</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">5. Payment and Listing Duration</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>All listings cost $10 USD, payable at the time of submission</li>
                  <li>Listings are active for 60 calendar days from publication</li>
                  <li>Listings are automatically removed upon expiration</li>
                  <li>Payments are non-refundable except at our sole discretion</li>
                  <li>To renew a listing, users must submit a new listing and payment</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">6. Content Moderation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Alaska Listings LLC reserves the right to remove, edit, or refuse any listing at our sole discretion, without refund, for any reason including but not limited to: violation of these terms, inappropriate content, suspected fraud, or legal concerns.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALASKA LISTINGS LLC, ITS OWNERS, EMPLOYEES, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO YOUR USE OF THE SERVICES OR ANY TRANSACTION CONDUCTED THROUGH OR AS A RESULT OF THE SERVICES.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">8. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Alaska Listings LLC and its affiliates from any claims, damages, losses, liabilities, and expenses arising from your use of the Services, your listings, or any transaction you participate in.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">9. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Alaska, without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at: support@aklistings.com
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
