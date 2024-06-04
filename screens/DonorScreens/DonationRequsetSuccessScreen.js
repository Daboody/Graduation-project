import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import SecondaryButton from "../../components/UI/SecondaryButton";
import { Colors } from "../../constants/styles";
import { useState } from "react";
import LoadingOverlay from '../../components/UI/LoadingOverlay'

function DonationRequsetSuccessScreen({ route }) {
  const newDonationRequestData = route.params;
  const [isFetching, setIsFetching] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function storeRequestData() {
      setIsFetching(true);
      try {
        const docRef = await addDoc(collection(db, "newDonationsRequest"), {
          ...newDonationRequestData,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setIsFetching(false);
    }
    storeRequestData();
  }, []);

  const donationDoneHandler = () => {
    navigation.replace("Home");
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <LinearGradient
      colors={[Colors.primaryOne, Colors.primaryTwo]}
      style={styles.rootContainer}
    >
      <View>
        <View style={styles.iconeContainerOutter}>
          <Ionicons
            name='checkmark-circle-outline'
            size={150}
            color='#fff'
            style={styles.icone}
          />
        </View>
        <View>
          <Text style={styles.text}>
            Your Request has been sent. We will contact you as soon a possible
          </Text>
        </View>
      </View>
      <View>
        <SecondaryButton title='Done' onPress={donationDoneHandler} />
      </View>
    </LinearGradient>
  );
}

export default DonationRequsetSuccessScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  iconeContainerOutter: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  iconeContainerInner: {
    backgroundColor: "#fff",
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginVertical: 35,
  },
});
