import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background aurora-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient-aurora">
            404
          </h1>
        </div>
        
        {/* Message */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Looks like this trail leads to uncharted territory. Let's get you back to familiar ground.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="aurora" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Button variant="ghost" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
