
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ subtotal, tax, shipping, total, onCheckout }: CartSummaryProps) {
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    onCheckout(); // Call the original onCheckout function
    navigate("/checkout"); // Navigate to checkout page
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
        </div>
        <div className="border-t border-gray-300 pt-3 mt-3">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button
        className="w-full bg-purple-light hover:bg-purple text-white font-bold py-3 px-4 rounded-md transition-colors"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">We Accept</h3>
        <div className="flex space-x-2">
          <div className="bg-white text-gray-600 px-2 py-1 rounded border border-gray-300 text-sm">Visa</div>
          <div className="bg-white text-gray-600 px-2 py-1 rounded border border-gray-300 text-sm">Mastercard</div>
          <div className="bg-white text-gray-600 px-2 py-1 rounded border border-gray-300 text-sm">PayPal</div>
          <div className="bg-white text-gray-600 px-2 py-1 rounded border border-gray-300 text-sm">Apple Pay</div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>
          By completing your purchase, you agree to our{' '}
          <a href="/terms" className="text-purple hover:underline">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-purple hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
