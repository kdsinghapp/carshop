import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import CustomHeader from '../../../component/CustomHeaderProps';
import Icon from '../../../component/Icon';
import { icon } from '../../../component/Image';

const employees = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Michael Johnson', value: 'michael' },
];

const managers = [
  { label: 'Alice Brown', value: 'alice' },
  { label: 'Robert Wilson', value: 'robert' },
  { label: 'Laura Martinez', value: 'laura' },
];

const AddNewShiftScreen: React.FC = ({navigation}) => {
  const [employee, setEmployee] = useState<string | null>(null);
  const [manager, setManager] = useState<string | null>(null);
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [breakTime, setBreakTime] = useState(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showBreakTimePicker, setShowBreakTimePicker] = useState(false);

  const handleSubmit = () => {
    Alert.alert('Shift Added', 'Your new shift has been successfully added!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
<CustomHeader
title='Add New Shift'
seconfImg={true}
navigation={navigation}
style={{marginTop:-25}}
/>

<View
style={{
    height:30
}}
/>
      {/* Employee Dropdown */}
      <Dropdown
        style={styles.dropdown}
        data={employees}
        labelField="label"
        valueField="value"
        placeholder="Employee"
        value={employee}
        onChange={(item) => setEmployee(item.value)}
      />

      {/* Manager Dropdown */}
      <Dropdown
        style={styles.dropdown}
        data={managers}
        labelField="label"
        valueField="value"
        placeholder="Shift Manager"
        value={manager}
        onChange={(item) => setManager(item.value)}
      />

      {/* Start Date Picker */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowStartDatePicker(true)}
      >
        <Text style={styles.dateText}>Start Date: {startDate.toDateString()}</Text>
        <Icon  source={icon.calendy} size={20} />
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {/* End Date Picker */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowEndDatePicker(true)}
      >
        <Text style={styles.dateText}>End Date: {endDate.toDateString()}</Text>
        <Icon  source={icon.calendy} size={20} />
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowEndDatePicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* Start Time Picker */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowStartTimePicker(true)}
      >
        <Text style={styles.dateText}>
          Start Time: {startTime.toLocaleTimeString()}
        </Text>
        <Icon  source={icon.clock} size={20}  style={{tintColor:'grey'}}/>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowStartTimePicker(false);
            if (date) setStartTime(date);
          }}
        />
      )}

      {/* End Time Picker */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowEndTimePicker(true)}
      >
        <Text style={styles.dateText}>
          End Time: {endTime.toLocaleTimeString()}
        </Text>
        <Icon  source={icon.clock} size={20}  style={{tintColor:'grey'}}/>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowEndTimePicker(false);
            if (date) setEndTime(date);
          }}
        />
      )}

      {/* Break Time Picker */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowBreakTimePicker(true)}
      >
        <Text style={styles.dateText}>
          Break Time: {breakTime.toLocaleTimeString()}
        </Text>
        <Icon  source={icon.clock} size={20}  style={{tintColor:'grey'}}/>
      </TouchableOpacity>
      {showBreakTimePicker && (
        <DateTimePicker
          value={breakTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowBreakTimePicker(false);
            if (date) setBreakTime(date);
          }}
        />
      )}

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddNewShiftScreen;
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
    dropdown: {
      backgroundColor: '#F7F8F8',
      borderRadius: 10,
      padding: 15,
  
      marginBottom: 15,
    },
    datePickerButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F7F8F8',
      borderRadius: 10,
      padding: 15,
     

      marginBottom: 15,
    },
    dateText: {
      fontSize: 14,
      color: '#444',
      fontWeight:'600'
    },
    addButton: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  