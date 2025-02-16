import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { COLORS, FONTS } from "./constants/theme";
import Header from "./components/Header";
import Menu from "./components/Menu";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [menuVisible, setMenuVisible] = useState(false);
  // In a real app, fetch event details using id

  return (
    <>
      <Menu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />
      <View style={styles.container}>
        <Header
          showBackButton
          onBackPress={() => router.back()}
          profileImage={require("@/assets/images/ico.png")}
        />
        <ScrollView>
          <Image
            source={require("@/assets/images/ico.png")}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.title}>Meteor Shower</Text>
            <Text style={styles.date}>April 22, 2024</Text>
            <Text style={styles.description}>
              Experience the breathtaking Lyrid meteor shower...
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.regular,
    color: COLORS.text,
  },
  date: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 5,
  },
  description: {
    marginTop: 15,
    lineHeight: 24,
    color: COLORS.text,
  },
});
