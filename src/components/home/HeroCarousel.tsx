
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "New Summer Collection",
    description: "Discover the hottest styles for the summer season",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    link: "/category/fashion",
    buttonText: "Shop Now",
    position: "left"
  },
  {
    id: 2,
    title: "Tech Deals",
    description: "Save up to 40% on the latest electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    link: "/category/electronics",
    buttonText: "View Deals",
    position: "right"
  },
  {
    id: 3,
    title: "Home Essentials",
    description: "Transform your space with our home collection",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    link: "/category/home-garden",
    buttonText: "Explore",
    position: "left"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden h-[450px] md:h-[500px] bg-gray-100">
      <div 
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="min-w-full relative"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/20" />
            </div>
            
            <div className={`relative h-full container-custom flex items-center ${
              slide.position === 'left' ? 'justify-start' : 'justify-end'
            }`}>
              <div className={`max-w-lg p-6 lg:p-8 rounded-lg ${
                slide.position === 'left' ? 'bg-white/90' : 'bg-neutral-dark/90 text-white'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg mb-6">{slide.description}</p>
                <Link 
                  to={slide.link} 
                  className={`inline-block px-6 py-3 rounded-md font-medium ${
                    slide.position === 'left' 
                      ? 'bg-purple-light text-white hover:bg-purple' 
                      : 'bg-white text-neutral-dark hover:bg-gray-100'
                  } transition-colors`}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-neutral-dark hover:bg-white transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-neutral-dark hover:bg-white transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-purple-light' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
