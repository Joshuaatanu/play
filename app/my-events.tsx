import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "./context/ThemeContext";
import Header from "./components/Header";

export default function MyEvents() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header profileImage={require("@/assets/images/ico.png")} />
      <Text style={{ color: theme.text, padding: 20 }}>My Events</Text>
    </View>
  );
}
