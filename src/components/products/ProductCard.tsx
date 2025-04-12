
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl?: string;
  image?: string; // Some components use image instead of imageUrl
  category: string;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  description?: string;
  stock?: number;
}

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  imageUrl, 
  category,
  originalPrice,
  isNew = false,
  isSale = false,
  rating = 0
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <div 
      className="card-product"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden pb-[100%]">
        {/* Product image */}
        <Link to={`/product/${id}`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-2">
          {isNew && (
            <span className="badge badge-primary">New</span>
          )}
          {isSale && (
            <span className="badge badge-sale">Sale</span>
          )}
          {originalPrice && (
            <span className="badge badge-sale">{discount}% Off</span>
          )}
        </div>

        {/* Quick action buttons */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white/90 py-2 flex justify-center space-x-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        >
          <button 
            className="p-2 rounded-full bg-gray-100 hover:bg-purple-light hover:text-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>
          <button 
            className="p-2 rounded-full bg-gray-100 hover:bg-purple-light hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </button>
          <button 
            className="p-2 rounded-full bg-gray-100 hover:bg-purple-light hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Category */}
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        
        {/* Product name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-medium mb-2 hover:text-purple transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        
        {/* Rating */}
        {rating > 0 && (
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400' 
                    : i < rating 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {rating > 0 && <span className="text-sm text-gray-500 ml-1">({rating})</span>}
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center">
          {originalPrice && (
            <span className="text-gray-500 line-through mr-2">${originalPrice.toFixed(2)}</span>
          )}
          <span className="text-lg font-bold text-purple">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export type { ProductCardProps };
