import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function EmptyState({ message }: { message: string }) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons
        name="planet-outline"
        size={48}
        color={theme.textLight}
        style={styles.icon}
      />
      <Text style={[styles.message, { color: theme.textLight }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});
