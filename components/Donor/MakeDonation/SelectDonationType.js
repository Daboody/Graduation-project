import DonationTypeButton from "./DonationTypeButton";
import { View, StyleSheet, Text } from "react-native";
import DonationDetailsModal from "./DonationDetailsModal";
import { useState } from "react";

function SelectDonationType() {
  const [donationType, setDonationType] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const donationDetailsHandler = (type) => {
    setDonationType(type);
    setIsVisible(true);
  };

  function closeModalHandler() {
    setIsVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Donation Type</Text>
      <View style={styles.buttonsContainer}>
        <DonationTypeButton
          donationType='Cash'
          icon='wallet-outline'
          onPress={donationDetailsHandler.bind(this, "Cash")}
        />
        <DonationTypeButton
          donationType='Food'
          icon='fast-food-outline'
          onPress={donationDetailsHandler.bind(this, "Food")}
        />
        <DonationTypeButton
          donationType='Clothes & Blankets'
          onPress={donationDetailsHandler.bind(this, "Clothes")}
          icon='shirt-outline'
        />
      </View>
      <DonationDetailsModal
        isVisible={isVisible}
        mode={donationType}
        onCancel={closeModalHandler}
      />
    </View>
  );
}

export default SelectDonationType;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#000",
    marginVertical: 22,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
