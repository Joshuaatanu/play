import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  onMenuPress: () => void;
  profileImage: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress, profileImage }) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Hamburger Menu */}
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#A30D2D" />
        </TouchableOpacity>

        {/* Profile Picture */}
        <Image
          source={require("@/assets/images/signup.png")}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 8, // Small border radius for square shape
  },
});

export default Header;
