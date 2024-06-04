import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";
import { fixAcceptedTime } from "../../../util/date";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

function NotificationItem({
  acceptedtime,
  userName,
  phoneNumber,
  charityName,
  donationType,
  description,
  requestDate,
  status,
  docId,
}) {
  return (
    <View style={styles.container}>
      <Collapse>
        <CollapseHeader>
          <View style={styles.itemContainer}>
            <View style={styles.cardDate}>
              <Text style={styles.headerData}>
                {fixAcceptedTime(acceptedtime)}
              </Text>
            </View>
            <Text style={styles.headerText}>Donation Request Accepted</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.bodyContainer}>
            <Text style={styles.cardSubTitle}>Donation Details</Text>
            <View style={styles.cardInnerContainer}>
              <View style={styles.cardInner}>
                <Text style={styles.title}>Donation Type</Text>
                <Text style={styles.title}>Description</Text>
                <Text style={styles.title}>Request Date</Text>
                <Text style={styles.title}>Accepted</Text>
                <Text style={styles.title}>Donation Status</Text>
              </View>
              <View style={styles.cardInner}>
                <Text style={styles.detail}>{donationType} Donation</Text>
                <Text style={styles.detail}>{description}</Text>
                <Text style={styles.detail}>{requestDate}</Text>
                <Text style={styles.detail}>
                  {fixAcceptedTime(acceptedtime)}
                </Text>
                <Text style={styles.detail}>{status}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.cardSubTitle}>Volunteer Details</Text>
              <View style={styles.cardInnerContainer}>
                <View style={styles.cardInner}>
                  <Text style={styles.title}>Volunteer Name</Text>
                  <Text style={styles.title}>Phone Number</Text>
                  <Text style={styles.title}>Charity Name</Text>
                </View>
                <View style={styles.cardInner}>
                  <Text style={styles.detail}>{userName}</Text>
                  <Text style={styles.detail}>{phoneNumber}</Text>
                  <Text style={styles.detail}>{charityName}</Text>
                </View>
              </View>
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    </View>
  );
}

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },

  headerData: {
    fontSize: 13,
    color: Colors.primaryTwo,
  },
  headerText: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  itemContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: Colors.primaryBackground,
    width: 375,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  bodyContainer: {
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardSubTitle: {
    marginVertical: 12,
    fontSize: 17,
    color: Colors.primaryText,
    fontWeight: "bold",
  },
  cardInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardInner: {
    flex: 1,
  },
  title: {
    marginVertical: 3,
    fontSize: 17,
  },
  detail: {
    marginVertical: 3,
    fontSize: 17,
  },
});
