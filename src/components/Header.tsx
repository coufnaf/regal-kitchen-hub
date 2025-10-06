import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkAdminRole(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className={`sticky top-0 z-50 transition-smooth ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">Regal Horeca</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-smooth">Home</Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-smooth">Products</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-smooth">About</Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-smooth">Services</Link>
            <Link to="/brands" className="text-foreground hover:text-primary transition-smooth">Brands</Link>
            <Link to="/projects" className="text-foreground hover:text-primary transition-smooth">Projects</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-smooth">Contact</Link>
            {isAdmin && (
              <Link to="/admin" className="text-primary hover:text-primary-hover font-semibold transition-smooth">Admin</Link>
            )}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            ) : (
              <Button onClick={() => navigate("/auth")} variant="default">Login</Button>
            )}
            <Button onClick={() => navigate("/enquiry")}>Get Quote</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="py-2 hover:text-primary transition-smooth" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="py-2 hover:text-primary transition-smooth" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/about" className="py-2 hover:text-primary transition-smooth" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/services" className="py-2 hover:text-primary transition-smooth" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/brands" className="py-2 hover:text-primary transition-smooth" onClick={() => setIsMenuOpen(false)}>Brands</Link>
              <Link to="/projects" className="py-2 hover:text-primary transition-smooth" onClick={() => setIsMenuOpen(false)}>Projects</Link>
              <Link to="/contact" className="py-2 hover:text-primary transition-smooth" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              {isAdmin && (
                <Link to="/admin" className="py-2 text-primary font-semibold" onClick={() => setIsMenuOpen(false)}>Admin</Link>
              )}
              <div className="pt-2 space-y-2">
                {session ? (
                  <Button onClick={handleLogout} variant="outline" className="w-full">Logout</Button>
                ) : (
                  <Button onClick={() => { navigate("/auth"); setIsMenuOpen(false); }} variant="default" className="w-full">Login</Button>
                )}
                <Button onClick={() => { navigate("/enquiry"); setIsMenuOpen(false); }} className="w-full">Get Quote</Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;