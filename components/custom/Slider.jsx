"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sliderData = [
  {
    title: "Summer Sale!",
    description: "Get up to 50% off on selected items. Limited time offer!",
    image: "/placeholder.svg?height=400&width=600",
    cta: "Shop Now",
  },
  {
    title: "New Arrivals",
    description: "Check out our latest collection of trendy products!",
    image: "/placeholder.svg?height=400&width=600",
    cta: "Explore",
  },
  {
    title: "Flash Deals",
    description: "24-hour deals on top brands. Don't miss out!",
    image: "/placeholder.svg?height=400&width=600",
    cta: "View Deals",
  },
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + sliderData.length) % sliderData.length
    );
  };

  return (
    <>
      <section className="relative bg-gradient-to-r from-orange-400 to-red-500 text-white">
        <div className="container mx-auto pl-[4rem]">
          <div className="relative h-[400px] overflow-hidden">
            {sliderData.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center h-full">
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-6">{slide.description}</p>
                    <Button className="bg-white text-orange-500 hover:bg-gray-100">
                      {slide.cta}
                    </Button>
                  </div>
                  <div className="md:w-1/2">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
