import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

const conditions = ["All", "New", "Like New", "Good", "Fair"];

const ExplorePage = () => {
  const { products } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");

  const filtered = products
    .filter(p => {
      const mc = category === "All" || p.category === category;
      const ms = p.title.toLowerCase().includes(search.toLowerCase());
      const mco = condition === "All" || p.condition === condition;
      const mp = p.price <= maxPrice;
      return mc && ms && mco && mp;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const activeFilters = [category !== "All" ? category : null, condition !== "All" ? condition : null, maxPrice < 200000 ? `Under ₹${maxPrice.toLocaleString('en-IN')}` : null].filter(Boolean);

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border px-4 pt-4 pb-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-0" />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Category</p>
                  <div className="flex flex-wrap gap-2">{categories.map(c => (
                    <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{c}</button>
                  ))}</div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold">Condition</p>
                  <div className="flex flex-wrap gap-2">{conditions.map(c => (
                    <button key={c} onClick={() => setCondition(c)} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${condition === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{c}</button>
                  ))}</div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</p>
                  <Slider value={[maxPrice]} onValueChange={v => setMaxPrice(v[0])} max={200000} step={5000} />
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold">Sort By</p>
                  <div className="flex flex-wrap gap-2">
                    {([["newest", "Newest"], ["price-low", "Price: Low"], ["price-high", "Price: High"]] as const).map(([v, l]) => (
                      <button key={v} onClick={() => setSortBy(v)} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${sortBy === v ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {activeFilters.length > 0 && (
          <div className="mt-2 flex gap-1.5 overflow-x-auto">
            {activeFilters.map(f => (
              <span key={f} className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {f}
                <X className="h-3 w-3 cursor-pointer" onClick={() => { if (f === category) setCategory("All"); if (f === condition) setCondition("All"); if (f?.startsWith("Under")) setMaxPrice(2000); }} />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pt-3">
        {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        {filtered.length === 0 && <div className="col-span-2 py-20 text-center text-muted-foreground">No results found</div>}
      </div>
    </div>
  );
};

export default ExplorePage;
