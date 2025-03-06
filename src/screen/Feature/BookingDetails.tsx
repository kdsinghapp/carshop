import React, { useState } from "react";
import { SafeAreaView, Alert } from "react-native";
import BookingDetailsComponent from "../../component/BookingDetailsComponent";
import { useNavigation } from "@react-navigation/native";

const BookingDetails: React.FC = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BookingDetailsComponent
        bookingDate="Jan 02, 2024 | 09:41 AM"
        car="SUV | GR 123-ABCD"
        serviceDuration="1.5 Hours"
        serviceType="Pick-Up"
        services={[
          { name: "Exterior Cleaning", price: "$50.00" },
          { name: "Engine Bay Cleaning", price: "$24.00" },
          { name: "Tire Cleaning", price: "$12.00" },
        ]}
        taxFees="$12.00"
        paymentMethod="Cash"
        transactionId="TR2565HGJD"
        totalAmount="$98.00"
        onEdit={() => Alert.alert("Edit button pressed")}
        onCancel={() => Alert.alert("Cancel button pressed")}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default BookingDetails;
