import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function DonationTypeButton({ donationType, style, onPress, icon }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <Ionicons name={icon} size={42} color='#725f09' />
        </View>
      </Pressable>
      <Text style={styles.buttonText}>{donationType}</Text>
    </View>
  );
}

export default DonationTypeButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: 75,
    height: 75,
    backgroundColor:'#fcf2f2',
    justifyContent: "center",
    alignItems: "center",
    elevation:3,
    shadowColor: "#000",
    shadowRadius: 3.5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.50,
  },
  buttonText: {
    textAlign: "center",
    color: "#000",
    maxWidth:100,
    fontSize:15,
    marginTop:10
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
});
