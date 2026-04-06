import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, MapPin, ShieldCheck, MessageCircle, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { reviews } from "@/data/mockData";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, toggleSaved, startChat, placeOrder } = useApp();
  const product = products.find(p => p.id === id);
  const [imgIndex, setImgIndex] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  if (!product) return <div className="flex h-screen items-center justify-center text-muted-foreground">Product not found</div>;

  const handleBuy = () => {
    placeOrder(product);
    setShowPayment(false);
    toast.success("Order placed successfully!", { description: "Check your orders for tracking info." });
    navigate("/profile");
  };

  const handleChat = () => {
    const threadId = startChat(product);
    navigate(`/chat/${threadId}`);
  };

  return (
    <div className="pb-28">
      {/* Image carousel */}
      <div className="relative">
        <button onClick={() => navigate(-1)} className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button onClick={() => toggleSaved(product.id)} className="absolute right-14 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
          <Heart className={`h-5 w-5 ${product.saved ? "fill-accent text-accent" : ""}`} />
        </button>
        <button className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }}>
          <Share2 className="h-5 w-5" />
        </button>

        <div className="aspect-square overflow-hidden bg-muted">
          <AnimatePresence mode="wait">
            <motion.img key={imgIndex} src={product.images[imgIndex]} alt={product.title} className="h-full w-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </AnimatePresence>
        </div>

        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {product.images.map((_, i) => (
              <button key={i} onClick={() => setImgIndex(i)} className={`h-2 w-2 rounded-full transition-colors ${i === imgIndex ? "bg-primary" : "bg-card/60"}`} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-5 px-4 pt-4">
        {/* Info */}
        <div>
          <div className="flex items-start justify-between">
            <h1 className="text-xl font-bold leading-tight">{product.title}</h1>
            <p className="text-xl font-bold text-primary">₹{(product.price * 80).toLocaleString('en-IN')}</p>
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs">{product.condition}</Badge>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{product.location}</span>
            <span>{product.postedAt}</span>
          </div>
        </div>

        {/* Seller */}
        <div className="flex items-center gap-3 rounded-xl bg-secondary p-3" onClick={() => {}} >
          <img src={product.seller.avatar} alt={product.seller.name} className="h-11 w-11 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm">{product.seller.name}</span>
              {product.seller.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <StarRating rating={Math.round(product.seller.rating)} size={12} />
              <span>{product.seller.rating} ({product.seller.reviewCount})</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{product.seller.itemsSold} sold</span>
        </div>

        {/* Description */}
        <div>
          <h3 className="mb-1 font-semibold text-sm">Description</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="mb-2 font-semibold text-sm">Seller Reviews</h3>
          <div className="space-y-3">
            {reviews.slice(0, 3).map(r => (
              <div key={r.id} className="rounded-lg bg-secondary p-3">
                <div className="flex items-center gap-2 mb-1">
                  <img src={r.reviewer.avatar} className="h-6 w-6 rounded-full object-cover" alt="" />
                  <span className="text-xs font-medium">{r.reviewer.name}</span>
                  <StarRating rating={r.rating} size={10} />
                  <span className="ml-auto text-xs text-muted-foreground">{r.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg p-3">
        <div className="mx-auto flex max-w-lg gap-2">
          <Button variant="outline" className="flex-1 gap-2" onClick={handleChat}>
            <MessageCircle className="h-4 w-4" /> Message
          </Button>
          <Button className="flex-1 gap-2" onClick={() => setShowPayment(true)}>
            <CreditCard className="h-4 w-4" /> Buy Now
          </Button>
        </div>
      </div>

      {/* Payment dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Purchase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <img src={product.images[0]} className="h-14 w-14 rounded-lg object-cover" alt="" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{product.title}</p>
                <p className="text-xs text-muted-foreground">From {product.seller.name}</p>
              </div>
              <p className="font-bold text-primary">₹{(product.price * 80).toLocaleString('en-IN')}</p>
            </div>
            <div className="space-y-3 pt-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{(product.price * 80).toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">TradeHub Protection</span><span>₹399</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>₹719</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-bold"><span>Total</span><span>₹{((product.price * 80) + 1118).toLocaleString('en-IN')}</span></div>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>Your purchase is protected by TradeHub Buyer Protection. Full refund if item doesn't match the listing.</span>
            </div>
            <Button className="w-full" onClick={handleBuy}>Confirm & Pay ₹{((product.price * 80) + 1118).toLocaleString('en-IN')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;
