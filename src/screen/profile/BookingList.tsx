import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Icon } from "react-native-elements";

interface BookingItem {
  id: string;
  status: "Active" | "Completed" | "Cancelled";
  service: string;
  address: string;
  distance: string;
  rating: number;
  price: string;
  orderId: string;
  orderDate: string;
  totalPayment: string;
  image: string;
}

const bookingsData: BookingItem[] = [
  {
    id: "1",
    status: "Completed",
    service: "Auto Craft",
    address: "0953 Novick Parkway",
    distance: "1.2 KM",
    rating: 4.3,
    price: "$21.0",
    orderId: "#CRR021IAA3",
    orderDate: "25 Dec",
    totalPayment: "$68.00",
    image: "https://source.unsplash.com/100x100/?car,repair",
  },
  {
    id: "2",
    status: "Completed",
    service: "Auto Craft",
    address: "0953 Novick Parkway",
    distance: "1.2 KM",
    rating: 4.3,
    price: "$21.0",
    orderId: "#CRR021IAA3",
    orderDate: "25 Dec",
    totalPayment: "$68.00",
    image: "https://source.unsplash.com/100x100/?garage",
  },
];

const BookingCard: React.FC<{ item: BookingItem }> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <Text style={styles.address}>{item.address}</Text>
        <View style={styles.metaRow}>
          <Icon name="map-pin" type="feather" size={14} color="#007AFF" />
          <Text style={styles.metaText}>{item.distance}</Text>
          <Icon name="star" type="feather" size={14} color="#FFD700" style={{ marginLeft: 8 }} />
          <Text style={styles.metaText}>{item.rating}</Text>
        </View>
        <Text style={styles.price}>{item.price}/Service</Text>
        <View style={styles.orderDetails}>
          <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
          <Text style={styles.orderDate}>Order Date: {item.orderDate}</Text>
          <Text style={styles.totalPayment}>Total Payment: {item.totalPayment}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.buttonText}>Leave Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.receiptButton}>
            <Text style={styles.buttonText}>E-Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const BookingList: React.FC<{ status: string }> = ({ status }) => {
  const filteredData = bookingsData.filter((item) => item.status === status);
  return (
    <FlatList data={filteredData} keyExtractor={(item) => item.id} renderItem={({ item }) => <BookingCard item={item} />} />
  );
};

const renderScene = SceneMap({
  active: () => <BookingList status="Active" />,
  completed: () => <BookingList status="Completed" />,
  cancelled: () => <BookingList status="Cancelled" />,
});

const MyBookings: React.FC = () => {
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "active", title: "Active Now" },
    { key: "completed", title: "Completed" },
    { key: "cancelled", title: "Cancelled" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Bookings</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#007AFF" }}
            style={{ backgroundColor: "white" }}
            activeColor="#007AFF"
            inactiveColor="#999"
          />
        )}
      />
    </View>
  );
};

export default MyBookings;



 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#28a745",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: "hidden",
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginVertical: 3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "#007AFF",
    marginLeft: 3,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 5,
  },
  orderDetails: {
    marginTop: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
  },
  totalPayment: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  reviewButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  receiptButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
