import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { products, categories } from "@/data/mock";

const BASE_URL = import.meta.env.BASE_URL;

export default function Products() {
  const [location] = useLocation();
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || 
      (activeCategory === 'outdoor' && product.category === 'Outdoor') ||
      (activeCategory === 'indoor' && product.category === 'Indoor') ||
      (activeCategory === 'mesh' && product.category === 'Mesh & Clear') ||
      (activeCategory === 'hologram' && product.category === '3D Holograms') ||
      (activeCategory === 'street' && product.category === 'Street Furniture') ||
      (activeCategory === 'hospitality' && product.category === 'Hospitality / Home');
      
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
                          
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Product <span className="text-primary">Catalog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore our state-of-the-art digital display solutions designed for ultimate performance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="glass-panel p-6 rounded-2xl sticky top-24">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex items-center gap-2 mb-4 text-white font-medium">
                <Filter className="w-4 h-4 text-primary" />
                Categories
              </div>
              
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveCategory('All')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      activeCategory === 'All' 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeCategory === cat.id 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">Showing {filteredProducts.length} results</p>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  // Fallback image logic based on category
                  let imgPath = "cat-indoor.png";
                  if(product.category === 'Outdoor') imgPath = "cat-outdoor.png";
                  if(product.category === 'Mesh & Clear') imgPath = "cat-mesh.png";
                  if(product.category === '3D Holograms') imgPath = "cat-hologram.png";
                  if(product.category === 'Street Furniture') imgPath = "cat-street.png";

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="glass-card rounded-2xl overflow-hidden group flex flex-col"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img 
                          src={`${BASE_URL}images/${imgPath}`} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full">
                            {product.category}
                          </span>
                          <span className="px-3 py-1 text-xs font-medium bg-primary/20 backdrop-blur-md border border-primary/30 text-primary rounded-full">
                            {product.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground mb-6 flex-grow">
                          {product.desc}
                        </p>
                        <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white font-medium transition-all">
                          Request Details
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl">
                  <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
                  <button 
                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
