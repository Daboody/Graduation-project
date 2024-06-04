import { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

function Input({ label }) {
  const [description, setDescription] = useState("");
  const changeTextHandler = (enteredValue) => {
    setDescription(enteredValue);
  };
  return (
    <View>
      <Text style={styles.inputLable}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={changeTextHandler}
          placeholder='Enter Description Here...'
        />
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputLable: {
    fontSize: 16,
    marginHorizontal: 25,
    marginVertical: 5,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  input: {
    padding: 16,
    fontSize: 16,
  },
});
