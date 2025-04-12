import { useState } from "react";
import { X } from "lucide-react";
import { Product } from "../products/ProductCard";
import { toast } from "@/lib/toast";

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export default function CartItem({ product, quantity, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10;
    
    setItemQuantity(newQuantity);
    onUpdateQuantity(product.id, newQuantity);
    
    if (newQuantity !== quantity) {
      toast.success("Cart updated!");
    }
  };
  
  const handleRemove = () => {
    onRemoveItem(product.id);
    toast.success("Item removed from cart!");
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200">
      {/* Product image */}
      <div className="w-full sm:w-24 h-24 mr-4 mb-3 sm:mb-0 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      {/* Product details */}
      <div className="flex-grow">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        
        <div className="flex flex-wrap gap-4 items-center">
          {/* Price */}
          <div className="font-bold text-purple">${product.price.toFixed(2)}</div>
          
          {/* Quantity selector */}
          <div className="flex items-center">
            <button
              className="w-8 h-8 rounded-l border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              onClick={() => handleQuantityChange(itemQuantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              className="w-12 h-8 border-t border-b border-gray-300 text-center text-sm"
              value={itemQuantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max="10"
            />
            <button
              className="w-8 h-8 rounded-r border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              onClick={() => handleQuantityChange(itemQuantity + 1)}
            >
              +
            </button>
          </div>
          
          {/* Total price */}
          <div className="ml-auto font-bold">
            ${(product.price * itemQuantity).toFixed(2)}
          </div>
          
          {/* Remove button */}
          <button
            className="text-gray-500 hover:text-red-500 p-1"
            onClick={handleRemove}
            aria-label="Remove item"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
