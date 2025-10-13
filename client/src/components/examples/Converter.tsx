import Converter from "../../pages/Converter";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

export default function ConverterExample() {
  return (
    <FavoritesProvider>
      <Converter />
    </FavoritesProvider>
  );
}
