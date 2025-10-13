import { createContext, useContext, useEffect, useState } from "react";

export interface Favorite {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: number;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (favorite: Omit<Favorite, "id" | "timestamp">) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (from: string, to: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const stored = localStorage.getItem("fxflow-favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("fxflow-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (favorite: Omit<Favorite, "id" | "timestamp">) => {
    const newFavorite: Favorite = {
      ...favorite,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setFavorites((prev) => [...prev, newFavorite]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (from: string, to: string) => {
    return favorites.some(
      (f) => f.fromCurrency === from && f.toCurrency === to
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, clearFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
