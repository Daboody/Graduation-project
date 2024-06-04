import { FlatList } from "react-native";
import NotificationItem from "./NotificationItem";

function NotificationsList({
  receivedDonations,
  userName,
  phoneNumber,
  charityName,
  acceptedtime,
  description,
  donationType,
  requestDate,
  status,
}) {
  const renderNotificationItem = (itemData) => {
    return (
      <NotificationItem
        {...itemData.item}
        userName={userName}
        phoneNumber={phoneNumber}
        charityName={charityName}
        acceptedtime={acceptedtime}
        donationType={donationType}
        description={description}
        requestDate={requestDate}
        status={status}
      />
    );
  };

  return (
    <FlatList data={receivedDonations} renderItem={renderNotificationItem} />
  );
}

export default NotificationsList;
