import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Ionicons
        name="search"
        size={20}
        color={theme.textLight}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholder="Search events..."
        placeholderTextColor={theme.textLight}
        onChangeText={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
