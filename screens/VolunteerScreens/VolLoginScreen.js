import { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import AuthContent from "../../components/Volunteer/Auth/AuthContent";
import LoadingOverlay from "../../components/Volunteer/AuthUI/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { Colors } from "../../constants/styles";

const auth = getAuth(app);

function VolLoginScreen() {
  const [isAuthenticating, setIsAutenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAutenticating(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // console.log(user.email);
        const token = user.accessToken;
        authCtx.authenticate(token);
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
    return <LoadingOverlay message='Logging you in...' />;
  }

  return (
    <LinearGradient
      colors={[Colors.primaryOne, Colors.primaryTwo]}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <AuthContent isLogin onAuthenticate={loginHandler} />
      </View>
    </LinearGradient>
  );
}

export default VolLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
