import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="icon-button theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      type="button"
    >
      {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
