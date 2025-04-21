
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ProductTable } from "@/components/admin/ProductTable";
import { CategoryList } from "@/components/admin/CategoryList";
import { UserManagement } from "@/components/admin/UserManagement";
import { ProductFormDialog } from "@/components/admin/ProductFormDialog";
import { useProductManagement } from "@/hooks/useProductManagement";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState(0);
  
  const {
    products,
    setProducts,
    loading,
    setLoading,
    isModalOpen,
    setIsModalOpen,
    categories,
    openAddModal,
    openEditModal,
    handleDeleteProduct,
    onSubmitProduct,
    initialFormValues,
    formSubmitting,
  } = useProductManagement();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Please login to access the admin dashboard");
      navigate('/login');
      return;
    }

    if (!isLoading && !isAdmin) {
      toast.error("Access Denied: You do not have admin privileges");
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
        
        // Count users
        const { count, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (usersError) throw usersError;
        setUsersCount(count || 0);
        
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchAdminData();
    }
  }, [user, isAdmin, isLoading, navigate, setProducts, setLoading]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading admin dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will be redirected by the useEffect
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

      <ProductFormDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={onSubmitProduct}
        initialValues={initialFormValues}
        categories={categories}
        isSubmitting={formSubmitting}
      />
    </AdminLayout>
  );
}
