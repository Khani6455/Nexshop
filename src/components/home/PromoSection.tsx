
import { Link } from "react-router-dom";

export default function PromoSection() {
  return (
    <section className="py-12 bg-purple-light/5">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Promo */}
          <div className="relative overflow-hidden rounded-xl shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Electronics Sale" 
              className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-dark/80 to-transparent flex items-center">
              <div className="p-8 max-w-md">
                <span className="inline-block px-4 py-1 bg-white text-purple font-bold rounded-full mb-4">Limited Time</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Tech Sale</h3>
                <p className="text-white mb-4">Save up to 40% on the latest gadgets and electronics.</p>
                <Link 
                  to="/category/electronics" 
                  className="inline-block px-6 py-2 bg-white text-purple font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Right Promo */}
          <div className="relative overflow-hidden rounded-xl shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Summer Collection" 
              className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-purple-dark/80 to-transparent flex items-center justify-end">
              <div className="p-8 max-w-md text-right">
                <span className="inline-block px-4 py-1 bg-white text-purple font-bold rounded-full mb-4">New Arrival</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Summer Styles</h3>
                <p className="text-white mb-4">Check out our new collection of summer fashion essentials.</p>
                <Link 
                  to="/category/fashion" 
                  className="inline-block px-6 py-2 bg-white text-purple font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
