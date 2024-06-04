import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { VolunteerNavigation } from "../App";
import { DonorNavigation } from "../App";

import PrimaryButton from "../components/UI/PrimaryButton";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";

function StartingScreen() {
  const [isDonor, setIsDonor] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const showDonorStackHandler = () => {
    setIsDonor(true);
  };
  const showVolunteerStackHandler = () => {
    setIsVolunteer(true);
  };

  if (isDonor) {
    return <DonorNavigation />;
  }
  if (isVolunteer) {
    return <VolunteerNavigation />;
  }
  return (
    <LinearGradient
      colors={[Colors.primaryOne, Colors.primaryTwo]}
      style={styles.container}
    >
      <Text style={styles.introText}>
        خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِمْ بِهَا
        وَصَلِّ عَلَيْهِمْ إِنَّ صَلَاتَكَ سَكَنٌ لَهُمْ وَاللَّهُ سَمِيعٌ
        عَلِيمٌ
      </Text>
      <View style={styles.buttonsContainer}>
        <Text style={styles.text}>Continue as ... </Text>
        <View style={styles.button}>
          <PrimaryButton
            style={[styles.volunteerButton, styles.buttonsShadow]}
            onPress={showVolunteerStackHandler}
            title='Volunteer'
          />
        </View>
        <View style={styles.button}>
          <PrimaryButton
            style={[styles.donorButton, styles.buttonsShadow]}
            onPress={showDonorStackHandler}
            title='Donor'
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export default StartingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  introText: {
    marginTop: 120,
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    marginTop: 56,
  },
  buttonsContainer: {
    flex: 1,
    marginTop: 20,
  },
  button: {
    marginTop: 26,
  },
  donorButton: {
    backgroundColor: Colors.primaryOne,
  },
  volunteerButton: {
    backgroundColor: Colors.primaryOne,
  },
  buttonsShadow: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
});
