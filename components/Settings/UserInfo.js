import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import LoadingOverlay from "../UI/LoadingOverlay";

function UserInfo() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = setTimeout(async () => {
      setIsFetching(true);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const results = docSnap.data();
        setUserName(results.userName);
        setPhoneNumber(results.phoneNumber);
      } else {
        console.log("No such document!!");
        // doc.data() will be undefined in this case
      }
      setIsFetching(false);
    }, 500);

    // Cleanup fn
    return () => clearTimeout(fetchData);
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <View style={styles.userImgWrapper}>
        <Ionicons name='person' size={100} color='#ccc' />
      </View>
      <View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.text}>{userName}</Text>
          <Text style={styles.text}>{phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
}

export default UserInfo;

const styles = StyleSheet.create({
  userImgWrapper: {
    marginTop: 36,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  text: {
    fontSize: 17,
    lineHeight: 28,
    letterSpacing: 1,
  },
});
