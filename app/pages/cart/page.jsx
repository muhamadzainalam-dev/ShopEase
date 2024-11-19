"use client";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [cartItems, setCartItems] = useState([]);

  const removeItem = async (sku) => {
    try {
      const response = await fetch("/api/addtocart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku }),
      });

      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.sku !== sku));
        console.log("Product deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Error deleting product:", errorData.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/addtocart");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        setCartItems(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.salePrice * (item.quantity || 1),
    0
  );

  return (
    <div className="container mx-auto p-4 max-w-8xl">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-6 border-t-3 shadow-md rounded-4 p-1">
            <CardHeader className="rounded-[6px]">
              <CardTitle className="text-orange-700">Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length ? (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b last:border-b-0"
                  >
                    <img
                      src={
                        item.image || "/placeholder.svg?height=100&width=100"
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-orange-800">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-semibold mr-[10px]">
                        ${(item.salePrice * (item.quantity || 1)).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.sku)}
                        className="hover:bg-orange-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in cart</p>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mb-6 shadow-md p-1">
            <CardHeader className="rounded-[6px]">
              <CardTitle className="text-orange-700">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>
                  Subtotal (
                  {cartItems.reduce(
                    (sum, item) => sum + (item.quantity || 1),
                    0
                  )}{" "}
                  items)
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Shipping</span>
                <span>
                  Free
                </span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <a href="/pages/cheackout">
                <Button className="w-full bg-orange-500 text-white hover:bg-orange-600 shadow-md">
                  Proceed to Checkout
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
