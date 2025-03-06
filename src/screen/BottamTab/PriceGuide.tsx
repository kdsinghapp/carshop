import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import images, { icon } from "../../component/Image";
import Icon from "../../component/Icon";

interface ServiceItem {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  price: string;
  image: string;
}

const serviceData: ServiceItem[] = [
  { id: "1", name: "AutoCare Hub", address: "0953 Novick Parkway", distance: "1.2 KM", rating: 4.3, price: "$50.00", image:images.cd },
  { id: "2", name: "SpeedyFix Garage", address: "0953 Novick Parkway", distance: "1.2 KM", rating: 4.3, price: "$30.00", image:images.cd},
  { id: "3", name: "Car Center", address: "0953 Novick Parkway", distance: "1.2 KM", rating: 4.3, price: "$20.00", image: images.cd },
  { id: "4", name: "DriveWell Service", address: "0953 Novick Parkway", distance: "1.2 KM", rating: 4.3, price: "$20.00", image: images.cd},
];

const categoryOptions = [
  { label: "All Categories", value: "all" },
  { label: "Car Wash", value: "car_wash" },
  { label: "Repair", value: "repair" },
];

const serviceOptions = [
  { label: "All Services", value: "all" },
  { label: "Engine Repair", value: "engine_repair" },
  { label: "Tire Change", value: "tire_change" },
];

const PriceGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Price Guide</Text>

      {/* Dropdown Filters */}
      <View style={styles.dropdownContainer}>
        <Dropdown
          data={categoryOptions}
          labelField="label"
          valueField="value"
          placeholder="Category"
          value={selectedCategory}
          onChange={(item) => setSelectedCategory(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.dropdownText}
          iconStyle={styles.dropdownIcon}
         
        />

        <Dropdown
          data={serviceOptions}
          labelField="label"
          valueField="value"
          placeholder="Service"
          value={selectedService}
          onChange={(item) => setSelectedService(item.value)}
          style={styles.dropdown}
          selectedTextStyle={styles.dropdownText}
          iconStyle={styles.dropdownIcon}
          
        />
      </View>

      {/* Service List */}
      <FlatList
        data={serviceData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={ item.image } style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <View style={styles.metaRow}>
                <Icon source={icon.pin}  size={14}  />
                <Text style={styles.metaText}>{item.distance}</Text>
                <Icon source={icon.star}  size={14}  />
                <Text style={styles.metaText}>{item.rating}</Text>
              </View>
            </View>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PriceGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    padding: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:40,
    marginBottom: 15,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dropdown: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    height: 45,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  dropdownText: {
    fontSize: 14,
    color: "#000",
  },
  dropdownIcon: {
    
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
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
  },
});
