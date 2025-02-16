import { router } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  StyleSheet,
} from "react-native";

export default function SignUp() {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/signup.png")}
        style={styles.image}
      />
      <View style={{ marginTop: 20 }}>
        <Heading size={23}>Sign Up</Heading>
      </View>

      <View style={{ marginTop: 20, paddingLeft: 30, paddingRight: 30 }}>
        <Text style={styles.label}>Nickname</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
        />

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        {/* E-mail */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home" as any)}
        >
          <Text style={styles.buttonText}>pick events </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const Heading = ({ children, size }: { children: string; size: number }) => (
  <Text style={[styles.heading, { fontSize: size }]}>{children}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE5F1",
    padding: 15,
  },
  image: {
    marginTop: 20,
    width: 263,
    height: 296,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  heading: {
    textAlign: "center",
    fontWeight: "400",
    fontFamily: "libre",
  },
  label: {
    fontFamily: "libre",
    fontSize: 14,

    marginBottom: 0,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#A30D2D", // Dark red border
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
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
