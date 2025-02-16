import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";
import { FONTS } from "./constants/theme";
import { Switch } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Button from "./components/Button";
import TextInput from "./components/TextInput";

export default function Profile() {
  const { theme, setThemeMode, currentMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require("@/assets/images/ico.png")
  );
  const [username, setUsername] = useState("John Doe");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    profileImage: require("@/assets/images/ico.png"),
  });
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    // Mock save
    setProfile((prev) => ({ ...prev, username }));
    setIsEditing(false);
  };

  const themeOptions = [
    { label: "Light Theme", value: "light" },
    { label: "Dark Theme", value: "dark" },
    { label: "Random Theme", value: "random" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 20,
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: 30,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
    },
    editButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: theme.primary,
      padding: 5,
      borderRadius: 15,
    },
    name: {
      fontSize: 24,
      fontFamily: FONTS.regular,
      marginBottom: 5,
      color: theme.text,
    },
    email: {
      fontSize: 16,
      opacity: 0.8,
      color: theme.text,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: FONTS.regular,
      marginBottom: 15,
      color: theme.text,
    },
    preferenceItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    preferenceText: {
      fontSize: 16,
      color: theme.text,
    },
    themeOption: {
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.border,
    },
    themeText: {
      fontSize: 16,
      fontFamily: FONTS.regular,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={profileImage} style={styles.profileImage} />
            <View style={styles.editButton}>
              <Text style={{ color: "#fff" }}>Edit</Text>
            </View>
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              style={{ width: "80%", textAlign: "center" }}
            />
          ) : (
            <Text style={styles.name}>{username}</Text>
          )}
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.background}
            />
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={theme.background}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme Settings</Text>
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
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={[styles.preferenceText, { opacity: 0.8 }]}>
            Spacey is your go-to app for tracking astronomical events. Version
            1.0.0
          </Text>
        </View>

        {isEditing ? (
          <Button title="Save Changes" onPress={handleSave} />
        ) : (
          <Button
            title="Edit Profile"
            onPress={() => setIsEditing(true)}
            variant="secondary"
          />
        )}
      </View>
    </ScrollView>
  );
}
