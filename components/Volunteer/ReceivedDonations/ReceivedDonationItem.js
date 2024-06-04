import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";
import VolPrimaryButton from "../UI/VolPrimaryButton";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

function ReceivedDonationItem({
  donationType,
  description,
  requestDate,
  userName,
  phoneNumber,
  docId,
}) {
  const navigation = useNavigation();

  const donationCompletedHandler = async () => {
    const requestRef = doc(db, "newDonationsRequest", docId);
    await setDoc(
      requestRef,
      {
        status: "Completed",
        completedAt: new Date().toString(),
      },
      { merge: true }
    );
    try {
      const docRef = await addDoc(collection(db, "completedDonations"), {
        donationRequestId: docId,
        completedAt: new Date().toString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigation.goBack();
  };

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
      <View style={styles.locationButton}>
        <Text style={styles.locationText}>Show Loaction</Text>
      </View>
      <View style={styles.buttonContainer}>
        <VolPrimaryButton onPress={donationCompletedHandler}>
          Completed
        </VolPrimaryButton>
      </View>
    </View>
  );
}

export default ReceivedDonationItem;

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
  cardDetails: {
    marginLeft: 28,
  },
  detail: {
    marginVertical: 3,
    fontSize: 17,
  },

  locationButton: {
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    fontSize: 17,
    color: Colors.primaryTwo,
  },
  buttonContainer: {
    marginVertical: 12,
  },
});
