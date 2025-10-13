import Favorites from "../../pages/Favorites";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

export default function FavoritesExample() {
  return (
    <FavoritesProvider>
      <Favorites />
    </FavoritesProvider>
  );
}
