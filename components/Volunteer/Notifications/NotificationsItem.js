import { StyleSheet, Text, View } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

import { Colors } from "../../../constants/styles";
function NotificationsItem({ donationType, time, body, id }) {
  return (
    <View style={styles.container}>
      <Collapse>
        <CollapseHeader>
          <View style={styles.itemContainer}>
            <Text style={styles.headerText}>{donationType}</Text>
            <Text style={styles.headerText}>{time}</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.bodyContainer}>
            <Text style={styles.text}>{body}</Text>
          </View>
        </CollapseBody>
      </Collapse>
    </View>
  );
}

export default NotificationsItem;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  itemContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: Colors.primaryBackground,
    width: 375,
    paddingHorizontal: 22,
    paddingVertical: 14,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
},
bodyContainer: {
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
},
text: {
    color: "#000",
  },
});
