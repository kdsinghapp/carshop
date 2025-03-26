import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import CustomHeader from '../../../component/CustomHeaderProps';

const employees = [
    { label: 'John Doe', value: 'john' },
    { label: 'Jane Smith', value: 'jane' },
    { label: 'Michael Johnson', value: 'michael' },
];

const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
];

const AddOvertimeScreen: React.FC = ({ navigation }) => {
    const [employee, setEmployee] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const [overtimeDate, setOvertimeDate] = useState(new Date());
    const [overtime, setOvertime] = useState<string>('');
    const [remainingHours, setRemainingHours] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = () => {
        Alert.alert('Overtime Added', 'Your overtime entry has been successfully added!');
    };

    return (
        <ScrollView style={styles.container}>

            <CustomHeader
                seconfImg={true}
                navigation={navigation} title="Add Overtime" showSkip={false} style={{ marginTop: -20 }} />

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

            {/* Overtime Date Picker */}
            <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.dateText}>
                    Overtime Date: {overtimeDate.toDateString()}
                </Text>
                <Icon name="calendar" size={20} color="#000" />
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={overtimeDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) setOvertimeDate(date);
                    }}
                />
            )}

            {/* Overtime Input */}
            <TextInput
                style={styles.input}
                placeholder="Overtime"
                value={overtime}
                onChangeText={setOvertime}
                keyboardType="numeric"
            />

            {/* Remaining Hours Input */}
            <TextInput
                style={styles.input}
                placeholder="Remaining Hours"
                value={remainingHours}
                onChangeText={setRemainingHours}
                keyboardType="numeric"
            />

            {/* Description Input */}
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />

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

export default AddOvertimeScreen;

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
        fontSize: 16,
        color: '#000',
    },
    input: {
        backgroundColor: '#F7F8F8',
        borderRadius: 10,
        padding: 15,
   
        fontSize: 16,
        marginBottom: 15,
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
