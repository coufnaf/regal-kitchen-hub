import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchCategory();
      fetchProducts();
    }
  }, [id]);

  const fetchCategory = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
    if (data) setCategory(data);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", id)
      .eq("active", true)
      .order("name");
    if (data) setProducts(data);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppFloat />

      {/* Category Hero */}
      <section className="relative h-[40vh] overflow-hidden">
        <img
          src={category.image_url || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80"}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-heading font-bold mb-4">{category.name}</h1>
            <p className="text-2xl italic">{category.tagline}</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-heading font-bold mb-8">Available Products</h2>
        
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No products available in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-card rounded-xl shadow-lg overflow-hidden hover-lift"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
                  {product.brand && <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>}
                  {product.short_description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {product.short_description}
                    </p>
                  )}
                  {product.price && (
                    <p className="text-primary font-semibold text-lg mb-3">₹{product.price}</p>
                  )}
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                    <span>View Details</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Category;