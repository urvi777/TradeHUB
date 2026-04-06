import { useState } from "react";
import { Settings, ShieldCheck, Package, Heart, Star, ChevronRight, MapPin, Clock, Plus, LogOut, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { currentUser, reviews } from "@/data/mockData";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  pending: "bg-warning/10 text-warning",
  paid: "bg-info/10 text-info",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-success/10 text-success",
};

const ProfilePage = () => {
  const { products, orders } = useApp();
  const navigate = useNavigate();
  const savedProducts = products.filter(p => p.saved);
  const myListings = products.filter(p => p.seller.id === currentUser.id);

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold">Profile</h1>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Cover Photo & Avatar */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
        
        <div className="px-4 pb-2 -mt-12 relative z-10">
          <div className="flex justify-between items-end mb-3">
            <div className="relative">
              <img src={currentUser.avatar} className="h-24 w-24 rounded-full object-cover ring-4 ring-background shadow-xl" alt="" />
              {currentUser.verified && (
                <div className="absolute bottom-0 right-0 bg-background rounded-full p-0.5">
                  <ShieldCheck className="h-6 w-6 text-primary fill-primary/20" />
                </div>
              )}
            </div>
            <button className="bg-primary/10 hover:bg-primary/20 text-primary transition-colors px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 backdrop-blur-md">
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{currentUser.name}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <StarRating rating={Math.round(currentUser.rating)} size={14} />
              <span className="font-medium text-foreground">{currentUser.rating}</span>
              <span>({currentUser.reviewCount} reviews)</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Joined {currentUser.joinedDate}
            </p>
            
            {/* Stats */}
            <div className="flex gap-4 mt-4 pt-4 border-t border-border">
              <div className="flex flex-col">
                <span className="font-bold text-lg">{currentUser.itemsSold}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Items Sold</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">{myListings.length}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Active Listings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="orders" className="px-4 pt-2">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders" className="text-xs">Orders</TabsTrigger>
          <TabsTrigger value="listings" className="text-xs">Listings</TabsTrigger>
          <TabsTrigger value="saved" className="text-xs">Saved</TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-3 space-y-2">
          {orders.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No orders yet</p>
          ) : orders.map((order, i) => (
            <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-xl bg-card border border-border p-3">
              <img src={order.product.images[0]} className="h-14 w-14 rounded-lg object-cover" alt="" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{order.product.title}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
                {order.trackingNumber && <p className="text-xs text-muted-foreground">#{order.trackingNumber}</p>}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">₹{(order.product.price * 80).toLocaleString('en-IN')}</p>
                <Badge className={`text-[10px] ${statusColors[order.status]}`}>{order.status}</Badge>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="listings" className="mt-4 px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Your Products ({myListings.length})</h3>
            <button 
              onClick={() => navigate('/sell')}
              className="flex items-center gap-1 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-full shadow-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" /> Add Product
            </button>
          </div>
          
          {myListings.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-dashed border-border">
              <Package className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium mb-1">No listings yet</p>
              <p className="text-xs text-muted-foreground mb-4">You haven't listed any items for sale.</p>
              <button 
                onClick={() => navigate('/sell')}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-md active:scale-95 transition-all"
              >
                Create your first listing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">{myListings.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-4 px-4">
          {savedProducts.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-dashed border-border">
              <Heart className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium">No saved items</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">{savedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="mt-4 px-4 space-y-3">
          {reviews.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-card border border-border p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <img src={r.reviewer.avatar} className="h-8 w-8 rounded-full object-cover" alt="" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{r.reviewer.name}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} size={11} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
