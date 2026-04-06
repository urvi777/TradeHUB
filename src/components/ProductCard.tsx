import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const navigate = useNavigate();
  const { toggleSaved } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        <button
          onClick={(e) => { e.stopPropagation(); toggleSaved(product.id); }}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Heart className={`h-4 w-4 ${product.saved ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
        <Badge variant="secondary" className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm text-xs font-medium">
          {product.condition}
        </Badge>
      </div>
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="truncate text-sm font-semibold">{product.title}</p>
        <p className="text-base font-bold text-primary">₹{(product.price * 80).toLocaleString('en-IN')}</p>
        <p className="text-xs text-muted-foreground">{product.location}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
