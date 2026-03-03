import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-destructive/10 p-6 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="text-6xl font-black font-display mb-2 tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button size="lg">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
