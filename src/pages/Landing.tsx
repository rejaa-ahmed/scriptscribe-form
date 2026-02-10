import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, UserPlus } from "lucide-react";
import logo from "@/assets/logo.png";

const Landing = () => {
  const { user, signOut, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img 
              src={logo} 
              alt="United for Better Pakistan" 
              className="h-10 sm:h-12"
            />
            
            <div className="flex items-center gap-4">
              {!isLoading && (
                user ? (
                  <>
                    <Link to="/register">
                      <Button className="bg-primary hover:bg-primary/90">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register Now
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={signOut}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link to="/auth">
                      <Button className="bg-primary hover:bg-primary/90">
                        Join Us
                      </Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Let us unite beyond political, ethnic, religious, sectarian, left and right affiliations to radically reform Systems in Pakistan!
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of Pakistanis worldwide in building a better future for our nation through systematic reform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? "/register" : "/auth"}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                <UserPlus className="mr-2 h-5 w-5" />
                Join the Movement
              </Button>
            </Link>
            <a 
              href="https://unitedforbetterpakistan.org/#" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-12">
            Our Focus Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Political Reform", description: "Transforming political systems for transparent governance" },
              { title: "Economic Reform", description: "Building sustainable economic policies for growth" },
              { title: "Education Reform", description: "Revolutionizing education for future generations" },
              { title: "Judicial Reform", description: "Ensuring justice and rule of law for all" },
              { title: "Governance Reform", description: "Creating efficient and accountable institutions" },
              { title: "Moral Reform", description: "Fostering ethical values in society" },
            ].map((area, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Be a Part of The Solution */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to={user ? "/register" : "/auth"} className="block group">
            <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-10 sm:p-14 text-center hover:bg-primary/10 hover:border-primary/40 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 group-hover:scale-105 transition-transform duration-300">
                Be a Part of The Solution
              </h2>
              <p className="text-muted-foreground mb-6 text-lg max-w-xl mx-auto">
                Your skills, expertise, and commitment can help transform Pakistan. Join thousands working toward systemic reform.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-lg group-hover:gap-3 transition-all duration-300">
                Join the Movement
                <UserPlus className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <img 
            src={logo} 
            alt="United for Better Pakistan" 
            className="h-12 mx-auto mb-4"
          />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} United for Better Pakistan. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <a 
              href="https://unitedforbetterpakistan.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Visit our main website →
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
