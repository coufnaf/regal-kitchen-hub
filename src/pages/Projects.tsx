import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppFloat />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-heading font-bold text-center mb-8">Our Projects</h1>
        <p className="text-xl text-center text-muted-foreground">Showcase of our successful installations</p>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;