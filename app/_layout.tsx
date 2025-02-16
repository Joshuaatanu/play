import React from "react";
import { Stack, usePathname } from "expo-router";
import { ThemeProvider } from "./context/ThemeContext";
import { View } from "react-native";
import BottomTab from "./components/BottomTab";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <ProtectedRoute>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AnalyticsProvider>
          <ThemeProvider>
            <View style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "slide_from_right",
                }}
              >
                <Stack.Screen name="home" />
                <Stack.Screen name="profile" />
                <Stack.Screen name="my-events" />
              </Stack>
              <BottomTab activeRoute={pathname || "/home"} />
            </View>
          </ThemeProvider>
        </AnalyticsProvider>
      </GestureHandlerRootView>
    </ProtectedRoute>
  );
}
