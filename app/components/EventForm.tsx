import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

export default function EventForm({
  onSubmit,
}: {
  onSubmit: (event: any) => void;
}) {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    const mockEvent = { title, description, date };
    console.log("Event created:", mockEvent);
    router.push("/my-events");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.primary },
        ]}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme.textLight}
      />

      <TextInput
        style={[
          styles.input,
          { color: theme.text, borderColor: theme.primary },
        ]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor={theme.textLight}
      />

      <Button
        title="Select Date"
        onPress={() => setShowDatePicker(true)}
        color={theme.primary}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            selectedDate && setDate(selectedDate);
          }}
        />
      )}

      <Button
        title="Create Event"
        onPress={handleSubmit}
        color={theme.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});
