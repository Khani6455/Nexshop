
import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Search, Menu, X, User, Heart } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const categories = [
  { name: "Electronics", path: "/category/electronics" },
  { name: "Fashion", path: "/category/fashion" },
  { name: "Home & Garden", path: "/category/home-garden" },
  { name: "Beauty", path: "/category/beauty" },
  { name: "Sports", path: "/category/sports" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        {/* Top bar with logo, search and icons */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-purple">NexShop</Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-grow mx-8">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-purple-light text-white p-2 rounded-r-md"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="nav-link hidden sm:flex items-center">
              <Heart size={20} />
              <span className="ml-1 hidden lg:inline">Wishlist</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="nav-link flex items-center">
                <User size={20} />
                <span className="ml-1 hidden lg:inline">Account</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="w-full">My Account</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/cart" className="nav-link flex items-center">
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-purple-light text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="ml-1 hidden lg:inline">Cart</span>
            </Link>

            {/* Mobile menu button */}
            <button 
              className="md:hidden nav-link" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-light"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-purple-light text-white p-2 rounded-r-md"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Navigation links - desktop */}
        <nav className="hidden md:flex space-x-8 py-3 border-t border-gray-100">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={category.path} 
              className="nav-link font-medium"
            >
              {category.name}
            </Link>
          ))}
          <Link to="/sale" className="nav-link font-medium text-red-500">Sale</Link>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  to={category.path} 
                  className="nav-link font-medium px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link 
                to="/sale" 
                className="nav-link font-medium text-red-500 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sale
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
