import { StyleSheet, Alert, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../../components/UI/PrimaryButton";
import { useState, useCallback } from "react";
import { getFormattedDate } from "../../util/date";
import { getAuth } from "firebase/auth";

function IdentifyLocationScreen({ route }) {
  const auth = getAuth();
  const user = auth.currentUser;

  const requestData = route.params;

  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 15.5007,
    longitude: 32.5599,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function pickedLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }
  const sendDonationRequestHandler = useCallback(async () => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Picked",
        "You have to pick a location (by tapping on the map) first"
      );
      return;
    }
    const newRequestData = {
      donorId: user.uid,
      donationType: requestData.donationType,
      description: requestData.donationDescription,
      location: selectedLocation,
      requestDate: getFormattedDate(new Date()),
      status: "newRequest",
    };

    navigation.navigate("DonationRequsetSuccessScreen", newRequestData);
  });
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={pickedLocationHandler}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>
      <PrimaryButton
        title='Send Donation Request'
        onPress={sendDonationRequestHandler}
        style={styles.button}
      />
    </View>
  );
}

export default IdentifyLocationScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  button: {
    position: "absolute",
    left: 30,
    width: 300,
    bottom: 20,
  },
});
