export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair";
  seller: User;
  location: string;
  postedAt: string;
  saved: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  verified: boolean;
  itemsSold: number;
}

export interface Review {
  id: string;
  reviewer: User;
  rating: number;
  comment: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  product: Product;
  otherUser: User;
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

export interface Order {
  id: string;
  product: Product;
  status: "pending" | "paid" | "shipped" | "delivered";
  date: string;
  trackingNumber?: string;
}

const UNSPLASH = (q: string, i: number = 0) =>
  `https://images.unsplash.com/photo-${q}?w=600&h=600&fit=crop`;

export const users: User[] = [
  { id: "u1", name: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", rating: 4.8, reviewCount: 47, joinedDate: "Jan 2023", verified: true, itemsSold: 63 },
  { id: "u2", name: "James Rodriguez", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 4.5, reviewCount: 23, joinedDate: "Mar 2023", verified: true, itemsSold: 31 },
  { id: "u3", name: "Emily Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", rating: 4.9, reviewCount: 82, joinedDate: "Nov 2022", verified: true, itemsSold: 104 },
  { id: "u4", name: "Marcus Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", rating: 4.2, reviewCount: 15, joinedDate: "Jul 2023", verified: false, itemsSold: 12 },
  { id: "u5", name: "Olivia Park", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", rating: 4.7, reviewCount: 56, joinedDate: "Feb 2023", verified: true, itemsSold: 78 },
];

export const currentUser: User = {
  id: "me",
  name: "Urvi Patel",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  rating: 4.6,
  reviewCount: 34,
  joinedDate: "Dec 2022",
  verified: true,
  itemsSold: 45,
};

export const products: Product[] = [
  { id: "p1", title: "Sony WH-1000XM5 Headphones", description: "Premium noise-cancelling headphones in excellent condition. Includes original box, carrying case, and all cables. Battery life still excellent — about 28 hours on a single charge.", price: 219, images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"], category: "Electronics", condition: "Like New", seller: users[0], location: "San Francisco, CA", postedAt: "2 hours ago", saved: false },
  { id: "p2", title: "Mid-Century Modern Desk", description: "Beautiful walnut desk with clean lines. Some minor surface wear consistent with age. Dimensions: 48\"W x 24\"D x 30\"H. Perfect for a home office.", price: 340, images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=600&fit=crop"], category: "Furniture", condition: "Good", seller: users[1], location: "Austin, TX", postedAt: "5 hours ago", saved: true },
  { id: "p3", title: "Canon EOS R6 Camera Body", description: "Professional mirrorless camera. Shutter count under 10k. Comes with 2 batteries, charger, and strap. No scratches on the sensor or body.", price: 1450, images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop"], category: "Electronics", condition: "Like New", seller: users[2], location: "New York, NY", postedAt: "1 day ago", saved: false },
  { id: "p4", title: "Vintage Leather Jacket", description: "Genuine leather bomber jacket, size M. Broken in perfectly with beautiful patina. No tears or damage.", price: 185, images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop"], category: "Fashion", condition: "Good", seller: users[3], location: "Portland, OR", postedAt: "3 hours ago", saved: false },
  { id: "p5", title: "iPad Pro 12.9\" M2 256GB", description: "Space gray iPad Pro with M2 chip. Comes with Apple Pencil 2nd gen and Magic Keyboard. Screen in perfect condition with screen protector since day one.", price: 890, images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop"], category: "Electronics", condition: "Like New", seller: users[4], location: "Seattle, WA", postedAt: "6 hours ago", saved: true },
  { id: "p6", title: "Herman Miller Aeron Chair", description: "Size B, fully loaded with all adjustments. Remastered version. Some normal wear on the mesh but fully functional. Lumbar support included.", price: 650, images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=600&fit=crop"], category: "Furniture", condition: "Good", seller: users[0], location: "Chicago, IL", postedAt: "1 day ago", saved: false },
  { id: "p7", title: "Nike Air Jordan 1 Retro High", description: "Size 10. Worn twice, in near perfect condition. Comes with original box and extra laces.", price: 175, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"], category: "Fashion", condition: "Like New", seller: users[1], location: "Miami, FL", postedAt: "8 hours ago", saved: false },
  { id: "p8", title: "KitchenAid Stand Mixer", description: "Artisan 5-quart stand mixer in Empire Red. Includes 3 attachments. Used a handful of times — practically new.", price: 220, images: ["https://images.unsplash.com/photo-1594385208974-2f8bb07bcc5b?w=600&h=600&fit=crop"], category: "Home", condition: "Like New", seller: users[2], location: "Denver, CO", postedAt: "12 hours ago", saved: false },
  { id: "p9", title: "Mountain Bike — Trek Marlin 7", description: "2023 model, size L. Ridden on trails about 15 times. Minor cosmetic scratches but mechanically perfect. Recently tuned up.", price: 580, images: ["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=600&fit=crop"], category: "Sports", condition: "Good", seller: users[3], location: "Boulder, CO", postedAt: "2 days ago", saved: false },
  { id: "p10", title: "Dyson V15 Detect Vacuum", description: "Cordless stick vacuum with laser dust detection. All attachments included. Battery holds strong charge.", price: 395, images: ["https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=600&fit=crop"], category: "Home", condition: "Like New", seller: users[4], location: "Los Angeles, CA", postedAt: "4 hours ago", saved: false },
];

export const reviews: Review[] = [
  { id: "r1", reviewer: users[1], rating: 5, comment: "Excellent seller! Item was exactly as described and shipped super fast.", date: "2 weeks ago" },
  { id: "r2", reviewer: users[2], rating: 5, comment: "Great communication and fair pricing. Would buy from again!", date: "1 month ago" },
  { id: "r3", reviewer: users[3], rating: 4, comment: "Item was in good condition. Shipping took a bit longer than expected.", date: "3 weeks ago" },
  { id: "r4", reviewer: users[4], rating: 5, comment: "Smooth transaction. Highly recommend this seller.", date: "1 week ago" },
  { id: "r5", reviewer: users[0], rating: 4, comment: "Product quality was good, minor wear not mentioned in listing but overall happy.", date: "2 months ago" },
];

export const chatThreads: ChatThread[] = [
  {
    id: "c1",
    product: products[0],
    otherUser: users[0],
    lastMessage: "Is the price negotiable?",
    lastMessageTime: "2m ago",
    unread: 2,
    messages: [
      { id: "m1", senderId: "me", text: "Hi! Is this still available?", timestamp: "10:30 AM" },
      { id: "m2", senderId: "u1", text: "Yes, it is! Are you interested?", timestamp: "10:32 AM" },
      { id: "m3", senderId: "me", text: "Definitely. Is the price negotiable?", timestamp: "10:35 AM" },
    ],
  },
  {
    id: "c2",
    product: products[2],
    otherUser: users[2],
    lastMessage: "I can do ₹1350 if you pick up",
    lastMessageTime: "1h ago",
    unread: 0,
    messages: [
      { id: "m4", senderId: "me", text: "Would you consider ₹1300?", timestamp: "9:00 AM" },
      { id: "m5", senderId: "u3", text: "I can do ₹1350 if you pick up", timestamp: "9:15 AM" },
    ],
  },
  {
    id: "c3",
    product: products[4],
    otherUser: users[4],
    lastMessage: "Sure, I can meet tomorrow at 3pm",
    lastMessageTime: "3h ago",
    unread: 1,
    messages: [
      { id: "m6", senderId: "u5", text: "Hi! I saw you're interested in the iPad", timestamp: "Yesterday" },
      { id: "m7", senderId: "me", text: "Yes! Can we meet in person?", timestamp: "Yesterday" },
      { id: "m8", senderId: "u5", text: "Sure, I can meet tomorrow at 3pm", timestamp: "3h ago" },
    ],
  },
];

export const orders: Order[] = [
  { id: "o1", product: products[1], status: "delivered", date: "Mar 15, 2024", trackingNumber: "TH-284719365" },
  { id: "o2", product: products[6], status: "shipped", date: "Mar 28, 2024", trackingNumber: "TH-947261038" },
  { id: "o3", product: products[7], status: "paid", date: "Apr 2, 2024" },
];

export const categories = ["All", "Electronics", "Furniture", "Fashion", "Home", "Sports"];
