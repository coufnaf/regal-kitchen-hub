import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppFloat />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-heading font-bold text-center mb-12">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2">Address</h3>
                <p className="text-muted-foreground">Perinthalmanna, Malappuram District, Kerala, India</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2">Phone</h3>
                <p className="text-muted-foreground">+91 123 456 7890</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground">info@regalhoreca.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-heading font-semibold text-lg mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3!2d76.22!3d10.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU4JzQ4LjAiTiA3NsKwMTMnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;