import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppFloat />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-heading font-bold mb-8">About Regal Horeca</h1>
        <div className="prose max-w-none">
          <p className="text-xl mb-6">We are committed to providing exceptional quality products and services for the event management and hospitality industry.</p>
          <h2 className="text-3xl font-heading font-semibold mt-8 mb-4">Our Vision</h2>
          <p>Regal Horeca is a renowned supplier of comprehensive event management and hospitality products, founded in 1994 by Yusuf Malabar in Perinthalmanna, Malappuram District, Kerala.</p>
          <h2 className="text-3xl font-heading font-semibold mt-8 mb-4">Our Mission</h2>
          <p>Our mission is to ensure customer satisfaction through quality and timely delivery of our products.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;