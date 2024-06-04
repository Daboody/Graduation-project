import { View } from "react-native";
import NotificationsList from "../../components/Volunteer/Notifications/NotificationsList";

function VolNotificationScreen() {
  const notification = [
    {
      id: new Date().toString() + Math.random().toString(),
      time: "05:00",
      body: "HelloWorld",
      donationType: "Cash Donation",
    },
    {
      id: new Date().toString() + Math.random().toString(),
      time: "25:00",
      body: "HelloWorld",
      donationType: "Food Donation",
    },
    {
      id: new Date().toString() + Math.random().toString(),
      time: "11:00",
      body: "HelloWorld",
      donationType: "Cash Donation",
    },
  ];
  return (
    <View>
      <NotificationsList notification={notification} />
    </View>
  );
}

export default VolNotificationScreen;
