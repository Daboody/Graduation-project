import { FlatList } from "react-native";
import ReceivedDonationItem from "./ReceivedDonationItem";

function ReceivedDonationsList({
  receivedDonations,
  userName,
  phoneNumber,
  docId,
}) {
  const renderReceivedDonationItem = (itemData) => {
    return (
      <ReceivedDonationItem
        {...itemData.item}
        userName={userName}
        phoneNumber={phoneNumber}
        docId={docId}
      />
    );
  };
  return (
    <FlatList
      data={receivedDonations}
      renderItem={renderReceivedDonationItem}
      // keyExtractor={(item) => item}
    />
  );
}

export default ReceivedDonationsList;
