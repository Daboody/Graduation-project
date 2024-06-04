import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function ResetPasswordButton() {
  return (
    <View>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <View style={styles.container}>
          <Text style={styles.text}>Reset Password</Text>
          <Ionicons name='arrow-forward-outline' size={22} />
        </View>
      </Pressable>
    </View>
  );
}

export default ResetPasswordButton;

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#ccc",
    borderBottomColor: "#ccc",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: "100%",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#ccc",
  },
});
