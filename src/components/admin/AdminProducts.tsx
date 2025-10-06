import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    category_id: "",
    name: "",
    sku: "",
    description: "",
    short_description: "",
    brand: "",
    material: "",
    finish: "",
    color: "",
    size: "",
    capacity: "",
    power: "",
    phase: "",
    image_url: "",
    pdf_url: "",
    price: "",
    active: true,
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").eq("active", true);
    if (data) setCategories(data);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*, categories(name)")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...currentProduct,
      price: currentProduct.price ? parseFloat(currentProduct.price) : null,
    };

    if (isEditing) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", currentProduct.id);

      if (error) {
        toast.error("Failed to update product");
      } else {
        toast.success("Product updated!");
        resetForm();
        fetchProducts();
      }
    } else {
      const { id, ...insertData } = productData;
      const { error } = await supabase.from("products").insert(insertData);

      if (error) {
        toast.error("Failed to create product");
      } else {
        toast.success("Product created!");
        resetForm();
        fetchProducts();
      }
    }
  };

  const handleEdit = (product: any) => {
    setCurrentProduct({
      ...product,
      price: product.price?.toString() || "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete product");
    } else {
      toast.success("Product deleted!");
      fetchProducts();
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      id: "",
      category_id: "",
      name: "",
      sku: "",
      description: "",
      short_description: "",
      brand: "",
      material: "",
      finish: "",
      color: "",
      size: "",
      capacity: "",
      power: "",
      phase: "",
      image_url: "",
      pdf_url: "",
      price: "",
      active: true,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">{isEditing ? "Edit Product" : "Add Product"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category_id">Category</Label>
                <Select
                  value={currentProduct.category_id}
                  onValueChange={(value) => setCurrentProduct({ ...currentProduct, category_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={currentProduct.sku}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={currentProduct.brand}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  value={currentProduct.material}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, material: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="finish">Finish</Label>
                <Input
                  id="finish"
                  value={currentProduct.finish}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, finish: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={currentProduct.color}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, color: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  value={currentProduct.size}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, size: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  value={currentProduct.capacity}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, capacity: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="power">Power</Label>
                <Input
                  id="power"
                  value={currentProduct.power}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, power: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phase">Phase</Label>
                <Input
                  id="phase"
                  value={currentProduct.phase}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, phase: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                value={currentProduct.short_description}
                onChange={(e) => setCurrentProduct({ ...currentProduct, short_description: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={currentProduct.description}
                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={currentProduct.image_url}
                onChange={(e) => setCurrentProduct({ ...currentProduct, image_url: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="pdf_url">Spec Sheet PDF URL</Label>
              <Input
                id="pdf_url"
                value={currentProduct.pdf_url}
                onChange={(e) => setCurrentProduct({ ...currentProduct, pdf_url: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={currentProduct.active}
                onCheckedChange={(checked) => setCurrentProduct({ ...currentProduct, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="flex space-x-2">
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="pt-6">
              {product.image_url && (
                <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              )}
              <h3 className="font-heading font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{product.categories?.name}</p>
              <p className="text-sm text-muted-foreground mb-1">SKU: {product.sku}</p>
              {product.price && <p className="text-sm font-semibold mb-2">₹{product.price}</p>}
              <p className="text-xs text-muted-foreground mb-4">
                Status: <span className={product.active ? "text-green-600" : "text-red-600"}>
                  {product.active ? "Active" : "Inactive"}
                </span>
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                  <Edit size={16} />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;