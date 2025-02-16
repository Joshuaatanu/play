import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";

const tabs = [
  { label: "Home", icon: "home", route: "/home" },
  { label: "Events", icon: "calendar", route: "/my-events" },
  { label: "Profile", icon: "person", route: "/profile" },
];

export default function BottomTab({ activeRoute }: { activeRoute: string }) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.route}
          style={styles.tab}
          onPress={() => router.push(tab.route)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={activeRoute === tab.route ? theme.primary : theme.text}
          />
          <Text
            style={[
              styles.label,
              {
                color: activeRoute === tab.route ? theme.primary : theme.text,
              },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  tab: {
    alignItems: "center",
    padding: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
