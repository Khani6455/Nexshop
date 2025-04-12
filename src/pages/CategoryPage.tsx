
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/products/ProductCard";
import { toast } from "@/lib/toast";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Convert URL parameter to display format
        const displayCategory = category
          ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          : "";
        setCategoryTitle(displayCategory);

        // Fetch products by category
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', displayCategory);
        
        if (error) throw error;

        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
      
      {loading ? (
        <div className="text-center py-12">
          <p>Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image_url}
              category={product.category}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products found in this category.</p>
          <p className="mt-2">Please check back later or browse other categories.</p>
        </div>
      )}
    </div>
  );
}
