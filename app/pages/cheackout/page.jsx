"use client";
import { useState, useEffect } from "react";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState([]);
  const { toast } = useToast();

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

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    e.preventDefault();
    if (Object.values(formData).every((value) => value.trim() !== "")) {
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:w-1/3">
              <Card className="mb-6 shadow-md p-1">
                <CardHeader className="rounded-[6px]">
                  <CardTitle className="text-orange-700">
                    Order Summary
                  </CardTitle>
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
                    <span>Delivery Option</span>
                    <Label htmlFor="cod" className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      Cash on Delivery
                    </Label>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-6 bg-[#ff6801] hover:bg-[#e55e00] text-white"
                    onClick={() => {
                      toast({
                        title: "Order Place Succesfully",
                        action: (
                          <ToastAction altText="Goto schedule to undo">
                            <a href="/">BACK TO HOME</a>
                          </ToastAction>
                        ),
                      });
                    }}
                  >
                    Place Order
                  </Button>
                  <p className="text-xs text-center mt-4 text-gray-500">
                    By placing your order, you agree to our Terms of Service and
                    Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
