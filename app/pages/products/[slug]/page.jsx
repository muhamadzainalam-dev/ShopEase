"use client";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function ProductDetail() {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();

  const res = await fetch(
    `https://api.bestbuy.com/v1/products(sku=${slug})?apiKey=7KA6o4t838JBCfpUQjBC65uK&format=json`
  );
  const data = await res.json();

  const product = data.products?.[0] || null;
  if (!product) {
    notFound();
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-square relative border">
          <img
            src={product.image || "/placeholder.svg?height=100&width=100"}
            className="w-full h-full object-cover rounded-lg overflow-hidden"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.customerReviewAverage}{" "}
            </span>
          </div>
          <div className="text-2xl font-bold"> ${product.salePrice}</div>
          <Button className="w-full mt-4" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
          <p className="text-gray-600">{product.longDescription}</p>
          <div className="flex items-center gap-2 text-green-600">
            <Truck className="w-5 h-5" />
            <span>Free delivery on orders over $50</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>
          <p>
            Our Premium Cotton T-Shirt is the epitome of comfort and style.
            Crafted from 100% organic cotton, this shirt offers a soft,
            breathable feel that's perfect for all-day wear. The classic cut
            ensures a flattering fit for all body types, while the durable
            construction means this tee will remain a staple in your wardrobe
            for years to come.
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>100% organic cotton for ultimate comfort</li>
            <li>Available in multiple colors to suit your style</li>
            <li>
              Versatile design suitable for casual and semi-formal occasions
            </li>
            <li>Easy care: machine washable and durable</li>
            <li>Ethically manufactured in eco-friendly facilities</li>
          </ul>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Product Specifications</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold">Material</td>
                <td className="py-2">100% Organic Cotton</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Weight</td>
                <td className="py-2">180 gsm</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Fit</td>
                <td className="py-2">Regular</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Care Instructions</td>
                <td className="py-2">Machine wash cold, tumble dry low</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Country of Origin</td>
                <td className="py-2">Made in USA</td>
              </tr>
            </tbody>
          </table>
        </TabsContent>
      </Tabs>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl font-bold">4.2</div>
          <div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">Based on 245 reviews</div>
          </div>
        </div>
        <div className="space-y-4">
          {[
            {
              name: "John D.",
              rating: 5,
              comment:
                "Great quality t-shirt. Fits perfectly and feels comfortable.",
            },
            {
              name: "Sarah M.",
              rating: 4,
              comment:
                "Nice shirt, but the color was slightly different from the picture.",
            },
            {
              name: "Mike R.",
              rating: 5,
              comment:
                "Excellent product! Will definitely buy more in different colors.",
            },
          ].map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="font-semibold">{review.name}</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Questions & Answers</h2>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: "Is this t-shirt true to size?",
              answer:
                "Yes, our t-shirts are designed to be true to size. We recommend ordering your usual size for a comfortable fit.",
            },
            {
              question: "How do I care for this t-shirt?",
              answer:
                "For best results, machine wash cold with like colors and tumble dry on low heat. Avoid using bleach and iron on low if needed.",
            },
            {
              question: "Do you offer international shipping?",
              answer:
                "Yes, we offer international shipping to most countries. Shipping rates and delivery times may vary depending on the destination.",
            },
          ].map((qa, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{qa.question}</AccordionTrigger>
              <AccordionContent>{qa.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
