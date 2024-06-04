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
import RecordsList from "../../components/Volunteer/HistoryRecords/RecordsList";

function VolunteeringRecordsScreen() {
  const [completedRequests, setCompletedRequests] = useState("");
  const [donorId, setDonorId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [docId, setDocId] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    async function getData() {
      let userId = "";
      try {
        const q = query(
          collection(db, "newDonationsRequest"),
          where("status", "==", "Completed"),
          where("volunteerId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const dataObj = doc.data();
          setDocId(doc.id);
          setCompletedRequests((prev) => [...prev, dataObj]);
          userId = dataObj.donorId;
          setDonorId(userId);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const getUser = setTimeout(async () => {
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
    }, 1000);
    return () => clearTimeout(getUser);
  }, [donorId]);
  useEffect(() => {
    const getData = setTimeout(() => {
      setUserName(userInfo.userName);
      setPhoneNumber(userInfo.phoneNumber);
    }, 1000);
    return () => clearTimeout(getData);
  }, [userInfo]);

  let content = (
    <View style={styles.fallBackContainer}>
      <Text style={styles.fallBackText}>There is no records yet.</Text>
    </View>
  );

  if (completedRequests.length > 0) {
    content = (
      <RecordsList
        completedRequests={completedRequests.reverse()}
        userName={userName}
        phoneNumber={phoneNumber}
        docId={docId}
      />
    );
  }
  return <View style={styles.container}>{content}</View>;
}

export default VolunteeringRecordsScreen;

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
