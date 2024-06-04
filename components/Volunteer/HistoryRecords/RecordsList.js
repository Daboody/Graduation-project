import { FlatList } from "react-native";
import RecordItem from "./RecordItem";

function RecordsList({ completedRequests, userName, phoneNumber, docId }) {
  const renderReceivedDonationItem = (itemData) => {
    return (
      <RecordItem
        {...itemData.item}
        userName={userName}
        phoneNumber={phoneNumber}
        docId={docId}
      />
    );
  };
  return (
    <FlatList
      data={completedRequests}
      renderItem={renderReceivedDonationItem}
      // keyExtractor={(item) => item}
    />
  );
}

export default RecordsList;
