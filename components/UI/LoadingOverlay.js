import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/styles";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Processing</Text>
      <ActivityIndicator size='large' color={Colors.primaryOne} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    fontSize: 18,
    marginVertical: 12,
    color: Colors.primaryTwo,
    letterSpacing: 3,
  },
});
