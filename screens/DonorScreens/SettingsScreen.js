import { View, StyleSheet } from "react-native";
import ResetPasswordButton from "../../components/Settings/ResetPasswordButton";
import EditAccountInfo from "../../components/Settings/EditAccountInfo";
import UserInfo from "../../components/Settings/UserInfo";
import Logout from "../../components/Settings/Logout";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";


function SettingsScreen() {
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.rootContainer}>
      <View>
        <UserInfo />
        <EditAccountInfo />
      </View>
      <View style={styles.settings}>
        <ResetPasswordButton />
      </View>
      <View style={styles.logOut}>
        <Logout onPress={authCtx.logout} />
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  settings: {
    marginTop: 32,
    width: "100%",
  },
  logOut: {
    marginTop: 26,
  },
});
