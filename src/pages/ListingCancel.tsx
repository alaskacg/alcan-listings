import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ListingCancel() {
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get('listing_id');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full">
            <svg className="w-12 h-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Payment Cancelled</h1>
          <p className="text-lg text-muted-foreground">
            Your listing has been saved but is not yet active. Complete payment to publish it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/post-listing" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90">
              Try Again
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
