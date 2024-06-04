import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import UserHeader from "../../components/UI/UserHeader";
import MainButtons from "../../components/Volunteer/Home/MainButtons";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

function VolHomeScreen() {
  const [userName, setUserName] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setIsFetching(true);
    const fetchData = setTimeout(async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const results = docSnap.data();
        setUserName(results.userName);
      } else {
        console.log("No such document!!");
        // doc.data() will be undefined in this case
      }
      setIsFetching(false);
    }, 3000);

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
      <View style={styles.buttonsList}>
        <MainButtons />
      </View>
    </View>
  );
}

export default VolHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 85,
  },
  buttonsList: {
    marginTop: 70,
  },
});
