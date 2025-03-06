import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Dropdown } from "react-native-element-dropdown";
import Icon from "../../component/Icon";
import images from "../../component/Image";

const AddVehicleScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const [brand, setBrand] = useState(null);
  const [car, setCar] = useState(null);

  const brandData = [
    { label: "Toyota", value: "toyota" },
    { label: "Honda", value: "honda" },
    { label: "Ford", value: "ford" },
  ];

  const carData = [
    { label: "Camry", value: "camry" },
    { label: "Civic", value: "civic" },
    { label: "Mustang", value: "mustang" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon source={images.BackNavs2} size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Vehicle</Text>
      </View>

      {/* Car Number Plate Input */}
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Car Number Plate" 
          style={styles.input} 
        />
        <TouchableOpacity style={styles.iconButton}>
        <Icon source={images.addcircle} size={30} />
        </TouchableOpacity>
      </View>

      {/* Add Car Manual Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Car Manual</Text>
      </TouchableOpacity>

      {/* Brand Dropdown */}
      <Dropdown
        style={styles.dropdown}
        data={brandData}
        labelField="label"
        valueField="value"
        placeholder="Select Brand"
        value={brand}
        onChange={(item) => setBrand(item.value)}
      />

      {/* Car Dropdown */}
      <Dropdown
        style={styles.dropdown}
        data={carData}
        labelField="label"
        valueField="value"
        placeholder="Select Car"
        value={car}
        onChange={(item) => setCar(item.value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: '30%',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding:8,
    borderRadius:15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconButton: {
    padding: 5,
  },
  addButton: {
    backgroundColor: "white",
    borderColor: "#0063FF",
    borderWidth: 1,
    padding: 12,
    borderRadius:15,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "#0063FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius:15,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
});

export default AddVehicleScreen;
