import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { currentUser, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const sampleImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop",
];

const SellPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const addSampleImage = () => {
    if (images.length < 5) {
      setImages(prev => [...prev, sampleImages[prev.length % sampleImages.length]]);
    }
  };

  const handleSubmit = () => {
    if (!title || !price || !category || !condition) {
      toast.error("Please fill in all required fields");
      return;
    }
    addProduct({
      id: `p-${Date.now()}`,
      title,
      description,
      price: parseFloat(price),
      images: images.length ? images : [sampleImages[0]],
      category,
      condition: condition as any,
      seller: currentUser,
      location: location || "Your Location",
      postedAt: "Just now",
      saved: false,
    });
    toast.success("Listing published!");
    navigate("/");
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <h1 className="text-lg font-bold">Create Listing</h1>
      </div>

      <div className="space-y-5 px-4 pt-4">
        {/* Images */}
        <div>
          <p className="mb-2 text-sm font-semibold">Photos</p>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <div key={i} className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-muted">
                <img src={img} className="h-full w-full object-cover" alt="" />
                <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))} className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-card/80">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button onClick={addSampleImage} className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Camera className="h-5 w-5" />
                <span className="text-[10px]">Add Photo</span>
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Title *</label>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="What are you selling?" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Description</label>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your item..." rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-semibold">Price *</label>
            <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="₹0" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Location</label>
            <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="City, State" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-semibold">Category *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {categories.filter(c => c !== "All").map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Condition *</label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {["New", "Like New", "Good", "Fair"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full" onClick={handleSubmit}>Publish Listing</Button>
      </div>
    </div>
  );
};

export default SellPage;
