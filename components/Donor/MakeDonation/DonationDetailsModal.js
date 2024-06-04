import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../../UI/PrimaryButton";
import { useState } from "react";

function DonationDetailsModal({ isVisible, mode, onCancel }) {
  const [description, setDescription] = useState("");
  const changeTextHandler = (enteredValue) => {
    setDescription(enteredValue);
  };

  const donationMode = mode;
  const donationDescription = description.length === 0 ? "N/A" : description;

  const navigation = useNavigation();
  const addDescriptionHandler = () => {
    navigation.navigate("IdentifyLocationScreen", {
      donationType: donationMode,
      donationDescription: donationDescription,
    });
  };
  return (
    <View style={styles.modalContainer}>
      <Modal visible={isVisible} animationType='fade' transparent={true}>
        <View style={styles.transparent}></View>
        <View style={styles.modalContent}>
          <View style={styles.closeModalButton}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Ionicons name='close-outline' size={44} />
            </Pressable>
          </View>
          <View>
            <Text style={styles.modalTitle}>{mode} Donation Request</Text>

            <View style={styles.formContainer}>
              <View>
                <Text style={styles.inputLable}>Donation Description</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={changeTextHandler}
                    placeholder='Enter Description Here...'
                  />
                </View>
              </View>
              <PrimaryButton
                title='Add Description'
                onPress={addDescriptionHandler}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default DonationDetailsModal;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  transparent: {
    height: 250,
    opacity: 0.7,
    backgroundColor: "#fff",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fcf2f2",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  closeModalButton: {
    marginTop: 5,
    marginLeft: 5,
  },
  pressed: {
    opacity: 0.75,
  },
  modalTitle: {
    fontSize: 22,
    textAlign: "center",
  },
  formContainer: {
    marginVertical: 10,
  },
  inputLable: {
    fontSize: 16,
    marginHorizontal: 25,
    marginVertical: 5,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  input: {
    padding: 16,
    fontSize: 16,
  },
});
