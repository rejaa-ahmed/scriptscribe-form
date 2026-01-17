import { RegistrationForm } from "@/components/RegistrationForm";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import logo from "@/assets/logo.png";

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-24" /> {/* Spacer for centering */}
            <img 
              src={logo} 
              alt="United for Better Pakistan" 
              className="h-16 sm:h-20"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={signOut}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          
          {user?.email && (
            <p className="text-sm text-muted-foreground mb-4">
              Signed in as <span className="font-medium text-foreground">{user.email}</span>
            </p>
          )}
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
            Let us unite beyond political, ethnic, religious, sectarian, left and right affiliations to radically reform Systems in Pakistan!
          </h1>
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

export default Index;
