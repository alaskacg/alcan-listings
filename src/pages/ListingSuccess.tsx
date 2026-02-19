import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Home } from "lucide-react";

export default function ListingSuccess() {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Your listing is now live and visible to thousands of Alaska buyers.
            It will remain active for 60 days across our network.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left space-y-3">
            <h3 className="font-semibold text-blue-900">What happens next?</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Your listing is live and searchable immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>You'll receive a confirmation email with your listing details</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Interested buyers will contact you directly via your listing info</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>You can manage your listing from your dashboard anytime</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/post"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Post Another Listing
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
