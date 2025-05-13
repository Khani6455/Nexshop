
import express from 'express';
import { authenticate, isAdmin } from '../middleware/auth';
import Order from '../../models/Order';
import Product from '../../models/Product';

const router = express.Router();

// Get all orders (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get('/my-orders', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ userId: (req as any).userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the user is the owner of the order or an admin
    if (order.userId.toString() !== (req as any).userId && !(req as any).isAdmin) {
      return res.status(403).json({ message: 'Not authorized to access this order' });
    }
    
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create new order
router.post('/', authenticate, async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;
    
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products are required' });
    }
    
    let totalAmount = 0;
    const orderProducts = [];
    
    // Verify all products and calculate total
    for (const item of products) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ 
          message: `Product with ID ${item.productId} not found` 
        });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}` 
        });
      }
      
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      orderProducts.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
      
      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }
    
    const order = new Order({
      userId: (req as any).userId,
      products: orderProducts,
      totalAmount,
      shippingAddress
    });
    
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Pending', 'Shipped', 'Delivered'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
