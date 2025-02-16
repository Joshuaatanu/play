import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function TextInput({
  value,
  onChangeText,
  placeholder,
  style,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: any;
}) {
  const { theme } = useTheme();

  return (
    <RNTextInput
      style={[
        styles.input,
        { color: theme.text, borderColor: theme.border },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={theme.textLight}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});
