import Settings from "../../pages/Settings";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { FavoritesProvider } from "../../contexts/FavoritesContext";

export default function SettingsExample() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Settings />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
