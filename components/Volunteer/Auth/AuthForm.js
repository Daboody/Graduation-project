import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Button from "../AuthUI/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredCharityName, setEnteredCharityName] = useState("");

  const {
    userName: userNameIsInvalid,
    phoneNumber: phoneNumberIsValid,
    charityName: charityNameIsValid,
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "userName":
        setEnteredUserName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "phoneNumber":
        setEnteredPhoneNumber(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      userName: enteredUserName,
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      phoneNumber: enteredPhoneNumber,
      charityName: enteredCharityName,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <Input
            label='User Name'
            onUpdateValue={updateInputValueHandler.bind(this, "userName")}
            value={enteredUserName}
            keyboardType='email-address'
            isInvalid={userNameIsInvalid}
          />
        )}
        {!isLogin && (
          <Input
            label='Phone Number'
            onUpdateValue={updateInputValueHandler.bind(this, "phoneNumber")}
            value={enteredPhoneNumber}
            keyboardType='email-address'
            isInvalid={phoneNumberIsValid}
          />
        )}

        <Input
          label='Email Address'
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType='email-address'
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label='Confirm Email Address'
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType='email-address'
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label='Password'
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label='Confirm Password'
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        {!isLogin && (
          <View>
            <Text style={styles.pickeLable}>
              Charity Name
            </Text>
            <View style={styles.pickContainer}>
              <Picker
                style={styles.picker}
                selectedValue={enteredCharityName}
                onValueChange={(itemValue, itemIndex) =>
                  setEnteredCharityName(itemValue)
                }
                isInvalid={charityNameIsValid}
              >
                <Picker.Item
                  label='Select a charity you belong to'
                  value='N/A'
                  style={styles.pickerFirstLable}
                />
                <Picker.Item label='MudhafarCharity' value='MudhafarCharity' />
                <Picker.Item label='MusabCharity' value='MusabCharity' />
                <Picker.Item label='ShymaaCharity' value='ShymaaCharity' />
              </Picker>
            </View>
          </View>
        )}

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  pickContainer: {
    borderRadius: 10,
    overflow: "hidden",
    height: 48,
    marginVertical: 8,
  },
  picker: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "#ece7e7",
    fontSize: 16,
  },
  pickerFirstLable: {
    color: "#949292",
  },
});
