import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { productData } from "./productData";
import { Leaf, Smile, Droplets, ChevronDown, ChevronUp } from "lucide-react";

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const categories = ["All", ...productData.map(c => c.title)];
  
  const filteredProducts = activeCategory === "All" 
    ? productData.flatMap(c => c.products)
    : productData.find(c => c.title === activeCategory)?.products || [];

  return (
    <div className="min-h-screen bg-[#fdfcf8] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-[#15803D] uppercase tracking-widest text-sm mb-4">Our Product</p>
          <h1 className="hidden md:block text-4xl md:text-6xl font-medium text-[var(--primary-blue)]">
            Farm-Fresh Excellence Delivered
          </h1>
        </motion.div>

        {/* Filters */}
        <div className="mb-12">
          {/* Desktop Filter */}
          <div className="hidden md:flex flex-nowrap gap-3 justify-end">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full border transition-all ${
                  activeCategory === category 
                    ? "bg-[#15803D] text-white border-[#15803D]" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#15803D]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Filter */}
          <div className="md:hidden relative w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center bg-[#E5E7EB] p-4 rounded-2xl font-medium text-[var(--primary-blue)]"
            >
              {activeCategory}
              {isDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="w-full mt-2 bg-[#E5E7EB] rounded-2xl p-4 shadow-lg"
              >
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-2 rounded-xl transition-colors ${
                      activeCategory === category ? "bg-white text-[#15803D]" : "hover:bg-white/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#fdfcf8] rounded-[32px] p-3 shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer border border-black/5"
                  onClick={() => window.open("https://wa.me/255724164726?text=Hello%20Prime%20Crop%2C%20I%20would%20like%20to%20order", "_blank")}
              >
                <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] bg-[#E8E8E8] mb-4">
                  <img 
                    src={new URL(`../public/${product.image}`, import.meta.url).href}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f5f5f5%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20fill%3D%22%23ccc%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
                    }}
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="bg-[#385942] text-white text-[11px] font-medium px-3 py-1 rounded-full">Premium Grade</span>
                    <span className="bg-[#f2efe3] text-[#2D2D2D] text-[11px] font-medium px-3 py-1 rounded-full">Tanzania</span>
                  </div>
                </div>
                <div className="px-3 pb-3 pt-1 flex justify-between items-center">
                  <h3 className="text-[28px] leading-none font-bold tracking-tight text-[#0b3815]">
                    {product.name}
                  </h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open("https://wa.me/255724164726?text=Hello%20Prime%20Crop%2C%20I%20would%20like%20to%20order", "_blank");
                    }}
                    className="hidden md:block bg-[#bded04] text-[#085b20] text-sm px-4 py-2 rounded-full hover:bg-[#a5d003] transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-[#15803D] p-12 rounded-3xl mb-24">
          {[
            { icon: Leaf, title: "100% Organic", desc: "We craft products using the most exquisite ingredients from nature." },
            { icon: Smile, title: "Fits your needs", desc: "It’s all natural and processed based on knowledge." },
            { icon: Droplets, title: "Easy to use", desc: "Packed with a unique design as well as useful." },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center text-white">
              <f.icon className="w-10 h-10 mb-4" />
              <h4 className="font-medium text-xl mb-2">{f.title}</h4>
              <p className="text-sm opacity-80">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
