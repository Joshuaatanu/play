import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FONTS } from "../constants/theme";
import { useTheme } from "../context/ThemeContext";

type EventCardProps = {
  title: string;
  date: string;
  image: any;
  onPress: () => void;
};

export default function EventCard({
  title,
  date,
  image,
  onPress,
}: EventCardProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.background,
      borderRadius: 15,
      marginBottom: 15,
      overflow: "hidden",
      elevation: 3,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: "100%",
      height: 150,
      resizeMode: "cover",
    },
    content: {
      padding: 15,
    },
    title: {
      fontFamily: FONTS.regular,
      fontSize: 18,
      color: theme.text,
      marginBottom: 5,
    },
    date: {
      color: theme.secondary,
      fontSize: 14,
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}
