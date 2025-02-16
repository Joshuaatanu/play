import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.push("/signup");
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text style={{ color: "red" }}>Logout</Text>
    </TouchableOpacity>
  );
}
