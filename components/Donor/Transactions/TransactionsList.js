import { FlatList } from "react-native";
import TransactionItem from "./TransactionItem";

const renderTransactionItem = (itemData) => {
  return <TransactionItem {...itemData.item} />;
};
function TransactionsList({ transactions }) {
  return (
    <FlatList
      data={transactions}
      renderItem={renderTransactionItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default TransactionsList;
