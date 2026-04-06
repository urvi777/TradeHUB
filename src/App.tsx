import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import ExplorePage from "./pages/ExplorePage";
import SellPage from "./pages/SellPage";
import ChatListPage from "./pages/ChatListPage";
import ChatDetailPage from "./pages/ChatDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFound from "./pages/NotFound";
import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";
import BottomNav from "./components/BottomNav";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-lg min-h-screen bg-background">
    {children}
    <BottomNav />
  </div>
);

const App = () => {
  const [stage, setStage] = useState<'splash' | 'onboarding' | 'main'>('splash');

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('hasOnboarded');
    if (hasOnboarded) {
      setStage('main'); // skip onboarding if done, but splash logic handles delay
    }
  }, []);

  if (stage === 'splash') {
    return <SplashPage onComplete={() => {
      const hasOnboarded = localStorage.getItem('hasOnboarded');
      setStage(hasOnboarded ? 'main' : 'onboarding');
    }} />;
  }

  if (stage === 'onboarding') {
    return <OnboardingPage onComplete={() => {
      localStorage.setItem('hasOnboarded', 'true');
      setStage('main');
    }} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout><Index /></AppLayout>} />
              <Route path="/explore" element={<AppLayout><ExplorePage /></AppLayout>} />
              <Route path="/sell" element={<AppLayout><SellPage /></AppLayout>} />
              <Route path="/chat" element={<AppLayout><ChatListPage /></AppLayout>} />
              <Route path="/chat/:id" element={<ChatDetailPage />} />
              <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
