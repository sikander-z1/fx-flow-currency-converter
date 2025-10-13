import { Moon, Sun, Trash2, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { favorites, clearFavorites } = useFavorites();
  const { toast } = useToast();

  const handleClearFavorites = () => {
    clearFavorites();
    toast({
      title: "Favorites Cleared",
      description: "All your saved currency pairs have been removed.",
    });
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Customize your FxFlow experience
          </p>
        </div>

        <div className="space-y-4 animate-slide-up">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <Label htmlFor="dark-mode" className="text-base font-medium flex items-center gap-2">
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                data-testid="switch-dark-mode"
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Trash2 className="w-5 h-5 text-destructive mt-1" />
                <div className="flex-1 space-y-1">
                  <Label className="text-base font-medium">Clear All Favorites</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove all saved currency pairs ({favorites.length} items)
                  </p>
                </div>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    disabled={favorites.length === 0}
                    data-testid="button-clear-favorites"
                    className="w-full rounded-xl"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Favorites
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear All Favorites?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all {favorites.length} saved currency pairs. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-testid="button-cancel-clear">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearFavorites}
                      data-testid="button-confirm-clear"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1 space-y-2">
                <Label className="text-base font-medium">About FxFlow</Label>
                <p className="text-sm text-muted-foreground">
                  A modern, minimalistic currency converter with live exchange rates powered by ExchangeRate-API.
                </p>
                <p className="text-xs text-muted-foreground">
                  Version 1.0.0 • Built with React
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
