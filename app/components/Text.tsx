import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

type TextProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  weight?: "regular" | "bold";
  color?: string;
  style?: any;
};

export default function Text({
  children,
  size = "md",
  weight = "regular",
  color,
  style,
}: TextProps) {
  const { theme } = useTheme();

  const sizes = {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  };

  const weights = {
    regular: "LibreBaskerville-Regular",
    bold: "LibreBaskerville-Bold",
  };

  return (
    <RNText
      style={[
        {
          fontSize: sizes[size],
          fontFamily: weights[weight],
          color: color || theme.text,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}
