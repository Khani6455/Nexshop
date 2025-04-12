
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">NexShop</h3>
            <p className="mb-4 text-gray-300">
              Your one-stop shop for all your shopping needs. Quality products, 
              great prices, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-purple-light">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-light">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-light">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-light">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/category/electronics" className="text-gray-300 hover:text-purple-light">Electronics</Link></li>
              <li><Link to="/category/fashion" className="text-gray-300 hover:text-purple-light">Fashion</Link></li>
              <li><Link to="/category/home-garden" className="text-gray-300 hover:text-purple-light">Home & Garden</Link></li>
              <li><Link to="/category/beauty" className="text-gray-300 hover:text-purple-light">Beauty</Link></li>
              <li><Link to="/category/sports" className="text-gray-300 hover:text-purple-light">Sports</Link></li>
              <li><Link to="/sale" className="text-gray-300 hover:text-purple-light">Sale</Link></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-purple-light">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-purple-light">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-purple-light">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-purple-light">Returns & Exchanges</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-purple-light">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-purple-light">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-purple-light" />
                <span className="text-gray-300">support@nexshop.com</span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={20} className="mr-2 text-purple-light" />
                <span className="text-gray-300">+1 (123) 456-7890</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-black"
                />
                <button
                  type="submit"
                  className="bg-purple-light text-white px-4 py-2 rounded-r-md font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} NexShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
