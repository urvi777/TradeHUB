import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  const { products } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-0.5">Good Morning 👋</p>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Trade<span className="text-primary">Hub</span>
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-sm border border-border/50">
            <span className="relative flex h-3 w-3 absolute top-1 right-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="What are you looking for?"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-11 h-12 bg-secondary/70 border-0 rounded-2xl shadow-inner focus-visible:ring-1 focus-visible:ring-primary/50 text-base"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 py-6">
        <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
          <span>Categories</span>
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 shadow-sm ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-primary/30" : "bg-card text-foreground border border-border hover:bg-secondary"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-5">
        <h2 className="text-xl font-bold mb-5 flex items-center justify-between">
          <span>Top Picks For You</span>
          <span className="text-sm font-semibold text-primary">See All</span>
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 py-20 flex flex-col items-center justify-center text-center bg-card rounded-3xl border border-dashed border-border mt-4">
              <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-base font-semibold">No items found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
