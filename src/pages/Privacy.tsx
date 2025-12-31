import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border space-y-8">
            
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you use our Services, we may collect the following information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Listing Information:</strong> Name, email, phone number, location, and listing content you provide</li>
                <li><strong>Payment Information:</strong> Payment details processed through our secure payment processor</li>
                <li><strong>Usage Data:</strong> IP addresses, browser type, pages visited, and access times</li>
                <li><strong>Images:</strong> Photos you upload with your listings</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To publish and manage your listings</li>
                <li>To process payments for listing fees</li>
                <li>To communicate with you about your listings or account</li>
                <li>To improve and maintain our Services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell your personal information. We may share information with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Public Display:</strong> Listing information including contact details you choose to include</li>
                <li><strong>Service Providers:</strong> Third parties who help us operate our Services (payment processors, hosting providers)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">4. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                Listing data is retained for 60 days during the active listing period, plus an additional 30 days for administrative purposes. After this period, listing content is deleted. We may retain certain information as required by law or for legitimate business purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">6. Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to improve your experience, analyze usage, and remember preferences. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related questions or requests, contact us at: privacy@aklistings.com
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
