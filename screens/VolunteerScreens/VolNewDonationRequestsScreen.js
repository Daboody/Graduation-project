import { StyleSheet, View, Text } from "react-native";
import NewDonationRequestCard from "../../components/Volunteer/NewDonationRequests/NewDonationRequestCard";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

function VolNewDonationRequestsScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [newDonationRequest, setNewDonationRequest] = useState("");
  const [donorId, setDonorId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [donationType, setDonationType] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    async function getDonationRequest() {
      setIsFetching(true);
      let userId = "";
      try {
        const q = query(
          collection(db, "newDonationsRequest"),
          where("status", "==", "newRequest")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const dataObj = doc.data();
          setRequestId(doc.id);
          setNewDonationRequest({ ...dataObj });
          userId = dataObj.donorId;
          setDonorId(userId);
        });
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }
    getDonationRequest();
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
    // console.log("out" + userInfo);
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
  }, [userInfo]);

  useEffect(() => {
    setIsFetching(true);
    const getData = setTimeout(() => {
      setDonationType(newDonationRequest.donationType);
      setLocation(newDonationRequest.location);
      setIsFetching(false);
    }, 1000);
    return () => clearTimeout(getData);
  }, [newDonationRequest]);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  let content = (
    <View style={styles.fallBackContainer}>
      <Text style={styles.fallBackText}>New requests will appear here ...</Text>
    </View>
  );

  if (newDonationRequest !== "") {
    content = (
      <NewDonationRequestCard
        donationType={donationType}
        userName={userName}
        phoneNumber={phoneNumber}
        requestId={requestId}
        location={location}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View>{content}</View>
    </View>
  );
}

export default VolNewDonationRequestsScreen;

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
