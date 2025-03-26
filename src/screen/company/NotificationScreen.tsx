import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import Icon from "../../component/Icon";
import { icon } from "../../component/Image";
import CustomHeader from "../../component/CustomHeaderProps";

// Sample Notification Data
const notifications = [
  {
    id: "1",
    title: "Dulce Geidt",
    message: "Lorem ipsum dolor sit amet consectetur.",
    date: "Today",
  },
  {
    id: "2",
    title: "Jaydon Rosser",
    message: "Lorem ipsum dolor sit amet consectetur.",
    date: "Today",
  },
  {
    id: "3",
    title: "Alena Westervelt",
    message: "Lorem ipsum dolor sit amet consectetur.",
    date: "Today",
  },
  {
    id: "4",
    title: "Terry Vaccaro",
    message: "Lorem ipsum dolor sit amet consectetur.",
    date: "Yesterday",
  },
  {
    id: "5",
    title: "Tatiana Kenter",
    message: "Lorem ipsum dolor sit amet consectetur.",
    date: "Yesterday",
  },
  {
    id: "6",
    title: "Makenna Kenter",
    message: "Lorem ipsum dolor sit amet consectetur.",
    date: "Yesterday",
  },
  {
    id: "7",
    title: "Jakob Calzoni",
    message: "Lorem ipsum dolor sit amet consectetur.",
    date: "Yesterday",
  },
  {
    id: "8",
    title: "Paityn Rosser",
    message: "Lorem ipsum dolor sit amet consectetur.",
    date: "Yesterday",
  },
];

// Grouping notifications by date
const groupedNotifications = notifications.reduce((acc, item) => {
  if (!acc[item.date]) {
    acc[item.date] = [];
  }
  acc[item.date].push(item);
  return acc;
}, {} as Record<string, typeof notifications>);

const NotificationScreen: React.FC = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'#fff'}
      />
      <CustomHeader
 seconfImg={true}
        title="Notification"
        navigation={navigation}

        style={{
          marginTop: 0
        }}
      />

      <View style={{ flex: 1, padding: 15 }}>


        <FlatList
          data={Object.keys(groupedNotifications)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{item}</Text>
              {groupedNotifications[item].map((notif) => (
                <TouchableOpacity key={notif.id} style={styles.notificationItem}>
                  <Icon

                    source={icon.box}
                    size={50}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.title}>{notif.title}</Text>
                    <Text style={styles.message}>{notif.message}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",


  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 22,
    color: "#000",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#000",
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  message: {
    fontSize: 14,
    color: "#666",
  },
});

export default NotificationScreen;
