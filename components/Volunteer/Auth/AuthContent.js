import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import FlatButton from "../AuthUI/FlatButton";
import AuthForm from "./AuthForm";
import { useNavigation } from "@react-navigation/native";

function AuthContent({ isLogin, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    userName: false,
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
    phoneNumber: false,
    charityName: false,
  });

  const navigation = useNavigation();
  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("VolunteerSignup");
    } else {
      navigation.replace("VolunteerLogin");
    }
  }

  function submitHandler(credentials) {
    let {
      userName,
      email,
      confirmEmail,
      password,
      confirmPassword,
      phoneNumber,
      charityName,
    } = credentials;

    email = email.trim();
    password = password.trim();

    const userNameIsValid = userName.length > 5;
    const phoneNumberIsValid = phoneNumber.length > 9;
    const charityNameIsValid = charityName !== "N/A";
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        userName: !userNameIsValid,
        phoneNumber: !phoneNumberIsValid,
        charityName: !charityNameIsValid,
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password, userName, phoneNumber, charityName });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new account" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 218,
    paddingTop: 42,
    paddingBottom: 8,
    paddingHorizontal: 28,
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
