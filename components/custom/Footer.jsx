import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">ShopEase</h3>
            <p className="mb-4">
              Your one-stop shop for all things tech, fashion, and home. We
              bring you the best products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-orange-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-orange-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-orange-500">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-orange-500">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Order Tracking
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Press & Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Investor Relations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Responsible Disclosure
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 ShopEase. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow mr-2"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
