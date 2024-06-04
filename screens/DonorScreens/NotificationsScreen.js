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
import NotificationsList from "../../components/Donor/Notifications/NotificationsList";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

function NotificationsScreen() {
  const [acceptedRequests, setAcceptedRequests] = useState("");
  const [volunteerId, setVolunteerId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [charityName, setCharityName] = useState("");
  const [docId, setDocId] = useState("");
  const [acceptedTime, setAcceptedTime] = useState("");
  const [donationType, setDonationType] = useState("");
  const [description, setDescription] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [status, setStatus] = useState("");
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
          where("donorId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const dataObj = doc.data();
          console.log(doc.data());
          setDocId(doc.id);
          setAcceptedRequests((prev) => [...prev, dataObj]);
          userId = dataObj.volunteerId;
          setVolunteerId(userId);
          setAcceptedTime(dataObj.acceptedAt);
          setDonationType(dataObj.donationType);
          setDescription(dataObj.description);
          setRequestDate(dataObj.requestDate);
          setStatus(dataObj.status);
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
        const docRef = doc(db, "users", volunteerId);
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
  }, [volunteerId]);
  useEffect(() => {
    setIsFetching(true);
    const getData = setTimeout(() => {
      setUserName(userInfo.userName);
      setPhoneNumber(userInfo.phoneNumber);
      setCharityName(userInfo.charityName);
      setIsFetching(false);
    }, 1000);
    return () => clearTimeout(getData);
  }, [userInfo]);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  let content = (
    <View style={styles.fallBackContainer}>
      <Text style={styles.fallBackText}>There is no notifications yet.</Text>
    </View>
  );

  if (acceptedRequests.length > 0) {
    content = (
      <NotificationsList
        receivedDonations={acceptedRequests}
        userName={userName}
        phoneNumber={phoneNumber}
        charityName={charityName}
        acceptedtime={acceptedTime}
        donationType={donationType}
        description={description}
        requestDate={requestDate}
        status={status}
        docId={docId}
      />
    );
  }

  return <View style={styles.container}>{content}</View>;
}

export default NotificationsScreen;

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
