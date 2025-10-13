import { Home, RefreshCw, Heart, Settings, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/converter", icon: RefreshCw, label: "Convert" },
  { path: "/favorites", icon: Heart, label: "Favorites" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function TopNav() {
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="hidden md:block sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">FxFlow</h1>
          </div>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => setLocation(item.path)}
                  data-testid={`nav-desktop-${item.label.toLowerCase()}`}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
            
            <div className="h-6 w-px bg-border mx-2" />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle-desktop"
              className="hover-elevate"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
