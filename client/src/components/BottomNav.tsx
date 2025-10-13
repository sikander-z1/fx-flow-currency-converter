import { Home, RefreshCw, Heart, Settings } from "lucide-react";
import { useLocation } from "wouter";

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

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="mx-4 mb-4 rounded-t-3xl bg-card/95 backdrop-blur-lg shadow-xl border border-card-border">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all hover-elevate active-elevate-2 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
