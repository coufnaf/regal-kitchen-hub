import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";

const AdminCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: "", name: "", tagline: "", image_url: "", active: true });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      const { error } = await supabase
        .from("categories")
        .update({
          name: currentCategory.name,
          tagline: currentCategory.tagline,
          image_url: currentCategory.image_url,
          active: currentCategory.active,
        })
        .eq("id", currentCategory.id);

      if (error) {
        toast.error("Failed to update category");
      } else {
        toast.success("Category updated!");
        resetForm();
        fetchCategories();
      }
    } else {
      const { error } = await supabase.from("categories").insert({
        name: currentCategory.name,
        tagline: currentCategory.tagline,
        image_url: currentCategory.image_url,
        active: currentCategory.active,
      });

      if (error) {
        toast.error("Failed to create category");
      } else {
        toast.success("Category created!");
        resetForm();
        fetchCategories();
      }
    }
  };

  const handleEdit = (category: any) => {
    setCurrentCategory(category);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete category");
    } else {
      toast.success("Category deleted!");
      fetchCategories();
    }
  };

  const resetForm = () => {
    setCurrentCategory({ id: "", name: "", tagline: "", image_url: "", active: true });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">{isEditing ? "Edit Category" : "Add Category"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={currentCategory.name}
                onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={currentCategory.tagline}
                onChange={(e) => setCurrentCategory({ ...currentCategory, tagline: e.target.value })}
                placeholder="E.g., 'Plate it like a pro'"
              />
            </div>
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={currentCategory.image_url}
                onChange={(e) => setCurrentCategory({ ...currentCategory, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={currentCategory.active}
                onCheckedChange={(checked) => setCurrentCategory({ ...currentCategory, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex space-x-2">
              <Button type="submit">
                {isEditing ? "Update" : "Create"}
              </Button>
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
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="pt-6">
              {category.image_url && (
                <img src={category.image_url} alt={category.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              )}
              <h3 className="font-heading font-semibold text-lg mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground italic mb-2">{category.tagline}</p>
              <p className="text-xs text-muted-foreground mb-4">
                Status: <span className={category.active ? "text-green-600" : "text-red-600"}>
                  {category.active ? "Active" : "Inactive"}
                </span>
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                  <Edit size={16} />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
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

export default AdminCategories;