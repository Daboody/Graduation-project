import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/styles";

function VolFlatButton({ children, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default VolFlatButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 26,
  },
  text: {
    paddingVertical: 12,
    fontSize: 17,
    textAlign: "center",
    color: Colors.primaryTwo,
  },
});
