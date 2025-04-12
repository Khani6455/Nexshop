
import { useState } from "react";
import { Heart, Share2, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Product } from "./ProductCard";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Mock multiple product images
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ];

  // Mock product variants
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["#000000", "#FFFFFF", "#FF0000", "#0000FF"];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist!");
  };

  const handleBuyNow = () => {
    toast.success("Proceeding to checkout...");
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product images */}
      <div>
        <div className="mb-4 overflow-hidden rounded-lg">
          <img 
            src={productImages[selectedImage]} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex space-x-2">
          {productImages.map((image, index) => (
            <button 
              key={index}
              className={`w-24 h-24 border-2 rounded overflow-hidden ${
                selectedImage === index ? 'border-purple' : 'border-gray-200'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={image} 
                alt={`Product view ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product info */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-5 h-5 ${
                i < Math.floor(product.rating) 
                  ? 'text-yellow-400' 
                  : i < product.rating 
                  ? 'text-yellow-400' 
                  : 'text-gray-300'
              }`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-gray-600 ml-2">{product.rating} (120 reviews)</span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-purple">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
          <p className="text-gray-500 mt-1">Inclusive of all taxes</p>
        </div>

        <div className="border-t border-gray-200 my-6 pt-6">
          {/* Color selection */}
          <div className="mb-6">
            <h3 className="text-gray-700 text-sm font-medium mb-2">Color</h3>
            <div className="flex space-x-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-purple' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 text-sm font-medium">Size</h3>
              <button className="text-purple text-sm">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 rounded-md border ${
                    selectedSize === size 
                      ? 'bg-purple-light text-white border-purple-light' 
                      : 'border-gray-300 hover:border-purple-light'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-gray-700 text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                className="w-10 h-10 rounded-l-md border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <input
                type="number"
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
              />
              <button
                className="w-10 h-10 rounded-r-md border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              className="bg-purple-light hover:bg-purple text-white font-medium py-3 px-6 rounded-md flex-1 flex items-center justify-center transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-neutral-dark hover:bg-black text-white font-medium py-3 px-6 rounded-md flex-1 flex items-center justify-center transition-colors"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-md flex items-center justify-center transition-colors"
              onClick={handleAddToWishlist}
            >
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Product benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start space-x-2 bg-gray-50 p-3 rounded">
            <Truck size={20} className="text-purple mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Free Shipping</h4>
              <p className="text-xs text-gray-500">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 bg-gray-50 p-3 rounded">
            <ShieldCheck size={20} className="text-purple mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">2-Year Warranty</h4>
              <p className="text-xs text-gray-500">Full coverage</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 bg-gray-50 p-3 rounded">
            <RotateCcw size={20} className="text-purple mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">30-Day Returns</h4>
              <p className="text-xs text-gray-500">Hassle-free returns</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
            <Share2 size={20} className="text-purple" />
            <h4 className="font-medium text-sm">Share this Product</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
