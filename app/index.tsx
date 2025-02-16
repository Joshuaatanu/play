import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen, router } from "expo-router";

// SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded] = useFonts({
    libre: require("@/assets/fonts/LibreBaskerville-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={require("@/assets/images/ico.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Heading size={30}>Keep it</Heading>
          <Heading size={45}>Spacey</Heading>
          <Text style={styles.subtitle}>
            The astronomical event app of the century
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("signup")}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const Heading = ({ children, size }: { children: string; size: number }) => (
  <Text style={[styles.heading, { fontSize: size }]}>{children}</Text>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE5F1",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  image: {
    width: 340,
    height: 320,
    alignSelf: "center",
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
    fontWeight: "400",
    fontFamily: "libre",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "300",
    color: "#a26161",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#a61e4d",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 240,
    height: 67,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});
