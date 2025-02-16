import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";
import { FONTS } from "./constants/theme";
import Menu from "./components/Menu";
import { router } from "expo-router";

export default function Settings() {
  const { setThemeMode, currentMode, theme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const themeOptions = [
    { label: "Light Theme", value: "light" },
    { label: "Dark Theme", value: "dark" },
    { label: "Random Theme", value: "random" },
  ] as const;

  return (
    <>
      <Menu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Header
          showBackButton
          onBackPress={() => router.back()}
          profileImage={require("@/assets/images/ico.png")}
        />
        <ScrollView style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Theme Settings
            </Text>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor:
                      currentMode === option.value
                        ? theme.primary
                        : theme.background,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => setThemeMode(option.value)}
              >
                <Text
                  style={[
                    styles.themeText,
                    {
                      color: currentMode === option.value ? "#fff" : theme.text,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              About
            </Text>
            <Text style={[styles.description, { color: theme.text }]}>
              Spacey is your go-to app for tracking astronomical events. Version
              1.0.0
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
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.regular,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    marginBottom: 15,
  },
  themeOption: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  themeText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
});
