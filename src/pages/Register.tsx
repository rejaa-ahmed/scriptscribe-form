import { Link } from "react-router-dom";
import { RegistrationForm } from "@/components/RegistrationForm";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import logo from "@/assets/logo.png";

const Register = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/">
              <img 
                src={logo} 
                alt="United for Better Pakistan" 
                className="h-16 sm:h-20 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
          
          {user?.email && (
            <p className="text-sm text-muted-foreground mb-4">
              Signed in as <span className="font-medium text-foreground">{user.email}</span>
            </p>
          )}
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
            Complete Your Registration
          </h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to join the movement
          </p>
        </div>
        
        {/* Registration Form */}
        <RegistrationForm />
        
        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} United for Better Pakistan. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
