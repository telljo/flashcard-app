import { useEffect, useState } from "react";
import Button from "../Button";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="primary"
      size="md">{theme === "light" ? "🌙" : "☀️"}
    </Button>
  );
}
