import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CategoryCard from "@/components/CategoryCard";
import { supabase } from "@/integrations/supabase/client";

const Products = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("name");
    if (data) setCategories(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppFloat />

      <section className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-heading font-bold text-center mb-4">Our Product Categories</h1>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore our comprehensive range of commercial kitchenware and hospitality equipment
        </p>

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

      <Footer />
    </div>
  );
};

export default Products;