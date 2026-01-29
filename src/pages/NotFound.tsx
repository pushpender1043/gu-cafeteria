
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-foodfusion-orange">404</h1>
        <p className="text-2xl font-semibold mb-2">Page not found</p>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild className="bg-foodfusion-orange hover:bg-orange-600">
          <Link to="/">Return to Menu</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
