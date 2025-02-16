import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#FFE5F1" barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
