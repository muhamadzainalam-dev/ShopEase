"use client";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  {
    name: <a href="https://www.daraz.pk/catalog/?q=electronics">Electronics</a>,
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
    name: <a href="https://www.daraz.pk/catalog/?q=Fashion">Fashion</a>,
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
    name: (
      <a href="https://www.daraz.pk/catalog/?q=Home%20%26%20Living">
        Home & Living
      </a>
    ),
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
    name: (
      <a href="https://www.daraz.pk/catalog/?spm=a2a0e.tm80335142.search.3.35e37bdaH09QFZ&q=beauty%20products&_keyori=ss&clickTrackInfo=textId--6282305076446958542__abId--None__pvid--7eec532c-1054-4fad-af9b-c1a7f58b3b32__matchType--1__abGroup--None__srcQuery--beauty%20products__spellQuery--beauty%20products__ntType--nt-common&from=suggest_normal&sugg=beauty%20products_1_1">
        Beauty
      </a>
    ),
  },
  { name: <a href="https://www.daraz.pk/catalog/?q=sports">Sports</a> },
  { name: <a href="https://www.daraz.pk/catalog/?q=Groceries">Groceries</a> },
];

export default function Categories({ onSearch }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <>
      <nav className="relative z-10 bg-orange-100 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <ul
            className="flex space-x-20"
            style={{ display: isSearchFocused ? "none" : "" }}
          >
            {categories.map((category) => (
              <li key={category.name} className="relative group">
                <a
                  href="#"
                  className={`text-gray-600 hover:text-orange-500 flex items-center ${
                    activeCategory === category.name
                      ? "text-orange-500 font-semibold"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveCategory(category.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {category.name}
                  {category.subcategories && (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </a>
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
          <div
            className="relative active:w-[100%] w-[300px]"
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
    </>
  );
}
