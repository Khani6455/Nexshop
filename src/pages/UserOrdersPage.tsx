
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';

interface Order {
  _id: string;
  products: {
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export default function UserOrdersPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  const API_URL = 'http://localhost:5000/api';
  const token = localStorage.getItem('authToken');
  
  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      toast.error('Please login to view your orders');
      navigate('/login');
      return;
    }
    
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/orders/my-orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user, isLoading, navigate, token]);
  
  if (isLoading || loading) {
    return (
      <Layout>
        <div className="container-custom py-10">
          <div className="flex justify-center items-center h-64">
            <p>Loading orders...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">View and track your order history</p>
          </div>
          
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order._id}>
                  <CardHeader className="bg-muted/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Order #{order._id.substring(0, 8)}</CardTitle>
                        <CardDescription>
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Shipped' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4 text-left">Product</th>
                          <th className="py-2 px-4 text-right">Qty</th>
                          <th className="py-2 px-4 text-right">Price</th>
                          <th className="py-2 px-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((product, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-3 px-4">{product.name}</td>
                            <td className="py-3 px-4 text-right">{product.quantity}</td>
                            <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right">${(product.price * product.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={3} className="py-3 px-4 text-right font-semibold">Total:</td>
                          <td className="py-3 px-4 text-right font-semibold">${order.totalAmount.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-lg">
              <p className="text-xl text-muted-foreground mb-4">You haven't placed any orders yet</p>
              <Button onClick={() => navigate('/')}>Start Shopping</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
