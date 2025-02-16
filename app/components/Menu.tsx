import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

type MenuProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function Menu({ isVisible, onClose }: MenuProps) {
  const router = useRouter();

  if (!isVisible) return null;

  const menuItems = [
    { label: "Profile", route: "profile" },
    { label: "My Events", route: "my-events" },
    { label: "Settings", route: "settings" },
    { label: "Sign Out", route: "/" },
  ];

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <Pressable style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => {
              router.push(item.route);
              onClose();
            }}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Pressable>
    </Pressable>
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
