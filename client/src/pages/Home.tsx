import { ArrowRightLeft, Heart, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Home() {
  const [, setLocation] = useLocation();
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-4">
            <ArrowRightLeft className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to <span className="text-primary">FxFlow</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert currencies instantly with live exchange rates. Fast, simple, and beautiful.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Button
            size="lg"
            onClick={() => setLocation("/converter")}
            data-testid="button-convert-now"
            className="text-base px-8 py-6 rounded-xl"
          >
            <ArrowRightLeft className="w-5 h-5 mr-2" />
            Convert Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setLocation("/favorites")}
            data-testid="button-view-favorites"
            className="text-base px-8 py-6 rounded-xl hover-elevate"
          >
            <Heart className="w-5 h-5 mr-2" />
            {favorites.length > 0 ? `Favorites (${favorites.length})` : "Favorites"}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Card className="p-8 space-y-4 hover-elevate transition-all">
            <div className="w-12 h-12 rounded-2xl bg-chart-2/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-chart-2" />
            </div>
            <h3 className="text-xl font-semibold">Live Rates</h3>
            <p className="text-muted-foreground">
              Get real-time exchange rates for all major world currencies, updated instantly.
            </p>
          </Card>

          <Card className="p-8 space-y-4 hover-elevate transition-all">
            <div className="w-12 h-12 rounded-2xl bg-chart-3/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-chart-3" />
            </div>
            <h3 className="text-xl font-semibold">Save Favorites</h3>
            <p className="text-muted-foreground">
              Save your frequently used currency pairs for quick access anytime.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
