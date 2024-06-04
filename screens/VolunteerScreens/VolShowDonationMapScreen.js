import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { getMapPreview } from "../../util/location";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import VolPrimaryButton from "../../components/Volunteer/UI/VolPrimaryButton";
import { Colors } from "../../constants/styles";


function VolShowDonationMapScreen({ route }) {
  const donationLocation = route.params;

  const [pickedLocation, setPickedLocation] = useState("");
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermission() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionRequest = await requestPermission();
      return permissionRequest.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant Location permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }
  return (
    <View style={styles.mapPerview}>
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(
            pickedLocation.lat,
            pickedLocation.lng,
            donationLocation.donationLocation.lat,
            donationLocation.donationLocation.lng
          ),
        }}
      />
      <View style={styles.buttonContainer}>
        <VolPrimaryButton onPress={getLocationHandler} style={styles.button}>
          Show Direction
        </VolPrimaryButton>
      </View>
    </View>
  );
}

export default VolShowDonationMapScreen;

const styles = StyleSheet.create({
  mapPerview: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBackground,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    // marginHorizontal: 26,
    width: 300,
  },
  button: {
    // width: "100%",
    flex: 1,
  },
});
