import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { router } from "expo-router";

type MenuProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function Menu({ isVisible, onClose }: MenuProps) {
  const menuItems = [
    { label: "Profile", onPress: () => router.push("/profile") },
    { label: "My Events", onPress: () => router.push("/my-events") },
    { label: "Settings", onPress: () => router.push("/settings") },
    { label: "Sign Out", onPress: () => router.push("/") },
  ];

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => {
              item.onPress();
              onClose();
            }}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "#FFE5F1",
    padding: 20,
    paddingTop: 50,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 18,
    fontFamily: "libre",
    color: "#333",
  },
});
