import { RegistrationForm } from "@/components/RegistrationForm";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src={logo} 
            alt="United for Better Pakistan" 
            className="h-16 sm:h-20 mx-auto mb-6"
          />
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
