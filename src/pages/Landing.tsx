import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, UserPlus, ArrowRight, Scale, BookOpen, Landmark, Building2, Heart, Vote } from "lucide-react";
import logo from "@/assets/logo.png";

const focusAreas = [
  { title: "Political Reform", description: "Transforming political systems for transparent governance", icon: Vote },
  { title: "Economic Reform", description: "Building sustainable economic policies for growth", icon: Landmark },
  { title: "Education Reform", description: "Revolutionizing education for future generations", icon: BookOpen },
  { title: "Judicial Reform", description: "Ensuring justice and rule of law for all", icon: Scale },
  { title: "Governance Reform", description: "Creating efficient and accountable institutions", icon: Building2 },
  { title: "Moral Reform", description: "Fostering ethical values in society", icon: Heart },
];

const Landing = () => {
  const { user, signOut, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--primary)/0.06),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(var(--accent)/0.08),transparent_70%)]" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img 
              src={logo} 
              alt="United for Better Pakistan" 
              className="h-10 sm:h-12"
            />
            
            <div className="flex items-center gap-3">
              {!isLoading && (
                user ? (
                  <>
                    <Link to="/register">
                      <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
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
                      <Button variant="ghost" className="font-semibold">Sign In</Button>
                    </Link>
                    <Link to="/auth">
                      <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
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
      <section className="relative py-20 sm:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Building a Better Pakistan Together
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            Unite Beyond Divisions.{" "}
            <span className="text-gradient-primary">
              Reform Systems.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.25s", opacity: 0 }}>
            Let us rise above political, ethnic, religious, and sectarian affiliations to radically transform Pakistan's future through systematic reform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <Link to={user ? "/register" : "/auth"}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-13 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                <UserPlus className="mr-2 h-5 w-5" />
                Join the Movement
              </Button>
            </Link>
            <a 
              href="https://unitedforbetterpakistan.org/#" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-lg px-8 h-13 hover:-translate-y-0.5 transition-all">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { value: "6", label: "Reform Areas" },
            { value: "Global", label: "Network" },
            { value: "1", label: "United Mission" },
          ].map((stat, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}>
              <div className="text-2xl sm:text-3xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 sm:py-28 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
              What We Stand For
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-foreground animate-fade-in-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
              Our Focus Areas
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div 
                  key={index}
                  className="group bg-card border border-border/60 rounded-xl p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.8 + index * 0.08}s`, opacity: 0 }}
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{area.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Be a Part of The Solution */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to={user ? "/register" : "/auth"} className="block group">
            <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-2 border-primary/20 rounded-2xl p-10 sm:p-14 text-center hover:border-primary/40 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4 group-hover:scale-[1.03] transition-transform duration-300">
                  Be a Part of The Solution
                </h2>
                <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto leading-relaxed">
                  Your skills, expertise, and commitment can help transform Pakistan. Join thousands working toward systemic reform.
                </p>
                <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-base px-6 py-3 rounded-lg group-hover:gap-3 group-hover:shadow-lg transition-all duration-300">
                  Join the Movement
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto text-center">
          <img 
            src={logo} 
            alt="United for Better Pakistan" 
            className="h-12 mx-auto mb-4 opacity-80"
          />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} United for Better Pakistan. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <a 
              href="https://unitedforbetterpakistan.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-medium"
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
