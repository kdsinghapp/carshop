import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar, } from "react-native-tab-view";

import images, { icon } from "../../component/Image";
import Icon from "../../component/Icon";
import CustomHeader from "../../component/CustomHeaderProps";
import ScreenNameEnum from "../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";

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
    image: images.cd,
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
    image: images.cd,
  },
];

const BookingCard: React.FC<{ item: BookingItem }> = ({ item }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>


        <Image source={item.image} style={styles.image} />
        <View style={styles.details}>
          <View style={styles.headerRow}>
            <Text style={styles.serviceName}>{item.service}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
          <Text style={styles.address}>{item.address}</Text>
          <View style={styles.metaRow}>
            <Icon source={icon.pin} size={14} />
            <Text style={styles.metaText}>{item.distance}</Text>
            <Icon source={icon.star} size={14} />
            <Text style={styles.metaText}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>{item.price}/Service</Text>

        </View>
      </View>
      <View style={styles.orderDetails}>
        <View style={{
          alignItems: 'center'
        }}>

          <Text style={styles.orderId}>Order ID:</Text>
          <Text style={styles.orderId}>{item.orderId}</Text>
        </View>
        <View style={{
          alignItems: 'center'
        }}>
          <Text style={styles.orderDate}>Order Date:</Text>
          <Text style={styles.orderDate}>{item.orderDate}</Text>
        </View>
        <View style={{
          alignItems: 'center'
        }}>
          <Text style={styles.totalPayment}>Total Payment: </Text>
          <Text style={styles.totalPayment}>{item.totalPayment}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
         onPress={()=>{
          navigation.navigate(ScreenNameEnum.LeaveReview)
        }}
        style={styles.reviewButton}>
          <Text style={styles.buttonText}>Leave Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate(ScreenNameEnum.BookingDetails)
        }}
        style={styles.receiptButton}>
          <Text style={styles.buttonText2}>E-Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BookingList: React.FC<{ status: string }> = ({ status }) => {
  const filteredData = bookingsData.filter((item) => item.status === status);
  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item, index) => `booking_${String(item.id) || index}`}
      removeClippedSubviews={false} // Prevent duplicate rendering
      renderItem={({ item }) => <BookingCard item={item} />}
    />


  );
};

const renderScene = SceneMap({
  active_tab: () => <BookingList status="Active" />,
  completed_tab: () => <BookingList status="Completed" />,
  cancelled_tab: () => <BookingList status="Cancelled" />,
});


const MyBookings: React.FC = ({ navigation }) => {
  const [index, setIndex] = useState(1);
  const layout = useWindowDimensions();

  const [routes] = useState([
    { key: "active_tab", title: "Active Now" },
    { key: "completed_tab", title: "Completed" },
    { key: "cancelled_tab", title: "Cancelled" },
  ]);


  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="My Bookings" onSkipPress={() => { }} showSkip={false} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ marginTop: 20, backgroundColor: 'transparent' }}
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
    paddingTop: 30
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    marginTop: 40
  },
  card: {

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
    width: 100,
    height: 100,
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
    backgroundColor: "#00CE9A",
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 30,
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

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
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
    backgroundColor: "rgba(0, 122, 255, 0.15)",
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  receiptButton: {
    flex: 1,
    backgroundColor: "#0063FF",
    paddingVertical: 15,
    borderRadius: 15,
    marginLeft: 5,
    alignItems: "center",

  },
  buttonText: {
    color: "#0063FF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop:5
  },
  buttonText2: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
