
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProductFormValues } from "@/components/admin/ProductForm";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
};

export const useProductManagement = (initialProducts: Product[] = []) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  const categories = [...new Set(products?.map(p => p.category))];

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
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Failed to delete product");
    }
  };

  const onSubmitProduct = async (data: ProductFormValues) => {
    setFormSubmitting(true);
    try {
      if (currentProduct) {
        const { error } = await supabase
          .from('products')
          .update({
            name: data.name,
            description: data.description,
            price: data.price,
            image_url: data.image_url,
            category: data.category,
            stock: data.stock
          })
          .eq('id', currentProduct.id);
        
        if (error) throw error;
        
        setProducts(products.map(p => 
          p.id === currentProduct.id ? { ...p, ...data } : p
        ));
        
        toast.success("Product updated successfully");
      } else {
        const { data: newProduct, error } = await supabase
          .from('products')
          .insert({
            name: data.name,
            description: data.description,
            price: data.price,
            image_url: data.image_url,
            category: data.category,
            stock: data.stock
          })
          .select()
          .single();
        
        if (error) throw error;
        
        setProducts([...products, newProduct]);
        toast.success("Product added successfully");
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error("Failed to save product");
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

  return {
    products,
    setProducts,
    loading,
    setLoading,
    isModalOpen,
    setIsModalOpen,
    currentProduct,
    formSubmitting,
    categories,
    openAddModal,
    openEditModal,
    handleDeleteProduct,
    onSubmitProduct,
    initialFormValues,
  };
};
