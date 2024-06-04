import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import UserHeader from "../../components/UI/UserHeader";
import SelectDonationType from "../../components/Donor/MakeDonation/SelectDonationType";
import TransactionHistory from "../../components/Donor/Transactions/TransactionHistory";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function HomeScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [userName, setUserName] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = setTimeout(async () => {
      setIsFetching(true);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const results = docSnap.data();
        setUserName(results.userName);
      } else {
        console.log("No such document!!");
      }
      setIsFetching(false);
    }, 5000);
    // Cleanup fn
    return () => clearTimeout(fetchData);
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <UserHeader userName={userName} />
      </View>
      <View>
        <SelectDonationType />
      </View>
      <View style={styles.list}>
        <TransactionHistory />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 85,
  },
  list: {
    flex: 1,
  },
});
