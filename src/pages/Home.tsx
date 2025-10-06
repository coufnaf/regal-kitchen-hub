import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CategoryCard from "@/components/CategoryCard";
import { supabase } from "@/integrations/supabase/client";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);

  const heroSlides = [
    { image: hero1, title: "Premium Commercial Kitchenware", subtitle: "Equip your kitchen for success" },
    { image: hero2, title: "Elegant Dining Solutions", subtitle: "Custom tableware for restaurants & hotels" },
    { image: hero3, title: "Professional Kitchen Equipment", subtitle: "Power for pro kitchens" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("created_at");
    if (data) setCategories(data);
  };

  const services = [
    "Kitchen Planning",
    "Custom SS Fabrication",
    "Courier & Delivery",
    "Installation",
    "AMC & Repairs",
    "Spare Parts"
  ];

  const specializations = [
    "Cloud Kitchens",
    "Cafés",
    "Bakeries",
    "Hotels",
    "Catering"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppFloat />

      {/* Hero Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-balance">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-balance">{slide.subtitle}</p>
                <Button onClick={() => navigate("/products")} size="lg" className="text-lg px-8">
                  Know More
                </Button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-smooth"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-smooth"
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentSlide ? "bg-primary w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              tagline={category.tagline || ""}
              imageUrl={category.image_url || ""}
            />
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">Custom Tableware for Restaurants, Cafés & Hotels</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            All in One Place - Turn everyday into an occasion
          </p>
          <Button onClick={() => navigate("/about")} size="lg" variant="outline">
            Know More
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-xl shadow-md hover-lift">
              <p className="font-semibold">{service}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button onClick={() => navigate("/services")} variant="outline">
            Read More
          </Button>
        </div>
      </section>

      {/* Specializations */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">What We Specialise In</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {specializations.map((spec, index) => (
              <div key={index} className="text-center p-8 bg-background rounded-xl shadow-md hover-lift">
                <h3 className="text-xl font-heading font-semibold">{spec}</h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => navigate("/projects")}>
              See Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Success Numbers */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-5xl font-heading font-bold text-primary mb-2">25+</h3>
            <p className="text-muted-foreground">Years</p>
          </div>
          <div>
            <h3 className="text-5xl font-heading font-bold text-primary mb-2">6000+</h3>
            <p className="text-muted-foreground">Products</p>
          </div>
          <div>
            <h3 className="text-5xl font-heading font-bold text-primary mb-2">17+</h3>
            <p className="text-muted-foreground">Showrooms</p>
          </div>
          <div>
            <h3 className="text-5xl font-heading font-bold text-primary mb-2">50000+</h3>
            <p className="text-muted-foreground">Customers</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">Ready to Elevate Your Kitchen?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with our team for custom solutions tailored to your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/contact")} size="lg" variant="secondary">
              Contact Us
            </Button>
            <Button onClick={() => navigate("/enquiry")} size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
              Request Quote
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;