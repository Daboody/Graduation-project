import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";

function RecordItem({
  donationType,
  description,
  requestDate,
  userName,
  phoneNumber,
}) {
  return (
    <View
      key={new Date().toString() + Math.random().toString()}
      style={styles.transactionCard}
    >
      <Text style={styles.cardText}>Donation Details</Text>
      <View style={styles.innerCard}>
        <View style={styles.cardTitle}>
          <Text style={styles.title}>Donation Type</Text>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.title}>Donor Name</Text>
          <Text style={styles.title}>Phone Number</Text>
          <Text style={styles.title}>Request Date</Text>
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.detail}>{donationType} Donation</Text>
          <Text style={styles.detail}>{description}</Text>
          <Text style={styles.detail}>{userName}</Text>
          <Text style={styles.detail}>{phoneNumber}</Text>
          <Text style={styles.detail}>{requestDate}</Text>
        </View>
      </View>
    </View>
  );
}

export default RecordItem;

const styles = StyleSheet.create({
  transactionCard: {
    padding: 15,
    backgroundColor: "#fcf2f2",
    marginVertical: 20,
    marginHorizontal: 25,
    borderRadius: 8,
    elevation: 4,
    shadowRadius: 3.5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowColor: "#000",
    overflow: "hidden",
  },
  cardText: {
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: Colors.primaryText,
    borderBottomColor: Colors.primaryTwo,
    borderBottomWidth: 3,
    padding: 8,
    marginHorizontal: 75,
  },
  transactionDate: {
    marginVertical: 5,
    fontSize: 12,
  },
  cardDetails: {
    marginLeft: 28,
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
  },
  title: {
    marginVertical: 3,
    fontSize: 17,
  },
  detail: {
    marginVertical: 3,
    fontSize: 17,
  },
});
