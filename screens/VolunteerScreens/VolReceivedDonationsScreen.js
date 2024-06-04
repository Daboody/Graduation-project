import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  query,
  where,
  getDocs,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import ReceivedDonationsList from "../../components/Volunteer/ReceivedDonations/ReceivedDonationsList";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

function VolReceivedDonationsScreen() {
  const [acceptedRequests, setAcceptedRequests] = useState("");
  const [donorId, setDonorId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [docId, setDocId] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    async function getData() {
      setIsFetching(true);
      let userId = "";
      try {
        const q = query(
          collection(db, "newDonationsRequest"),
          where("status", "==", "Accepted"),
          where("volunteerId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const dataObj = doc.data();
          setDocId(doc.id);
          setAcceptedRequests((prev) => [...prev, dataObj]);
          userId = dataObj.donorId;
          setDonorId(userId);
        });
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }
    getData();
  }, []);

  useEffect(() => {
    const getUser = setTimeout(async () => {
      setIsFetching(true);
      try {
        const docRef = doc(db, "users", donorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const results = docSnap.data();
          setUserInfo({ ...results });
        } else {
          console.log("No such document!!");
        }
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }, 1000);
    return () => clearTimeout(getUser);
  }, [donorId]);
  useEffect(() => {
    setIsFetching(true);
    const getData = setTimeout(() => {
      setUserName(userInfo.userName);
      setPhoneNumber(userInfo.phoneNumber);
      setIsFetching(false);
    }, 1000);
    return () => clearTimeout(getData);
  }, [userInfo, donorId]);

  if (isFetching) {
    return <LoadingOverlay />;
  }
  let content = (
    <View style={styles.fallBackContainer}>
      <Text style={styles.fallBackText}>There is no transactions yet.</Text>
    </View>
  );

  if (acceptedRequests.length > 0) {
    content = (
      <ReceivedDonationsList
        receivedDonations={acceptedRequests.reverse()}
        userName={userName}
        phoneNumber={phoneNumber}
        docId={docId}
      />
    );
  }

  return <View style={styles.container}>{content}</View>;
}

export default VolReceivedDonationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 28,
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
