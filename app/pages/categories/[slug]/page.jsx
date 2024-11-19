"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Loader from "@/components/ui/loader";

export default function ProductCategory() {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const sidebarRef = useRef(null);
  const resizerRef = useRef(null);
  const { toast } = useToast();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://api.bestbuy.com/v1/products(categoryPath.id=${slug})?apiKey=7KA6o4t838JBCfpUQjBC65uK&format=json`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [slug]);

  const addToCart = async (product) => {
    try {
      const response = await fetch("/api/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      if (result.message === "Product added to cart successfully") {
        setProducts((prevProducts) => [...prevProducts, product]);
        toast({
          title: "Product added to cart",
          action: (
            <ToastAction altText="Goto schedule to undo">
              <a href="/pages/cart">GO TO CART</a>
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: "Product already in cart",
          action: (
            <ToastAction altText="Goto schedule to undo">
              <a href="/pages/cart">GO TO CART</a>
            </ToastAction>
          ),
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth =
        e.clientX - (sidebarRef.current?.getBoundingClientRect().left || 0);
      if (newWidth >= 200 && newWidth <= 300) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const filterProducts = (query = "") => {
    let filtered = products;

    filtered = filtered.filter(
      (product) =>
        product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1]
    );

    filtered = filtered.filter(
      (product) => (product.customerReviewAverage || 0) >= minRating
    );

    if (freeShippingOnly) {
      filtered = filtered.filter((product) => product.freeShipping === true);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [priceRange, minRating, freeShippingOnly, products]);

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setMinRating(0);
    setFreeShippingOnly(false);
  };

  return (
    <div className="min-h-screen flex">
      {isSidebarOpen && (
        <aside
          ref={sidebarRef}
          className="bg-white overflow-y-auto relative"
          style={{ width: `${sidebarWidth}px` }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="text-[#f85606] hover:bg-[#f85606] hover:text-white"
              >
                Reset
              </Button>
            </div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Price Range</h3>
              <Slider
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Minimum Rating</h3>
              <Slider
                min={0}
                max={5}
                step={0.5}
                value={[minRating]}
                onValueChange={(value) => setMinRating(value[0])}
                className="mb-2"
              />
              <div className="flex items-center">
                <Star className="h-4 w-4 text-[#ff9900] fill-current" />
                <span className="ml-1 text-sm">{minRating.toFixed(1)}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <Checkbox
                  checked={freeShippingOnly}
                  onCheckedChange={() => setFreeShippingOnly(!freeShippingOnly)}
                />
                <span className="ml-2">Free Shipping Only</span>
              </label>
            </div>
          </div>
          <div
            ref={resizerRef}
            className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize bg-gray-300 hover:bg-[#f85606]"
            onMouseDown={() => setIsResizing(true)}
          />
        </aside>
      )}
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center">
          <Button
            className="mr-2 bg-[#f85606] hover:bg-[#ff8800] text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
        <h2 className="text-2xl font-bold mb-8">Search Results</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <a href={`/pages/products/${product.sku}`}>
                  <img
                    src={
                      product.image || "/placeholder.svg?height=100&width=100"
                    }
                    className="w-full h-48 object-cover"
                  />
                </a>
                <div className="p-4">
                  <a href={`/pages/products/${product.sku}`}>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-[#ff9900] fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.customerReviewAverage}
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ${product.salePrice}
                    </span>
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[500px] w-[500px] flex items-center justify-center mx-auto">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
}
