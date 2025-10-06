import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">Regal Horeca</h3>
            <p className="text-background/80 mb-4">
              Premium supplier of kitchen, hotel, and catering equipment for professionals across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-smooth"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-smooth"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-smooth"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-background/80 hover:text-primary transition-smooth">Products</Link></li>
              <li><Link to="/about" className="text-background/80 hover:text-primary transition-smooth">About Us</Link></li>
              <li><Link to="/services" className="text-background/80 hover:text-primary transition-smooth">Services</Link></li>
              <li><Link to="/brands" className="text-background/80 hover:text-primary transition-smooth">Brands</Link></li>
              <li><Link to="/projects" className="text-background/80 hover:text-primary transition-smooth">Projects</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-background/80">
              <li>Kitchen Planning</li>
              <li>Custom SS Fabrication</li>
              <li>Courier & Delivery</li>
              <li>Installation</li>
              <li>AMC & Repairs</li>
              <li>Spare Parts</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-background/80">Perinthalmanna, Malappuram, Kerala</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} />
                <span className="text-background/80">+91 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <span className="text-background/80">info@regalhoreca.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; {new Date().getFullYear()} Regal Horeca. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;