import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomHeader from '../../../component/CustomHeaderProps';
import Icon from '../../../component/Icon';
import { icon } from '../../../component/Image';

const AddLeaveRequestForm: React.FC = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<Date | null>(new Date());
  const [dateTo, setDateTo] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  const handleDateChange = (event: any, selectedDate?: Date, type?: string) => {
    if (selectedDate) {
      type === 'from' ? setDateFrom(selectedDate) : setDateTo(selectedDate);
    }
    setShowFromPicker(false);
    setShowToPicker(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
  };

  const handleSubmit = () => {
    if (!name || !reason || !dateFrom || !dateTo || !status) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', `Leave Request Added: ${name}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      
      <CustomHeader
                    seconfImg={true}
                    navigation={navigation} title="Add Request Leave"
                     showSkip={false} 
                     style={{ marginTop: -20 }} />

  
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      {/* Reason Input */}
      <TextInput
        style={styles.input}
        placeholder="Reason for Leave"
        placeholderTextColor="#999"
        value={reason}
        onChangeText={setReason}
      />

      {/* Date From Picker */}
      <TouchableOpacity style={styles.dateContainer} onPress={() => setShowFromPicker(true)}>
        <Text style={styles.dateText}>
          {dateFrom ? formatDate(dateFrom) : 'Date From'}
        </Text>
        <Icon   size={20}  source={icon.calendy} />
      </TouchableOpacity>

      {showFromPicker && (
        <DateTimePicker
          value={dateFrom || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(e, selectedDate) => handleDateChange(e, selectedDate, 'from')}
        />
      )}

      {/* Date To Picker */}
      <TouchableOpacity style={styles.dateContainer} onPress={() => setShowToPicker(true)}>
        <Text style={styles.dateText}>
          {dateTo ? formatDate(dateTo) : 'Date To'}
        </Text>
        <Icon   size={20}  source={icon.calendy} />
      </TouchableOpacity>

      {showToPicker && (
        <DateTimePicker
          value={dateTo || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(e, selectedDate) => handleDateChange(e, selectedDate, 'to')}
        />
      )}

      {/* Status Dropdown */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        data={statusOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Status"
        value={status}
        onChange={(item) => setStatus(item.value)}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddLeaveRequestForm;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    input: {
      backgroundColor: '#F7F8F8',
      borderRadius: 10,
      padding: 15,
      fontSize: 16,
      marginBottom: 15,
     
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F7F8F8',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      
    },
    dateText: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    dropdown: {
      height: 50,

      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: '#F7F8F8',
    },
    placeholder: {
      color: '#999',
      fontSize: 16,
    },
    selectedText: {
      fontSize: 16,
      color: '#333',
    },
    addButton: {
      backgroundColor: '#007bff',
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  