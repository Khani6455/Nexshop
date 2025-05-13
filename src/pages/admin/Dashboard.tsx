
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { ProductTable } from '@/components/admin/ProductTable';
import { CategoryList } from '@/components/admin/CategoryList';
import { ProductFormDialog } from '@/components/admin/ProductFormDialog';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  const API_URL = 'http://localhost:5000/api';
  
  // Get token from localStorage
  const token = localStorage.getItem('authToken');
  
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch products
      const productsResponse = await fetch(`${API_URL}/products`);
      const productsData = await productsResponse.json();
      
      if (!productsResponse.ok) throw new Error('Failed to fetch products');
      setProducts(productsData);
      
      // Fetch orders (admin only)
      if (token) {
        const ordersResponse = await fetch(`${API_URL}/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData);
        }
        
        // Fetch users (admin only)
        const usersResponse = await fetch(`${API_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied: Admin privileges required');
      navigate('/admin-login');
      return;
    }
    
    fetchDashboardData();
  }, [isAdmin, navigate]);
  
  const categories = [...new Set(products?.map((p: any) => p.category))];
  
  const openAddModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (product: any) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };
  
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }
      
      setProducts(products.filter((p: any) => p._id !== id));
      toast.success('Product deleted successfully');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Failed to delete product');
    }
  };
  
  const onSubmitProduct = async (data: any) => {
    try {
      if (currentProduct) {
        // Edit product
        const response = await fetch(`${API_URL}/products/${currentProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update product');
        }
        
        const updatedProduct = await response.json();
        
        setProducts(products.map((p: any) => 
          p._id === currentProduct._id ? updatedProduct : p
        ));
        
        toast.success('Product updated successfully');
      } else {
        // Add product
        const response = await fetch(`${API_URL}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add product');
        }
        
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        
        toast.success('Product added successfully');
      }
      
      setIsModalOpen(false);
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error(error.message || 'Failed to save product');
    }
  };
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading admin dashboard...</p>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <DashboardStats 
        productsCount={products.length} 
        categoriesCount={categories.length} 
        usersCount={users.length} 
      />
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="py-4">
          <ProductTable 
            products={products} 
            onEdit={openEditModal} 
            onDelete={handleDeleteProduct} 
            onAdd={openAddModal} 
          />
        </TabsContent>
        
        <TabsContent value="orders" className="py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Orders</h2>
          </div>
          
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order: any) => (
                    <tr key={order._id} className="border-b">
                      <td className="py-3 px-4">{order._id.substring(0, 8)}...</td>
                      <td className="py-3 px-4">{order.userId}</td>
                      <td className="py-3 px-4">${order.totalAmount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Shipped' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Update order status logic here
                              const newStatus = 
                                order.status === 'Pending' ? 'Shipped' : 
                                order.status === 'Shipped' ? 'Delivered' : 'Pending';
                                
                              fetch(`${API_URL}/orders/${order._id}/status`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ status: newStatus })
                              })
                              .then(res => res.json())
                              .then(data => {
                                setOrders(orders.map((o: any) => 
                                  o._id === order._id ? { ...o, status: newStatus } : o
                                ));
                                toast.success(`Order status updated to ${newStatus}`);
                              })
                              .catch(err => {
                                console.error('Error updating order status:', err);
                                toast.error('Failed to update order status');
                              });
                            }}
                          >
                            Update Status
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Categories</h2>
          </div>
          <CategoryList categories={categories} products={products} />
        </TabsContent>
        
        <TabsContent value="users" className="py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">User Management</h2>
          </div>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user: any) => (
                    <tr key={user._id} className="border-b">
                      <td className="py-3 px-4">{user._id.substring(0, 8)}...</td>
                      <td className="py-3 px-4">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        {user.isAdmin ? 'Admin' : 'User'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              fetch(`${API_URL}/users/${user._id}/${user.isAdmin ? 'remove-admin' : 'make-admin'}`, {
                                method: 'PUT',
                                headers: {
                                  'Authorization': `Bearer ${token}`
                                }
                              })
                              .then(res => {
                                if (!res.ok) throw new Error('Failed to update user role');
                                return res.json();
                              })
                              .then(() => {
                                setUsers(users.map((u: any) => 
                                  u._id === user._id ? { ...u, isAdmin: !u.isAdmin } : u
                                ));
                                toast.success(`User role updated`);
                              })
                              .catch(err => {
                                console.error('Error updating user role:', err);
                                toast.error('Failed to update user role');
                              });
                            }}
                          >
                            {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      
      <ProductFormDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={onSubmitProduct}
        initialValues={currentProduct ? {
          name: currentProduct.name,
          description: currentProduct.description,
          price: currentProduct.price,
          image_url: currentProduct.imageUrl,
          category: currentProduct.category,
          stock: currentProduct.stock,
        } : {
          name: "",
          description: "",
          price: 0,
          image_url: "",
          category: "",
          stock: 0,
        }}
        categories={categories}
        isSubmitting={false}
      />
    </AdminLayout>
  );
};

export default Dashboard;
