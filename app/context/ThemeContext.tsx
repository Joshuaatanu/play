import React, { createContext, useContext, useState, useEffect } from "react";
import { StatusBar } from "react-native";

interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  textLight: string;
}

const lightTheme: Theme = {
  background: "#FFE5F1",
  text: "#333333",
  primary: "#A30D2D",
  secondary: "#a26161",
  border: "#eee",
  textLight: "#666",
};

const darkTheme: Theme = {
  background: "#1a1a1a",
  text: "#ffffff",
  primary: "#ff4d6d",
  secondary: "#ff758f",
  border: "#333333",
  textLight: "#888",
};

function generateRandomTheme(): Theme {
  const hue = Math.floor(Math.random() * 360);
  return {
    background: `hsl(${hue}, 100%, 95%)`,
    text: `hsl(${hue}, 30%, 20%)`,
    primary: `hsl(${hue}, 80%, 40%)`,
    secondary: `hsl(${hue}, 60%, 60%)`,
    border: `hsl(${hue}, 20%, 90%)`,
    textLight: `hsl(${hue}, 30%, 50%)`,
  };
}

type ThemeContextType = {
  theme: Theme;
  setThemeMode: (mode: "light" | "dark" | "random") => void;
  currentMode: "light" | "dark" | "random";
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [currentMode, setCurrentMode] = useState<"light" | "dark" | "random">(
    "light"
  );

  // Update StatusBar when theme changes
  useEffect(() => {
    StatusBar.setBackgroundColor(theme.background);
    StatusBar.setBarStyle(
      theme.text === "#ffffff" ? "light-content" : "dark-content"
    );
  }, [theme]);

  const setThemeMode = (mode: "light" | "dark" | "random") => {
    setCurrentMode(mode);
    switch (mode) {
      case "light":
        setTheme(lightTheme);
        break;
      case "dark":
        setTheme(darkTheme);
        break;
      case "random":
        setTheme(generateRandomTheme());
        break;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode, currentMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeProvider;
