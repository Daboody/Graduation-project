import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Colors } from "../../../constants/styles";

function RequestsMainButton({ onPress, label }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <View>
        <Text style={styles.lable}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default RequestsMainButton;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 25,
    marginVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.primaryBackground,
    elevation: 4,
    paddingVertical: 24,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  lable: {
    color: Colors.primaryTwo,
    textAlign: "center",
    fontSize: 24,
  },
  pressed: {
    opacity: 0.75,
  },
});
