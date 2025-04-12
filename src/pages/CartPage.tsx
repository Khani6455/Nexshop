
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Product } from "@/components/products/ProductCard";
import { toast } from "@/components/ui/sonner";

// Mock cart items
const initialCartItems = [
  {
    product: {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Electronics",
      rating: 4.5,
      isSale: true
    },
    quantity: 1
  },
  {
    product: {
      id: 3,
      name: "Modern Coffee Table",
      price: 149.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1554295405-abb8fd54f153?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "Home & Garden",
      rating: 4.2,
      isSale: true
    },
    quantity: 1
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  
  const navigate = useNavigate();
  
  // Update cart totals when items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
    
    const newTax = newSubtotal * 0.08; // 8% tax rate
    const newShipping = newSubtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const newTotal = newSubtotal + newTax + newShipping;
    
    setSubtotal(newSubtotal);
    setTax(newTax);
    setShipping(newShipping);
    setTotal(newTotal);
  }, [cartItems]);
  
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const handleRemoveItem = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };
  
  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    // In a real app, this would navigate to the checkout page
    // navigate("/checkout");
  };
  
  const handleClearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared!");
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
              
              <div className="flex justify-between items-center mt-6">
                <Link 
                  to="/"
                  className="flex items-center text-purple hover:text-purple-dark"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
                
                <button 
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* Order summary */}
            <div>
              <CartSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                total={total}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/"
              className="btn-primary inline-block"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
