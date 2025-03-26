import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../component/CustomHeaderProps';
import Icon from '../../../component/Icon';
import { icon } from '../../../component/Image';
import { hp } from '../../../component/Constant';

const AddEmployeeForm: React.FC = () => {
  const navigation = useNavigation();
  const [contractFile, setContractFile] = useState<string | null>(null);



  return (
    <ScrollView style={styles.container}>
        <StatusBar
backgroundColor={'#fff'}
        />
<CustomHeader
title='Add Employee'
navigation={navigation}
seconfImg={true}
style={{marginTop:-20}}
/>
      <View style={styles.form}>
        {/* Form Fields */}
        {[
          'Employee ID',
          'First Name',
          'Last Name',
          'Email',
          'Personal Number',
          'Account No',
          'Salary',
          'Role',
          'Address',
          'Street Number',
          'City',
          'Postal Code',
          'About Employee',
          'Experience'
        ].map((placeholder, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#ccc"
          />
        ))}

        {/* PDF Upload */}
        <TouchableOpacity style={styles.uploadButton} onPress={()=>{

        }}>
          <Icon  size={24} source={icon.Upload} />
          <Text style={styles.uploadText}>
            {contractFile ? contractFile : 'Upload Contract PDF'}
          </Text>
        </TouchableOpacity>

        {/* Dropdown (Team Selection) */}
        <TextInput style={styles.input} placeholder="Team" placeholderTextColor="#ccc" />

        {/* Submit Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View  style={{height:hp(5)}} />
    </ScrollView>
  );
};

export default AddEmployeeForm;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    backButton: {
      marginBottom: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    form: {
     
      borderRadius: 10,
      padding:5,
   
    },
    input: {
      height: 50,
      borderColor: '#ddd',
  
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#F7F8F8',
      color: '#333',
    },
    uploadButton: {
  
      alignItems: 'center',
      justifyContent: 'center',
      height:120,

      borderColor: '#ddd',
      borderRadius: 10,
      backgroundColor: '#F7F8F8',
      marginBottom: 20,
    },
    uploadText: {
      marginLeft: 10,
      marginTop:10,
      color: '#555',
      fontSize: 14,
    },
    addButton: {
      backgroundColor: '#0063FF',
      height: 55,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  