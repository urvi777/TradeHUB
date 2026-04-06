import { Star } from "lucide-react";

const StarRating = ({ rating, size = 14, interactive, onChange }: { rating: number; size?: number; interactive?: boolean; onChange?: (r: number) => void }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        className={`${interactive ? "cursor-pointer" : ""} ${i <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
        style={{ width: size, height: size }}
        onClick={() => interactive && onChange?.(i)}
      />
    ))}
  </div>
);

export default StarRating;
