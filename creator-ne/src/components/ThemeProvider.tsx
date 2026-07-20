"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Temporarily disabled light mode
    setTheme("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      if (newTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
