import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Calendar } from "lucide-react";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const { data } = await supabase
      .from("enquiries")
      .select("*, products(name)")
      .order("created_at", { ascending: false });
    if (data) setEnquiries(data);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-heading font-semibold mb-6">Customer Enquiries</h2>
      
      {enquiries.length === 0 ? (
        <p className="text-muted-foreground">No enquiries yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {enquiries.map((enquiry) => (
            <Card key={enquiry.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-lg">{enquiry.name}</h3>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail size={16} />
                    <span>{enquiry.email}</span>
                  </div>
                  
                  {enquiry.phone && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Phone size={16} />
                      <span>{enquiry.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{new Date(enquiry.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  {enquiry.products && (
                    <p className="text-sm">
                      <span className="font-semibold">Product:</span> {enquiry.products.name}
                    </p>
                  )}
                  
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-semibold mb-2">Message:</p>
                    <p className="text-sm">{enquiry.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;