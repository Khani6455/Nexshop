
import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { Product } from "../products/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for featured products
const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    rating: 4.5,
    isSale: true
  },
  {
    id: 2,
    name: "Premium Leather Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Fashion",
    rating: 4.8,
    isNew: true
  },
  {
    id: 3,
    name: "Modern Coffee Table",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Home & Garden",
    rating: 4.2,
    isSale: true
  },
  {
    id: 4,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    rating: 4.7,
    isNew: true
  },
  {
    id: 5,
    name: "Organic Skincare Set",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Beauty",
    rating: 4.4,
    isSale: true
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Sports",
    rating: 4.3
  },
  {
    id: 7,
    name: "Smartphone X Pro",
    price: 899.99,
    originalPrice: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    rating: 4.9,
    isSale: true
  },
  {
    id: 8,
    name: "Designer Sunglasses",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Fashion",
    rating: 4.6,
    isNew: true
  }
];

// Categories for tabs
const categories = [
  "All", "Electronics", "Fashion", "Home & Garden", "Beauty", "Sports"
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(product => product.category === activeTab);

  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Featured Products</h2>
        <p className="text-gray-600 mb-8 text-center">Discover our most popular products</p>
        
        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="m-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl || product.image || ""}
                    category={product.category}
                    originalPrice={product.originalPrice}
                    isNew={product.isNew}
                    isSale={product.isSale}
                    rating={product.rating}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
