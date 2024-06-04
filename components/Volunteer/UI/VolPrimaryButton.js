import { Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../../constants/styles";

function VolPrimaryButton({ onPress, style, children }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default VolPrimaryButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 14,
    backgroundColor: Colors.primaryOne,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});
