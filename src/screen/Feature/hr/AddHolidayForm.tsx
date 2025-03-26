import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomHeader from '../../../component/CustomHeaderProps';
import Icon from '../../../component/Icon';
import { icon } from '../../../component/Image';

const AddHolidayForm: React.FC = ({navigation}) => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
  };

  const handleSubmit = () => {
    if (!title || !date || !description || !status) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', `Holiday Added: ${title}`);
  };

  return (
    <View style={styles.container}>
             <CustomHeader
                seconfImg={true}
                navigation={navigation} title="Add Holiday" showSkip={false} style={{ marginTop: -20 }} />

  
<View
style={{marginTop:30}}
/>
      {/* Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      {/* Date Picker */}
      <TouchableOpacity style={styles.dateContainer} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>
          {date ? formatDate(date) : 'Select Date'}
        </Text>
        <Icon source={icon.calendy} size={20}  style={styles.calendarIcon} />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {/* Description Input */}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

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

export default AddHolidayForm;
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
    descriptionInput: {
      height: 120,
      textAlignVertical: 'top',
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
    calendarIcon: {
      marginLeft: 10,
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
  