"use client";
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Loader from "../ui/loader";
import Categories from "./BottomNavBar";
import ImageSlider from "./Slider";
import axios from "axios";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

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

  const ProductSlider = ({ title, products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const productsPerPage = 4;

    const nextProducts = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + productsPerPage >= products.length
          ? 0
          : prevIndex + productsPerPage
      );
    };

    const prevProducts = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - productsPerPage < 0
          ? Math.max(products.length - productsPerPage, 0)
          : prevIndex - productsPerPage
      );
    };

    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex space-x-2">
              <Button onClick={prevProducts} variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextProducts} variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .slice(currentIndex, currentIndex + productsPerPage)
              .map((product) => (
                <div
                  key={product.sku}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
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
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-500 mr-1">
                          <Star className="h-4 w-4 fill-current" />
                        </span>
                        <span className="text-gray-600">{product.rating}</span>
                        {product.customerReviewAverage && (
                          <span className="text-gray-500 ml-2">
                            {product.customerReviewAverage}
                          </span>
                        )}
                      </div>
                    </a>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">
                        ${product.salePrice}
                      </span>
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://api.bestbuy.com/v1/products?apiKey=7KA6o4t838JBCfpUQjBC65uK&pageSize=100&page=10&format=json`
        );
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Best Buy products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (query = "") => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [products]);

  const handleSearch = (query) => {
    filterProducts(query);
  };

  if (loading)
    return (
      <div className="h-[500px] w-[500px] flex items-center justify-center mx-auto">
        <Loader />
      </div>
    );

  return (
    <>
      <Categories onSearch={handleSearch} />
      {!isSearching && (
        <>
          <ImageSlider />
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <a
                  href="https://www.daraz.pk/Smartphones/"
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300"
                >
                  <img
                    src={"/placeholder.svg?height=100&width=100"}
                    className="mx-auto mb-2"
                  />
                  <span className="text-gray-800">Smartphones</span>
                </a>
                <a
                  href="https://www.daraz.pk/Laptops/"
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300"
                >
                  <img
                    src={"/placeholder.svg?height=100&width=100"}
                    className="mx-auto mb-2"
                  />
                  <span className="text-gray-800">Laptops</span>
                </a>
                <a
                  href="https://www.daraz.pk/Camera/"
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300"
                >
                  <img
                    src={"/placeholder.svg?height=100&width=100"}
                    className="mx-auto mb-2"
                  />
                  <span className="text-gray-800">Camera</span>
                </a>
                <a
                  href="https://www.daraz.pk/mobiles-tablets-accessories/?spm=a2a0e.tm80330265.cate_1.1.5326qqyXqqyXq1"
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300"
                >
                  <img
                    src={"/placeholder.svg?height=100&width=100"}
                    className="mx-auto mb-2"
                  />
                  <span className="text-gray-800">Accessories</span>
                </a>
                <a
                  href="https://www.daraz.pk/catalog/?spm=a2a0e.searchlist.search.2.45fa7e65vX3urK&q=smart%20watch&_keyori=ss&clickTrackInfo=textId--6319298025245409390__abId--None__pvid--c82fd9d1-5b71-4f21-8361-05f7e61a6213__matchType--1__abGroup--None__srcQuery--smart%20watch__spellQuery--smart%20watch__ntType--nt-common&from=suggest_normal&sugg=smart%20watch_0_1"
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300"
                >
                  <img
                    src={"/placeholder.svg?height=100&width=100"}
                    className="mx-auto mb-2"
                  />
                  <span className="text-gray-800">Watches</span>
                </a>
                <a
                  href="https://www.daraz.pk/catalog/?spm=a2a0e.tm80330265.search.2.5f5eJH6fJH6f1f&q=head%20phones&_keyori=ss&clickTrackInfo=textId--1507675431873654799__abId--None__pvid--208c1a85-328e-45a3-9597-519dccf07022__matchType--1__abGroup--None__srcQuery--head%20phones__spellQuery--head%20phones__ntType--nt-common&from=suggest_normal&sugg=head%20phones_0_1"
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300"
                >
                  <img
                    src={"/placeholder.svg?height=100&width=100"}
                    className="mx-auto mb-2"
                  />
                  <span className="text-gray-800">Headphones</span>
                </a>
              </div>
            </div>
          </section>
          <ProductSlider
            title="Best Sellers"
            products={products.slice(0, 33)}
          />
          <ProductSlider
            title="New Arrivals"
            products={products.slice(33, 66)}
          />
          <section className="py-12 bg-orange-100">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Special Offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Summer Tech Bundle",
                    description:
                      "Get a laptop, wireless mouse, and backpack at a discounted price!",
                    price: 899.99,
                    originalPrice: 1199.99,
                  },
                  {
                    name: "Home Office Setup",
                    description:
                      "Transform your workspace with our curated selection of ergonomic furniture and accessories.",
                    price: 499.99,
                    originalPrice: 699.99,
                  },
                ].map((offer) => (
                  <div
                    key={offer.name}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                  >
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt={offer.name}
                      className="w-full md:w-1/2 h-48 md:h-auto object-cover"
                    />
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {offer.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {offer.description}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-2xl font-bold text-orange-600">
                            ${offer.price}
                          </span>
                          <span className="ml-2 text-lg text-gray-500 line-through">
                            ${offer.originalPrice}
                          </span>
                        </div>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <ProductSlider
            title="Featured Products"
            products={products.slice(66, 99)}
          />
        </>
      )}
      {isSearching && (
        <>
          {filteredProducts.length > 0 ? (
            <div>
              {filteredProducts.map((product) => (
                <a
                  key={product.sku}
                  href={`/pages/categories/${product.categoryPath[1]?.id}`}
                >
                  <p className="m-5 border rounded-[10px] p-3 text-center text-gray-800 hover:text-white hover:bg-orange-500 cursor-pointer">
                    {product.name}
                  </p>
                </a>
              ))}
            </div>
          ) : (
            <p className="m-5 p-3 text-center text-gray-800">
              No products found for your search.
            </p>
          )}
        </>
      )}
    </>
  );
}
