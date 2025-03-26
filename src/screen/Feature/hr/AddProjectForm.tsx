import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../component/CustomHeaderProps';
import Icon from '../../../component/Icon';
import images, { icon } from '../../../component/Image';

const AddProjectForm: React.FC = () => {
  const navigation = useNavigation();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Dropdown data
  const [category, setCategory] = useState<string | null>(null);
  const [carType, setCarType] = useState<string | null>(null);
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const dropdownData = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ];

  const handleDateChange = (event: any, selectedDate?: Date, isStart: boolean = true) => {
    if (isStart) {
      setShowStartDatePicker(false);
      setStartDate(selectedDate || startDate);
    } else {
      setShowEndDatePicker(false);
      setEndDate(selectedDate || endDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
<CustomHeader

seconfImg={true}
navigation={navigation}
style={{marginTop:-20}}
title='Add Project'
/>
      <View style={styles.form}>
        {/* Form Fields */}
        <TextInput style={styles.input} placeholder="Project Name" placeholderTextColor="#ccc" />

        {/* Dropdowns */}
        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Category"
          value={category}
          onChange={(item) => setCategory(item.value)}
          renderRightIcon={() => <Icon  size={20} source={images.arrowdown}  />}
        />

        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Car Type"
          value={carType}
          onChange={(item) => setCarType(item.value)}
          renderRightIcon={() => <Icon  size={20} source={images.arrowdown}  />}
        />

        <TextInput style={styles.input} placeholder="Plate Number" placeholderTextColor="#ccc" />

        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(item) => setAssignedTo(item.value)}
          renderRightIcon={() => <Icon  size={20} source={images.arrowdown}  />}
        />

        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Team Members"
          value={teamMembers}
          onChange={(item) => setTeamMembers(item.value)}
          renderRightIcon={() => <Icon  size={20} source={images.arrowdown}  />}
        />

        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Status"
          value={status}
          onChange={(item) => setStatus(item.value)}
          renderRightIcon={() => <Icon  size={20} source={images.arrowdown}  />}
        />

        {/* Date Pickers */}
        <TouchableOpacity style={styles.dateContainer} onPress={() => setShowStartDatePicker(true)}>
          <Text style={styles.dateText}>
            {startDate ? startDate.toDateString() : 'Start Date'}
          </Text>
          <Icon  size={20} source={icon.calendy}  />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateContainer} onPress={() => setShowEndDatePicker(true)}>
          <Text style={styles.dateText}>
            {endDate ? endDate.toDateString() : 'End Date'}
          </Text>
          <Icon  size={20} source={icon.calendy}  />
        </TouchableOpacity>

        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, true)}
          />
        )}

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, false)}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddProjectForm;
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
      padding: 20,

    },
    input: {
      height: 50,
      borderColor: '#ddd',
    
      borderRadius: 15,
      paddingHorizontal: 15,
      backgroundColor: '#F7F8F8',
      color: '#333',
      marginBottom: 15,
    },
    dropdown: {
      height: 50,
      borderColor: '#ddd',

      borderRadius: 15,
      paddingHorizontal: 15,
      backgroundColor: '#F7F8F8',
      color: '#333',
      marginBottom: 15,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      marginBottom: 15,
    },
    dateText: {
      color: '#555',
    },
    addButton: {
      backgroundColor: '#007bff',
      height: 50,
      borderRadius: 10,
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
  