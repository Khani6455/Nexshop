
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductDetails from "@/components/products/ProductDetails";
import ProductDescription from "@/components/products/ProductDescription";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Product } from "@/components/products/ProductCard";

// Mock data for a single product
const product: Product = {
  id: 1,
  name: "Wireless Bluetooth Headphones",
  price: 79.99,
  originalPrice: 129.99,
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  category: "Electronics",
  rating: 4.5,
  isSale: true
};

// Mock data for category products (for related products)
const categoryProducts: Product[] = [
  product,
  {
    id: 4,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    rating: 4.7,
    isNew: true
  },
  {
    id: 7,
    name: "Smartphone X Pro",
    price: 899.99,
    originalPrice: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    rating: 4.9,
    isSale: true
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1549406490-9a7f529e79a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    rating: 4.6
  },
  {
    id: 11,
    name: "HD Action Camera",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Electronics",
    rating: 4.3,
    isSale: true
  }
];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "1");
  
  // In a real app, you would fetch the product data based on the ID
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-6">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-purple">Home</a> &gt;{' '}
            <a href="/category/electronics" className="hover:text-purple">Electronics</a> &gt;{' '}
            <span className="text-gray-700">{product.name}</span>
          </div>
          
          <ProductDetails product={product} />
          <ProductDescription />
          <RelatedProducts categoryProducts={categoryProducts} currentProductId={productId} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
