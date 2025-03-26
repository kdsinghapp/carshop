import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../component/CustomHeaderProps';
import Icon from '../../../component/Icon';
import images, { icon } from '../../../component/Image';

const AddTaskForm: React.FC = () => {
  const navigation = useNavigation();

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [project, setProject] = useState<string | null>(null);
  const [carType, setCarType] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<string>('Public');
  const [description, setDescription] = useState<string>('');

  const dropdownData = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
 <CustomHeader
 navigation={navigation}
title='Add Task'
style={{marginTop:-20}}
seconfImg={true}
 />

      <View style={styles.form}>
        {/* Form Fields */}
        <TextInput style={styles.input} placeholder="Task Title" placeholderTextColor="#ccc" />

        {/* Date Picker */}
        <TouchableOpacity style={styles.dateContainer} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            {dueDate ? dueDate.toDateString() : 'Due Date'}
          </Text>
          <Icon source={icon.calendy} size={20}  />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Dropdowns */}
        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Project"
          value={project}
          onChange={(item) => setProject(item.value)}
          renderRightIcon={() =>        <Icon source={images.arrowdown} size={20}  />}
        />

        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Car Type"
          value={carType}
          onChange={(item) => setCarType(item.value)}
          renderRightIcon={() =>        <Icon source={images.arrowdown} size={20}  />}
        />

        <TextInput style={styles.input} placeholder="Plate Number" placeholderTextColor="#ccc" />

        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Assign Team Members"
          value={teamMembers}
          onChange={(item) => setTeamMembers(item.value)}
          renderRightIcon={() =>        <Icon source={images.arrowdown} size={20}  />}
        />

        <TextInput style={styles.input} placeholder="Tags" placeholderTextColor="#ccc" />

        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Status"
          value={status}
          onChange={(item) => setStatus(item.value)}
          renderRightIcon={() =>        <Icon source={images.arrowdown} size={20}  />}
        />

        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          placeholder="Priority"
          value={priority}
          onChange={(item) => setPriority(item.value)}
          renderRightIcon={() =>        <Icon source={images.arrowdown} size={20}  />}
        />

        {/* Visibility Options */}
        <Text style={styles.visibilityTitle}>Who Can See this Task?</Text>
        <View style={styles.radioGroup}>
          {['Public', 'Private', 'Admin Only'].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.radioItem}
              onPress={() => setVisibility(item)}
            >
              <Text style={styles.radioLabel}>{item}</Text>
              <View style={styles.radioCircle}>
                {visibility === item && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Description */}
        <TextInput
          style={styles.textArea}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View  style={{height:50}}/>
    </ScrollView>
  );
};

export default AddTaskForm;
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
      padding: 1,
 
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
    
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: '#F7F8F8',
      marginBottom: 15,
    },
    dateText: {
      color: '#555',
    },
    visibilityTitle: {
      color: '#007bff',
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
    },
    radioGroup: {
      flexDirection: 'column',
      marginBottom: 15,
    },
    radioItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      marginBottom: 10,
    },
    radioLabel: {
      marginRight: 10,
      fontSize: 16,
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#007bff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#007bff',
    },
    textArea: {
      height: 100,
      borderColor: '#ddd',

      borderRadius: 8,
      padding: 15,
      backgroundColor: '#F7F8F8',
      color: '#333',
      marginBottom: 15,
    },
    addButton: {
      backgroundColor: '#0063FF',
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  