import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Home, LogOut, Search, Users, Loader2, ShieldAlert } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  country: string | null;
  pakistan_degree: string | null;
  pakistan_university: string | null;
  overseas_degree: string | null;
  overseas_university: string | null;
  current_occupation: string | null;
  time_commitment: string | null;
  created_at: string;
}

const Admin = () => {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) {
        console.error("Error checking admin role:", roleError);
        toast.error("Failed to verify admin access");
        setIsLoading(false);
        return;
      }

      if (!roleData) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      setIsAdmin(true);

      // Fetch registrations
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching registrations:", error);
        toast.error("Failed to load registrations");
      } else {
        setRegistrations(data || []);
      }

      setIsLoading(false);
    };

    if (!authLoading) {
      checkAdminAndFetch();
    }
  }, [user, authLoading]);

  const filteredRegistrations = registrations.filter((reg) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reg.first_name.toLowerCase().includes(searchLower) ||
      reg.last_name.toLowerCase().includes(searchLower) ||
      reg.email.toLowerCase().includes(searchLower) ||
      reg.city?.toLowerCase().includes(searchLower) ||
      reg.country?.toLowerCase().includes(searchLower)
    );
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <ShieldAlert className="h-16 w-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to access the admin dashboard.
            </p>
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <ShieldAlert className="h-16 w-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">
              You don't have admin privileges to access this page.
            </p>
            <Link to="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
              className="h-12 sm:h-16 cursor-pointer hover:opacity-80 transition-opacity"
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

        {/* Dashboard */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Registration Submissions</CardTitle>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              Total: {filteredRegistrations.length} registration(s)
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Pakistan Education</TableHead>
                    <TableHead>Overseas Education</TableHead>
                    <TableHead>Occupation</TableHead>
                    <TableHead>Time Commitment</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                        {searchTerm ? "No registrations match your search" : "No registrations yet"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRegistrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">
                          {reg.first_name} {reg.last_name}
                        </TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.phone || "-"}</TableCell>
                        <TableCell>
                          {[reg.city, reg.country].filter(Boolean).join(", ") || "-"}
                        </TableCell>
                        <TableCell>
                          {reg.pakistan_degree ? (
                            <span>
                              {reg.pakistan_degree}
                              {reg.pakistan_university && <br />}
                              <span className="text-xs text-muted-foreground">
                                {reg.pakistan_university}
                              </span>
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {reg.overseas_degree ? (
                            <span>
                              {reg.overseas_degree}
                              {reg.overseas_university && <br />}
                              <span className="text-xs text-muted-foreground">
                                {reg.overseas_university}
                              </span>
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>{reg.current_occupation || "-"}</TableCell>
                        <TableCell>{reg.time_commitment || "-"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} United for Better Pakistan. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Admin;
