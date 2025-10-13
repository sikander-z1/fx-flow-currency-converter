import Home from "../../pages/Home";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

export default function HomeExample() {
  return (
    <FavoritesProvider>
      <Home />
    </FavoritesProvider>
  );
}
