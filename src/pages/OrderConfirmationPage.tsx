
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { CheckCircle, ArrowLeft, Package } from "lucide-react";

export default function OrderConfirmationPage() {
  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  return (
    <Layout>
      <div className="container-custom py-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. We've received your order and are processing it now.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Order Details</h2>
              <span className="text-sm text-gray-500">#{orderNumber}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span>Credit Card</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-bold">$248.38</span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg mb-8 border border-purple-100">
            <div className="flex items-start">
              <Package className="text-purple mr-4 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Shipping Information</h3>
                <p className="text-gray-600">
                  You will receive an email with tracking information once your order ships.
                </p>
                <p className="text-gray-600 mt-2">
                  Estimated delivery: <span className="font-medium">3-5 business days</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center text-purple bg-white border border-purple-light hover:bg-purple-50 font-bold py-3 px-4 rounded-md transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
            <Link
              to="/account"
              className="flex-1 bg-purple-light hover:bg-purple text-white font-bold py-3 px-4 rounded-md transition-colors text-center"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
