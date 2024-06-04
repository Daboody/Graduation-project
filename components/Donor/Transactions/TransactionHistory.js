import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TransactionsList from "./TransactionsList";
import { Ionicons } from "@expo/vector-icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebaseConfig";
import LoadingOverlay from "../../UI/LoadingOverlay";

function TransactionHistory() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [transactionList, setTransactionsList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const shortTransactionsList = transactionList.reverse().slice(0, 3);

  useEffect(() => {
    async function getTransactionList() {
      setIsFetching(true);
      const transactionsRef = collection(db, "newDonationsRequest");

      const q = query(transactionsRef, where("donorId", "==", user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();
        setTransactionsList((prevList) => [
          ...prevList,
          {
            id: id,
            ...data,
          },
        ]);
      });
      setIsFetching(false);
    }
    getTransactionList();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  let content = (
    <View style={styles.fallBackContainer}>
      <Ionicons name='alert-circle-outline' size={36} color='#ee5959' />
      <Text style={styles.fallBackText}>There is no transactions yet.</Text>
    </View>
  );

  if (transactionList.length > 0) {
    content = <TransactionsList transactions={shortTransactionsList} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Transactions</Text>
      {content}
    </View>
  );
}

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 35,
  },
  title: {
    fontSize: 20,
    marginHorizontal: 25,
    color: "#000",
    marginVertical: 16,
  },
  fallBackContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 8,
  },
});
