import React from "react";
import { FlatList } from "react-native";
import NotificationsItem from "./NotificationsItem";

const renderNotificationItem = (itemData) => {
  return <NotificationsItem {...itemData.item} />;
};

function NotificationsList({ notification }) {
  return (
    <FlatList
      data={notification}
      renderItem={renderNotificationItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default NotificationsList;