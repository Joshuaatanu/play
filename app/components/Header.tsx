import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import BackButton from "./BackButton";

interface HeaderProps {
  profileImage: any;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export default function Header({
  profileImage,
  showBackButton = false,
  onBackPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profileImage} />
        {showBackButton && onBackPress && <BackButton onPress={onBackPress} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
});
