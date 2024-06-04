import { View, Text, StyleSheet } from "react-native";
import TransactionsList from "../../components/Donor/Transactions/TransactionsList";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

function TransactionHistoryScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [transactionList, setTransactionsList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

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
      <Ionicons name='alert-circle-outline' size={42} color='#ee5959' />
      <Text style={styles.fallBackText}>There is no transactions yet.</Text>
    </View>
  );

  if (transactionList.length > 0) {
    content = <TransactionsList transactions={transactionList.reverse()} />;
  }

  return <View>{content}</View>;
}

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  fallBackContainer: {
    marginTop: 135,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 8,
  },
});
