import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function TransactionItem({
  donationType,
  description,
  onPress,
  requestDate,
  requestId,
}) {
  return (
    <Pressable
      key={requestId}
      style={({ pressed }) => [
        styles.transactionCard,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.transactionDate}>{requestDate}</Text>
      </View>
      <View style={styles.cardInner}>
        <Text>{donationType} Donation</Text>
        <Text>{description}</Text>
        <Ionicons
          name={
            donationType === "Cash"
              ? "wallet-outline"
              : donationType === "Food"
              ? "fast-food-outline"
              : "shirt-outline"
          }
          size={22}
          color='#725f09'
        />
      </View>
    </Pressable>
  );
}

export default TransactionItem;

const styles = StyleSheet.create({
  transactionCard: {
    padding: 15,
    backgroundColor: "#fcf2f2",
    marginVertical: 10,
    marginHorizontal: 25,
    borderRadius: 8,
    elevation: 4,
    shadowRadius: 3.5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowColor: "#000",
  },
  transactionDate: {
    marginVertical: 5,
    fontSize: 12,
  },
  cardInner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.75,
  },
});
