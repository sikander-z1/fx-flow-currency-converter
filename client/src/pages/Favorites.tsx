import { Heart, Trash2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const { toast } = useToast();

  const handleRemove = (id: string, fromCurrency: string, toCurrency: string) => {
    removeFavorite(id);
    toast({
      title: "Removed from Favorites",
      description: `${fromCurrency} → ${toCurrency} has been removed.`,
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold">Favorites</h1>
          <p className="text-muted-foreground">
            Your saved currency pairs and exchange rates
          </p>
        </div>

        {favorites.length === 0 ? (
          <Card className="p-12 text-center space-y-4 animate-slide-up">
            <div className="w-32 h-32 mx-auto rounded-full bg-muted/30 flex items-center justify-center">
              <Heart className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No Favorites Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Save your frequently used currency pairs from the converter to access them quickly here.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 animate-slide-up">
            {favorites.map((favorite, index) => (
              <Card
                key={favorite.id}
                className="p-6 space-y-4 hover-elevate transition-all"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold" data-testid={`text-from-${favorite.id}`}>
                      {favorite.fromCurrency}
                    </span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    <span className="text-2xl font-bold" data-testid={`text-to-${favorite.id}`}>
                      {favorite.toCurrency}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(favorite.id, favorite.fromCurrency, favorite.toCurrency)}
                    data-testid={`button-remove-${favorite.id}`}
                    className="hover-elevate -mt-2 -mr-2"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-muted-foreground">Exchange Rate</span>
                    <span className="text-lg font-semibold" data-testid={`text-rate-${favorite.id}`}>
                      {favorite.rate.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">Last Updated</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(favorite.timestamp)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
