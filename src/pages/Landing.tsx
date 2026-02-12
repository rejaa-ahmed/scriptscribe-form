import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, UserPlus, ArrowRight, Scale, BookOpen, Landmark, Building2, Heart, Vote, Sparkles, Globe, Users } from "lucide-react";
import logo from "@/assets/logo.png";

const focusAreas = [
  { title: "Political Reform", description: "Transforming political systems for transparent governance and accountable leadership.", icon: Vote },
  { title: "Economic Reform", description: "Building sustainable economic policies that drive equitable growth for all.", icon: Landmark },
  { title: "Education Reform", description: "Revolutionizing education to empower future generations with knowledge.", icon: BookOpen },
  { title: "Judicial Reform", description: "Ensuring justice, rule of law, and equal protection for every citizen.", icon: Scale },
  { title: "Governance Reform", description: "Creating efficient, accountable, and transparent institutions.", icon: Building2 },
  { title: "Moral Reform", description: "Fostering ethical values and integrity across all levels of society.", icon: Heart },
];

const stats = [
  { value: "6", label: "Reform Areas", icon: Sparkles },
  { value: "Global", label: "Network", icon: Globe },
  { value: "1", label: "United Mission", icon: Users },
];

const Landing = () => {
  const { user, signOut, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative background layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,hsl(var(--primary)/0.07),transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--accent)/0.06),transparent_65%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,hsl(var(--primary)/0.03),transparent_60%)]" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img 
              src={logo} 
              alt="United for Better Pakistan" 
              className="h-10 sm:h-12 hover:scale-105 transition-transform duration-200"
            />
            
            <div className="flex items-center gap-3">
              {!isLoading && (
                user ? (
                  <>
                    <Link to="/register">
                      <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
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
                      <Button variant="ghost" className="font-semibold hover:bg-secondary/80">Sign In</Button>
                    </Link>
                    <Link to="/auth">
                      <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
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
      <section className="relative py-24 sm:py-36 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-sm font-semibold mb-8 animate-fade-in border border-primary/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            Building a Better Pakistan Together
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.08] mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            Unite Beyond Divisions.{" "}
            <span className="text-gradient-primary">
              Reform Systems.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.25s", opacity: 0 }}>
            Let us rise above political, ethnic, religious, and sectarian affiliations to radically transform Pakistan's future through systematic reform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <Link to={user ? "/register" : "/auth"}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Join the Movement
              </Button>
            </Link>
            <a 
              href="https://unitedforbetterpakistan.org/#" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 hover:-translate-y-1 transition-all duration-300 border-border/60 hover:border-primary/40 group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/40 bg-card/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-3 gap-6 text-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="animate-fade-in group" style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 sm:py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
              What We Stand For
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground animate-fade-in-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
              Our Focus Areas
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-card border border-border/50 rounded-2xl p-7 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${0.8 + index * 0.08}s`, opacity: 0 }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{area.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{area.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to={user ? "/register" : "/auth"} className="block group">
            <div className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-2 border-primary/20 rounded-3xl p-12 sm:p-16 text-center hover:border-primary/40 hover:shadow-[0_25px_60px_-12px_hsl(var(--primary)/0.15)] transition-all duration-700 cursor-pointer overflow-hidden">
              {/* Animated glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1),transparent_60%)] group-hover:scale-125 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.08),transparent_60%)] group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-5 group-hover:scale-[1.02] transition-transform duration-500">
                  Be a Part of The Solution
                </h2>
                <p className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto leading-relaxed">
                  Your skills, expertise, and commitment can help transform Pakistan. Join thousands working toward systemic reform.
                </p>
                <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-base px-8 py-3.5 rounded-xl group-hover:gap-4 group-hover:shadow-lg transition-all duration-500">
                  Join the Movement
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 bg-card/20">
        <div className="max-w-6xl mx-auto text-center">
          <img 
            src={logo} 
            alt="United for Better Pakistan" 
            className="h-12 mx-auto mb-5 opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} United for Better Pakistan. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <a 
              href="https://unitedforbetterpakistan.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 font-medium"
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
