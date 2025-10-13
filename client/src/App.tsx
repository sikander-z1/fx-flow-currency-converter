import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import SplashScreen from "@/components/SplashScreen";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import Home from "@/pages/Home";
import Converter from "@/pages/Converter";
import Favorites from "@/pages/Favorites";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <TopNav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/converter" component={Converter} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("fxflow-splash-seen");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("fxflow-splash-seen", "true");
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FavoritesProvider>
          <TooltipProvider>
            {showSplash ? (
              <SplashScreen onComplete={handleSplashComplete} />
            ) : (
              <Router />
            )}
            <Toaster />
          </TooltipProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
