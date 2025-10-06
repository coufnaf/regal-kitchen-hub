import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Services = () => {
  const services = [
    { title: "Kitchen Planning", description: "Comprehensive kitchen design and planning services" },
    { title: "Custom SS Fabrication", description: "Bespoke stainless steel fabrication solutions" },
    { title: "Courier & Delivery", description: "Fast and reliable delivery across India" },
    { title: "Installation", description: "Professional installation services" },
    { title: "AMC & Repairs", description: "Annual maintenance contracts and repair services" },
    { title: "Spare Parts", description: "Original spare parts for all equipment" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppFloat />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-heading font-bold text-center mb-12">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-card p-8 rounded-xl shadow-lg hover-lift">
              <h3 className="text-2xl font-heading font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;