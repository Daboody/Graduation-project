import RequestsMainButton from "./RequestsMainButton";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
function MainButtons() {
  const navigation = useNavigation();

  const newDonationRequestsHandler = () => {
    navigation.navigate("VolNewDonationRequestsScreen");
  };
  const receivedDonationsHandler = () => {
    navigation.navigate("VolReceivedDonationsScreen");
  };
  const volunteeringRecordsHandler = () => {
    navigation.navigate("VolunteeringRecordsScreen");
  };

  return (
    <View>
      <RequestsMainButton
        label='New Donation Requests'
        onPress={newDonationRequestsHandler}
      />
      <RequestsMainButton
        label='Received Donations'
        onPress={receivedDonationsHandler}
      />
      <RequestsMainButton
        label='Volunteering records'
        onPress={volunteeringRecordsHandler}
      />
    </View>
  );
}

export default MainButtons;

const styles = StyleSheet.create({});
