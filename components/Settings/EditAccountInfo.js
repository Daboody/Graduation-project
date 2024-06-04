import { View, Text, StyleSheet, Pressable } from "react-native";
function EditAccountInfo() {
  return (
    <View>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <View style={styles.button}>
          <Text style={styles.text}>Edit Info</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default EditAccountInfo;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 22,
    padding: 10,
  },

  pressed: {
    opacity: 0.75,
  },
});
