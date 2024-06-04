import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import UserContextProvider from "./store/user-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import StartingScreen from "./screens/StartingScreen";

import HomeScreen from "./screens/DonorScreens/HomeScreen";
import SettingsScreen from "./screens/DonorScreens/SettingsScreen";
import NotificationScreen from "./screens/DonorScreens/NotificationsScreen";
import AboutScreen from "./screens/DonorScreens/AboutScreen";
import IdentifyLocationScreen from "./screens/DonorScreens/IdentifyLocationScreen";
import DonationRequsetSuccessScreen from "./screens/DonorScreens/DonationRequsetSuccessScreen";
import TransactionDetailsScreen from "./screens/DonorScreens/TransactionDetailsScreen";
import NotificationDetails from "./screens/DonorScreens/NotificationDetails";
import TransactionHistoryScreen from "./screens/DonorScreens/TransactionHistoryScreen";
import LoginScreen from "./screens/DonorScreens/LoginScreen";
import SignupScreen from "./screens/DonorScreens/SignupScreen";

import { Colors } from "./constants/styles";

import VolLoginScreen from "./screens/VolunteerScreens/VolLoginScreen";
import VolRegistrationScreen from "./screens/VolunteerScreens/VolRegistrationScreen";
import VolHomeScreen from "./screens/VolunteerScreens/VolHomeScreen";
import VolSettingsScreen from "./screens/VolunteerScreens/VolSettingsScreen";
import VolReceivedDonationsScreen from "./screens/VolunteerScreens/VolReceivedDonationsScreen";
import VolNewDonationRequestsScreen from "./screens/VolunteerScreens/VolNewDonationRequestsScreen";
import VolunteeringRecordsScreen from "./screens/VolunteerScreens/VolunteeringRecordsScreen";
import VolNotificationScreen from "./screens/VolunteerScreens/VolNotificationScreen";
import VolAboutScreen from "./screens/VolunteerScreens/VolAboutScreen";
import VolShowDonationMapScreen from "./screens/VolunteerScreens/VolShowDonationMapScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DonorAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryOne },
        headerTintColor: "#fff",
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          // title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={{
          // title: "Registration",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function DonorNavigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <DonorAuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedDonorStack />}
    </NavigationContainer>
  );
}

function DonorDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryOne },
        headerTintColor: "#fff",
        sceneContainerStyle: { backgroundColor: "#fff" },
        drawerContentStyle: { backgroundColor: Colors.primaryOne },
        drawerInactiveTintColor: "#fff",
        drawerActiveTintColor: Colors.primaryTwo,
        drawerActiveBackgroundColor: Colors.primaryBackground,
      }}
    >
      <Drawer.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          title: "Home",
          drawerIcon: ({ size, color }) => {
            return <Ionicons name='home' size={size} color={color} />;
          },
          // headerShown: false,
        }}
      />

      <Drawer.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          title: "Account",
          drawerIcon: ({ size, color }) => {
            return <Ionicons name='person-sharp' size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name='Notifications'
        component={NotificationScreen}
        options={{
          drawerIcon: ({ size, color }) => {
            return <Ionicons name='notifications' size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name='History'
        component={TransactionHistoryScreen}
        options={{
          title: "History",
          drawerIcon: ({ size, color }) => {
            return <Ionicons name='time-sharp' size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name='About'
        component={AboutScreen}
        options={{
          title: "About",
          drawerIcon: ({ size, color }) => {
            return (
              <Ionicons
                name='information-circle-sharp'
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedDonorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryOne },
        headerTintColor: "#fff",
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name='Home'
        component={DonorDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='IdentifyLocationScreen'
        component={IdentifyLocationScreen}
        options={{
          title: "Identify Location",
        }}
      />
      <Stack.Screen
        name='DonationRequsetSuccessScreen'
        component={DonationRequsetSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='TransactionDetailsScreen'
        component={TransactionDetailsScreen}
        options={{
          // headerShown: false,
          presentation: "modal",
          title: "Transaction Details",
        }}
      />
      <Stack.Screen
        name='NotificationDetailsScreen'
        component={NotificationDetails}
        options={{
          // headerShown: false,
          presentation: "modal",
          title: "Notification Details",
        }}
      />
    </Stack.Navigator>
  );
}

// Start Volunteer Stack

function VolunteerAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: "#379d42" },
        // headerTintColor: "#fff",
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name='VolunteerLogin'
        component={VolLoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='VolunteerSignup'
        component={VolRegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function VolunteerNavigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <VolunteerAuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedVolunteerStack />}
    </NavigationContainer>
  );
}

function VolunteerDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryOne },
        headerTintColor: "#fff",
        sceneContainerStyle: { backgroundColor: "#fff" },
        drawerContentStyle: { backgroundColor: Colors.primaryOne },
        drawerInactiveTintColor: "#fff",
        drawerActiveTintColor: Colors.primaryTwo,
        drawerActiveBackgroundColor: Colors.primaryBackground,
      }}
    >
      <Drawer.Screen
        name='VolHomeScreen'
        component={VolHomeScreen}
        options={{
          title: "Home",
          drawerIcon: ({ size, color }) => {
            return <Ionicons name='home' size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name='VolSettingsScreen'
        component={VolSettingsScreen}
        options={{
          title: "Account",
          drawerIcon: ({ size, color }) => {
            return <Ionicons name='person-sharp' size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name='VolNotifications'
        component={VolNotificationScreen}
        options={{
          title: "Notifications",
          drawerIcon: ({ size, color }) => {
            return <Ionicons name='notifications' size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name='VolAbout'
        component={VolAboutScreen}
        options={{
          title: "About",
          drawerIcon: ({ size, color }) => {
            return (
              <Ionicons
                name='information-circle-sharp'
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedVolunteerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryOne },
        headerTintColor: "#fff",
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name='Home'
        component={VolunteerDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='VolReceivedDonationsScreen'
        component={VolReceivedDonationsScreen}
        options={{
          title: "Received Donations",
        }}
      />
      <Stack.Screen
        name='VolNewDonationRequestsScreen'
        component={VolNewDonationRequestsScreen}
        options={{
          title: "New Donation Requests",
        }}
      />
      <Stack.Screen
        name='VolunteeringRecordsScreen'
        component={VolunteeringRecordsScreen}
        options={{
          title: "Volunteering Records",
        }}
      />
      <Stack.Screen
        name='ShowDonationMap'
        component={VolShowDonationMapScreen}
        options={{
          title: "Donation Location Direction",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <AuthContextProvider>
          <UserContextProvider>
            <StartingScreen />
          </UserContextProvider>
        </AuthContextProvider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
