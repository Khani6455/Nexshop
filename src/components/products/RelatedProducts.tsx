
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RelatedProductsProps {
  categoryProducts: Product[];
  currentProductId: number;
}

export default function RelatedProducts({ categoryProducts, currentProductId }: RelatedProductsProps) {
  const [startIndex, setStartIndex] = useState(0);
  
  // Filter out the current product and get related products from the same category
  const relatedProducts = categoryProducts.filter(product => product.id !== currentProductId);
  
  // Number of products to display at once (adjust for responsive design)
  const displayCount = 4;
  
  const nextProducts = () => {
    if (startIndex + displayCount < relatedProducts.length) {
      setStartIndex(startIndex + 1);
    }
  };
  
  const prevProducts = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  
  const displayedProducts = relatedProducts.slice(startIndex, startIndex + displayCount);
  
  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevProducts}
            disabled={startIndex === 0}
            className={`p-2 rounded-full border ${
              startIndex === 0 
                ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
            aria-label="Previous products"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextProducts}
            disabled={startIndex + displayCount >= relatedProducts.length}
            className={`p-2 rounded-full border ${
              startIndex + displayCount >= relatedProducts.length 
                ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
            aria-label="Next products"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
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
    </section>
  );
}
