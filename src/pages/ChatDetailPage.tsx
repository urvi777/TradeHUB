import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chatThreads, sendMessage } = useApp();
  const thread = chatThreads.find(t => t.id === id);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages.length]);

  if (!thread) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(thread.id, text.trim());
    setText("");
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur-lg px-3 py-2.5">
        <button onClick={() => navigate("/chat")} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
        <img src={thread.otherUser.avatar} className="h-9 w-9 rounded-full object-cover" alt="" />
        <div className="flex-1">
          <p className="text-sm font-semibold">{thread.otherUser.name}</p>
          <p className="text-xs text-muted-foreground truncate">{thread.product.title}</p>
        </div>
        <img src={thread.product.images[0]} className="h-9 w-9 rounded-lg object-cover cursor-pointer" alt="" onClick={() => navigate(`/product/${thread.product.id}`)} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {thread.messages.map((msg, i) => {
          const isMe = msg.senderId === "me";
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 ${isMe ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-secondary-foreground rounded-bl-md"}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`mt-0.5 text-[10px] ${isMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.timestamp}</p>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-3">
        <div className="flex gap-2">
          <Input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." className="bg-secondary border-0" onKeyDown={e => e.key === "Enter" && handleSend()} />
          <Button size="icon" onClick={handleSend} disabled={!text.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetailPage;
