import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ProductTable } from "@/components/admin/ProductTable";
import { CategoryList } from "@/components/admin/CategoryList";
import { UserManagement } from "@/components/admin/UserManagement";
import { ProductForm, ProductFormValues } from "@/components/admin/ProductForm";

// Types
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
};

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [usersCount, setUsersCount] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!isAdmin) {
      toast("Access Denied: You do not have admin privileges");
      navigate('/');
      return;
    }

    const fetchAdminData = async () => {
      setLoading(true);
      
      try {
        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*');
        
        if (productsError) throw productsError;
        setProducts(productsData || []);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(productsData?.map(p => p.category))];
        setCategories(uniqueCategories);
        
        // Count users
        const { count, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (usersError) throw usersError;
        setUsersCount(count || 0);
        
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [user, isAdmin, navigate]);

  const openAddModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
      toast("Product deleted successfully");
    } catch (error) {
      console.error('Error deleting product:', error);
      toast("Failed to delete product");
    }
  };

  const onSubmitProduct = async (data: ProductFormValues) => {
    setFormSubmitting(true);
    try {
      if (currentProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(data)
          .eq('id', currentProduct.id);
        
        if (error) throw error;
        
        setProducts(products.map(p => 
          p.id === currentProduct.id ? { ...p, ...data } : p
        ));
        
        toast("Product updated successfully");
      } else {
        // Add new product - Ensure all required fields are present
        const newProductData = {
          name: data.name,
          description: data.description,
          price: data.price,
          image_url: data.image_url,
          category: data.category,
          stock: data.stock
        };
        
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert(newProductData)
          .select()
          .single();
        
        if (error) throw error;
        
        setProducts([...products, newProduct]);
        
        // Update categories if new category
        if (!categories.includes(data.category)) {
          setCategories([...categories, data.category]);
        }
        
        toast("Product added successfully");
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast("Failed to save product");
    } finally {
      setFormSubmitting(false);
    }
  };

  const initialFormValues: ProductFormValues = currentProduct ? {
    name: currentProduct.name,
    description: currentProduct.description,
    price: currentProduct.price,
    image_url: currentProduct.image_url,
    category: currentProduct.category,
    stock: currentProduct.stock,
  } : {
    name: "",
    description: "",
    price: 0,
    image_url: "",
    category: "",
    stock: 0,
  };

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading admin dashboard...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <DashboardStats 
        productsCount={products.length} 
        categoriesCount={categories.length} 
        usersCount={usersCount} 
      />

      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="py-4">
          <ProductTable 
            products={products} 
            onEdit={openEditModal} 
            onDelete={handleDeleteProduct} 
            onAdd={openAddModal} 
          />
        </TabsContent>
        
        <TabsContent value="categories" className="py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Categories</h2>
          </div>
          <CategoryList categories={categories} products={products} />
        </TabsContent>

        <TabsContent value="users" className="py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">User Management</h2>
          </div>
          <UserManagement />
        </TabsContent>
      </Tabs>

      {/* Product Form Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          
          <ProductForm 
            initialValues={initialFormValues}
            onSubmit={onSubmitProduct}
            onCancel={() => setIsModalOpen(false)}
            categories={categories}
            isSubmitting={formSubmitting}
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
