import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

const ChatListPage = () => {
  const { chatThreads } = useApp();
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <h1 className="text-lg font-bold">Messages</h1>
      </div>

      {chatThreads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p className="text-sm">No conversations yet</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {chatThreads.map((thread, i) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/50"
              onClick={() => navigate(`/chat/${thread.id}`)}
            >
              <div className="relative">
                <img src={thread.otherUser.avatar} className="h-12 w-12 rounded-full object-cover" alt="" />
                {thread.unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">{thread.unread}</span>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{thread.otherUser.name}</span>
                  <span className="text-xs text-muted-foreground">{thread.lastMessageTime}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{thread.product.title}</p>
                <p className={`truncate text-xs ${thread.unread > 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{thread.lastMessage}</p>
              </div>
              <img src={thread.product.images[0]} className="h-10 w-10 rounded-lg object-cover" alt="" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatListPage;
