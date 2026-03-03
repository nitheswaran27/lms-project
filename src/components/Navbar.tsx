import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary transition-opacity hover:opacity-90">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </div>
          LearnHub
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            to="/courses" 
            className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname === '/courses' ? 'text-accent' : 'text-muted-foreground'}`}
          >
            Courses
          </Link>
          
          {isAuthenticated ? (
            <>
              {user?.role === "student" && (
                <Link 
                  to="/my-courses" 
                  className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname === '/my-courses' ? 'text-accent' : 'text-muted-foreground'}`}
                >
                  My Learning
                </Link>
              )}
              {user?.role === "admin" && (
                <Link 
                  to="/admin-dashboard" 
                  className={`text-sm font-medium transition-colors hover:text-accent ${location.pathname === '/admin-dashboard' ? 'text-accent' : 'text-muted-foreground'}`}
                >
                  Dashboard
                </Link>
              )}
              
              <div className="flex items-center gap-3 ml-2 border-l border-border pl-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden text-sm font-medium md:inline-block">{user?.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="accent" size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
