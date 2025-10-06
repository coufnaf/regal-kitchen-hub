import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Download, MessageCircle } from "lucide-react";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().max(20).optional(),
  message: z.string().min(1, "Message is required").max(1000),
});

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("id", id)
      .single();
    if (data) setProduct(data);
  };

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      enquirySchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    const { error } = await supabase.from("enquiries").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      product_id: id,
    });

    if (error) {
      toast.error("Failed to submit enquiry");
    } else {
      toast.success("Enquiry submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product?.name} (SKU: ${product?.sku})`;
    window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!product) {
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

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-primary font-semibold mb-2">{product.categories?.name}</p>
              <h1 className="text-4xl font-heading font-bold mb-4">{product.name}</h1>
              {product.sku && <p className="text-muted-foreground">SKU: {product.sku}</p>}
            </div>

            {product.price && (
              <p className="text-3xl font-bold text-primary">₹{product.price}</p>
            )}

            {product.short_description && (
              <p className="text-lg text-muted-foreground">{product.short_description}</p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate("/enquiry", { state: { productId: id } })} size="lg">
                Request Quote
              </Button>
              <Button onClick={handleWhatsApp} size="lg" variant="outline">
                <MessageCircle className="mr-2" size={20} />
                Ask on WhatsApp
              </Button>
              {product.pdf_url && (
                <Button asChild size="lg" variant="outline">
                  <a href={product.pdf_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2" size={20} />
                    Spec Sheet
                  </a>
                </Button>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-muted p-6 rounded-xl">
              <h3 className="text-xl font-heading font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.brand && (
                  <div>
                    <p className="text-sm text-muted-foreground">Brand</p>
                    <p className="font-semibold">{product.brand}</p>
                  </div>
                )}
                {product.material && (
                  <div>
                    <p className="text-sm text-muted-foreground">Material</p>
                    <p className="font-semibold">{product.material}</p>
                  </div>
                )}
                {product.finish && (
                  <div>
                    <p className="text-sm text-muted-foreground">Finish</p>
                    <p className="font-semibold">{product.finish}</p>
                  </div>
                )}
                {product.color && (
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-semibold">{product.color}</p>
                  </div>
                )}
                {product.size && (
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-semibold">{product.size}</p>
                  </div>
                )}
                {product.capacity && (
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-semibold">{product.capacity}</p>
                  </div>
                )}
                {product.power && (
                  <div>
                    <p className="text-sm text-muted-foreground">Power</p>
                    <p className="font-semibold">{product.power}</p>
                  </div>
                )}
                {product.phase && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phase</p>
                    <p className="font-semibold">{product.phase}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="enquiry">Send Enquiry</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">
                  {product.description || "No detailed description available."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="enquiry" className="mt-6">
              <form onSubmit={handleEnquiry} className="max-w-2xl space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit">Submit Enquiry</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;