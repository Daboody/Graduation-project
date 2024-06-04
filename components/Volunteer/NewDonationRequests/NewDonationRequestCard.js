import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../../constants/styles";
import { db } from "../../../firebaseConfig";
import VolPrimaryButton from "../UI/VolPrimaryButton";
import VolSecondaryButton from "../UI/VolSecondaryButton";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import LoadingOverlay from "../../UI//LoadingOverlay";
import VolFlatButton from "../UI/VolFlatButton";

function NewDonationRequestCard({
  userName,
  donationType,
  phoneNumber,
  requestId,
  location,
}) {
  const [isFetching, setIsFetching] = useState(false);

  const donorLocation = location;
  const navigation = useNavigation();

  const auth = getAuth();
  const user = auth.currentUser;
  const acceptDonationHandler = async () => {
    setIsFetching(true);

    const requestRef = doc(db, "newDonationsRequest", requestId);
    await setDoc(
      requestRef,
      {
        status: "Accepted",
        volunteerId: user.uid,
        acceptedAt: new Date().toString(),
      },
      { merge: true }
    );
    setIsFetching(false);
    try {
      const docRef = await addDoc(collection(db, "acceptedDonations"), {
        donationRequestId: requestId,
        acceptedAt: new Date().toString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigation.goBack();
  };

  const showLocationHandler = () => {
    navigation.navigate("ShowDonationMap", {
      donationLocation: donorLocation,
    });
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Request</Text>
      <View style={styles.innerContainer}>
        <View style={styles.cardRow}>
          <View style={styles.cardInner}>
            <Text style={styles.cardDetailsHeader}>Donation Type</Text>
          </View>
          <View style={styles.cardInner}>
            <Text style={styles.cardDetailsText}>{donationType}</Text>
          </View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardInner}>
            <Text style={styles.cardDetailsHeader}>User Name</Text>
          </View>
          <View style={styles.cardInner}>
            <Text style={styles.cardDetailsText}>{userName}</Text>
          </View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardInner}>
            <Text style={styles.cardDetailsHeader}>Phone Number</Text>
          </View>
          <View style={styles.cardInner}>
            <Text style={styles.cardDetailsText}>{phoneNumber}</Text>
          </View>
        </View>
        <VolFlatButton onPress={showLocationHandler}>
          Show Donation Location
        </VolFlatButton>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <VolPrimaryButton onPress={acceptDonationHandler}>
              Accept
            </VolPrimaryButton>
          </View>
          <View style={styles.button}>
            <VolSecondaryButton style={styles.denyButton}>
              Deny
            </VolSecondaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}

export default NewDonationRequestCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 50,
    marginHorizontal: 26,
    borderRadius: 10,
    backgroundColor: Colors.primaryBackground,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  innerContainer: {
    marginTop: 8,
    padding: 8,
  },
  title: {
    marginTop: 12,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 26,
    color: Colors.primaryText,
    borderBottomColor: Colors.primaryTwo,
    borderBottomWidth: 3,
    padding: 8,
    marginHorizontal: 75,
  },
  cardRow: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 14,
  },
  cardInner: {
    flex: 1,
  },
  cardDetailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryTwo,
  },
  cardDetailsText: {
    color: Colors.primaryTwo,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  showLocationButton: {
    marginVertical: 26,
    fontSize: 17,
    textAlign: "center",
    color: Colors.primaryTwo,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
