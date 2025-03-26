import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, StatusBar } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import CustomHeader from '../../../component/CustomHeaderProps';
import Icon from '../../../component/Icon';
import { icon } from '../../../component/Image';

const leaveTypes = [
  { label: 'Sick Leave', value: 'sick' },
  { label: 'Vacation Leave', value: 'vacation' },
  { label: 'Casual Leave', value: 'casual' },
  { label: 'Maternity Leave', value: 'maternity' }
];

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' }
];

const AddLeaveScreen: React.FC = ({navigation}) => {

  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [contractPdf, setContractPdf] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleFileUpload = async () => {

  };

  const handleSubmit = () => {
    Alert.alert('Leave Submitted', 'Your leave request has been submitted successfully.');
  };

  return (
    <ScrollView style={styles.container}>
        <StatusBar
backgroundColor={'#fff'}
        />
  <CustomHeader
  seconfImg={true}
title='Add Leave'
navigation={navigation}

style={{marginTop:-25}}

  />
<View style={{marginVertical:10}} />
    
      <TextInput
        placeholder="Employee Name"
        value={employeeName}
        onChangeText={setEmployeeName}
        style={styles.input}
      />

      {/* Leave Type Dropdown */}
      <Dropdown
        style={styles.dropdown}
        data={leaveTypes}
        labelField="label"
        valueField="value"
        placeholder="Leave Type"
        value={leaveType}
        onChange={(item) => setLeaveType(item.value)}
      />

      {/* Start Date Picker */}
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowStartDatePicker(true)}
      >
        <Text style={styles.dateText}>Start Date: {startDate.toDateString()}</Text>
        <Icon  size={20} source={icon.calendy} />
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
        <Icon  size={20} source={icon.calendy} />
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

      {/* Reason TextArea */}
      <TextInput
        placeholder="Reason"
        value={reason}
        onChangeText={setReason}
        style={[styles.input, styles.textArea]}
        multiline
      />

      {/* File Upload */}
      <TouchableOpacity style={styles.uploadContainer} onPress={handleFileUpload}>
      <Icon  size={20} source={icon.Upload} />
        <Text style={styles.uploadText}>
          {contractPdf ? contractPdf : 'Upload Contract Pdf'}
        </Text>
      </TouchableOpacity>

      {/* Status Dropdown */}
      <Dropdown
        style={styles.dropdown}
        data={statusOptions}
        labelField="label"
        valueField="value"
        placeholder="Status"
        value={status}
        onChange={(item) => setStatus(item.value)}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddLeaveScreen;
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
    input: {
      backgroundColor: '#F7F8F8',
      borderRadius: 10,
      padding: 15,
      fontSize: 16,
      marginBottom: 15,
   
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
      fontSize: 16,
      color: '#000',
    },
    textArea: {
      height: 120,
      textAlignVertical: 'top',
    },
    uploadContainer: {
      backgroundColor: '#F7F8F8',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
height:120,
      marginBottom: 15,
    },
    uploadText: {
      color: '#888',
      marginTop: 10,
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
  