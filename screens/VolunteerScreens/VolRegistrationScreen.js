import { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import AuthContent from "../../components/Volunteer/Auth/AuthContent";
import LoadingOverlay from "../../components/Volunteer/AuthUI/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { LinearGradient } from "expo-linear-gradient";
import { app } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { Colors } from "../../constants/styles";

async function createUserDocument(
  user,
  email,
  userName,
  phoneNumber,
  role,
  charityName
) {
  if (!user) return;

  const usersRef = collection(db, "users");

  const userRef = doc(db, "user", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    try {
      await setDoc(doc(usersRef, user.uid), {
        email: email,
        userName: userName,
        phoneNumber: phoneNumber,
        role: role,
        charityName: charityName,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const auth = getAuth(app);

function VolRegistrationScreen() {
  const [isAuthenticating, setIsAutenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({
    email,
    password,
    userName,
    phoneNumber,
    role,
    charityName,
  }) {
    setIsAutenticating(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const token = user.accessToken;
        authCtx.authenticate(token);
        // Store User Data in FireStore
        createUserDocument(
          user,
          email,
          userName,
          phoneNumber,
          "Volunteer",
          charityName
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(
          `Authentication Falid ${errorCode}`,
          `Please Check Your Cordintial and try again later ${errorMessage}`
        );
      });
    setIsAutenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating User...' />;
  }

  return (
    <LinearGradient
      colors={[Colors.primaryOne, Colors.primaryTwo]}
      style={styles.container}
    >
      <ScrollView>
        <AuthContent onAuthenticate={signupHandler} />
      </ScrollView>
    </LinearGradient>
  );
}

export default VolRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
