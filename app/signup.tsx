import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "./context/ThemeContext";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    // Mock authentication
    const mockUser = {
      token: "mock-token",
      user: { email, username },
    };
    await AsyncStorage.setItem("token", mockUser.token);
    router.push("/home");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 20,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontFamily: "LibreBaskerville-Regular",
      color: theme.text,
      marginBottom: 20,
    },
    toggleText: {
      color: theme.primary,
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/signup.png")}
        style={styles.image}
      />
      <Text style={styles.title}>{isSignIn ? "Sign In" : "Sign Up"}</Text>

      {!isSignIn && (
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ width: "100%", marginBottom: 10 }}
        />
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: "100%", marginBottom: 20 }}
      />

      <Button
        title={isSignIn ? "Sign In" : "Sign Up"}
        onPress={handleAuth}
        style={{ width: "100%" }}
      />

      <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
        <Text style={styles.toggleText}>
          {isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
