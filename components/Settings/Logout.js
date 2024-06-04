import { Pressable, StyleSheet, Text, View } from "react-native";

function Logout({ onPress }) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>Logout</Text>
      </View>
    </Pressable>
  );
}

export default Logout;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    letterSpacing: 1,
    color: "red",
  },
  pressed: {
    opacity: 0.75,
  },
});
