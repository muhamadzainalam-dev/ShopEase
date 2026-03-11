"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const categories = [
  {
    name: "Electronics",
    link: "https://www.daraz.pk/catalog/?q=electronics",
    subcategories: [
      {
        name: "Smartphones",
        items: ["iPhones", "Samsung Galaxy", "Google Pixel", "OnePlus"],
      },
      {
        name: "Laptops",
        items: [
          "Gaming Laptops",
          "Ultrabooks",
          "2-in-1 Laptops",
          "Chromebooks",
        ],
      },
      {
        name: "Audio",
        items: ["Headphones", "Speakers", "Soundbars", "Microphones"],
      },
      {
        name: "Cameras",
        items: ["DSLR", "Mirrorless", "Point-and-Shoot", "Action Cameras"],
      },
    ],
  },
  {
    name: "Fashion",
    link: "https://www.daraz.pk/catalog/?q=Fashion",
    subcategories: [
      {
        name: "Men's Clothing",
        items: ["T-Shirts", "Jeans", "Suits", "Jackets"],
      },
      {
        name: "Women's Clothing",
        items: ["Dresses", "Tops", "Skirts", "Activewear"],
      },
      {
        name: "Accessories",
        items: ["Watches", "Bags", "Jewelry", "Sunglasses"],
      },
    ],
  },
  {
    name: "Home & Living",
    link: "https://www.daraz.pk/catalog/?q=Home%20%26%20Living",
    subcategories: [
      {
        name: "Furniture",
        items: ["Sofas", "Beds", "Dining Tables", "Wardrobes"],
      },
      {
        name: "Decor",
        items: ["Wall Art", "Lighting", "Rugs", "Curtains"],
      },
      {
        name: "Kitchen",
        items: ["Cookware", "Appliances", "Dinnerware", "Storage"],
      },
    ],
  },
  {
    name: "Beauty",
    link: "https://www.daraz.pk/catalog/?q=beauty%20products",
  },
  {
    name: "Sports",
    link: "https://www.daraz.pk/catalog/?q=sports",
  },
  {
    name: "Groceries",
    link: "https://www.daraz.pk/catalog/?q=Groceries",
  },
];

export default function Categories({ onSearch }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <nav className="relative z-10 bg-orange-100 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Categories */}
        <ul
          className="flex space-x-20"
          style={{ display: isSearchFocused ? "none" : "flex" }}
        >
          {categories.map((category) => (
            <li
              key={category.name}
              className="relative"
              onMouseEnter={() => setActiveCategory(category.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={category.link}
                className={`text-gray-600 hover:text-orange-500 flex items-center ${
                  activeCategory === category.name
                    ? "text-orange-500 font-semibold"
                    : ""
                }`}
              >
                {category.name}

                {category.subcategories && (
                  <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </Link>

              {/* Dropdown */}
              {category.subcategories && activeCategory === category.name && (
                <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.name} className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {subcategory.name}
                      </h3>

                      <ul>
                        {subcategory.items.map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="text-gray-600 hover:text-orange-500 block py-1"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Search */}
        <div
          className="relative transition-all duration-300"
          style={{
            width: isSearchFocused ? "100%" : "300px",
          }}
        >
          <Input
            type="search"
            placeholder="Search for products..."
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={handleSearch}
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );
}
