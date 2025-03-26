import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, StyleSheet, StatusBar, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomHeader from '../../../component/CustomHeaderProps';
import images, { icon } from '../../../component/Image';

interface AttendanceLog {
    date: string;
    checkIn: string;
    checkOut: string;
    break: string;
    overtime: string;
    productionHours: string;
}

const EmployeeAttendance: React.FC = ({ navigation }) => {
    const [isPunchedIn, setIsPunchedIn] = useState(false);
    const [search, setSearch] = useState('');

    const logs: AttendanceLog[] = [
        {
            date: '10 Dec 2024',
            checkIn: '08:00 AM',
            checkOut: '05:00 PM',
            break: '1 hour',
            overtime: '30 min',
            productionHours: '8.5 hrs',
        },
        {
            date: '09 Dec 2024',
            checkIn: '08:15 AM',
            checkOut: '05:10 PM',
            break: '1 hour',
            overtime: '45 min',
            productionHours: '9 hrs',
        },
        {
            date: '08 Dec 2024',
            checkIn: '08:05 AM',
            checkOut: '04:50 PM',
            break: '1 hour',
            overtime: '15 min',
            productionHours: '7.8 hrs',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                backgroundColor={'#fff'}
            />
            <CustomHeader

                seconfImg={true}
                title='Employee Attendance'
                navigation={navigation}

                style={{ marginTop: -20 }}
            />
            {/* Profile Card */}
            <View style={styles.profileCard}>
                <Image
                    source={images.dp}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileDate}>08:00 AM - 5:00 PM</Text>
                    <Text style={styles.punchTime}>Production: 3.68 hrs</Text>
                    <Text style={styles.productionHours}>Punch in at 10:00 AM</Text>
                </View>
            </View>

            {/* Punch In/Out */}
            <TouchableOpacity
                style={isPunchedIn ? styles.punchOutButton : styles.punchInButton}
                onPress={() => setIsPunchedIn(!isPunchedIn)}
            >
                <Text style={styles.punchText}>{isPunchedIn ? 'Punch Out' : 'Punch In'}</Text>
            </TouchableOpacity>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
                {[
                    { label: 'Total Hours Today', value: '8.36 / 9', percentage: '5% This Week' },
                    { label: 'Total Hours Week', value: '10 / 40', percentage: '5% This Week' },
                    { label: 'Total Hours Month', value: '75 / 98', percentage: '5% This Week' },
                    { label: 'Overtime This Month', value: '16 / 28', percentage: '5% This Week' }
                ].map((stat, index) => (
                    <View key={index} style={styles.statCard}>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={[styles.statPercentage, { color: index < 2 ? '#34C759' : '#FF3B30' }]}>{stat.percentage}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.searchContainer}>
                <Image source={icon.search} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>


                <FlatList
                    data={logs}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.logCard}>
                            <View style={{        marginVertical:5,
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                            }}>

                                <Text style={styles.logDate}>Date</Text>
                                <Text style={styles.logDate}>Status</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                            }}>

                                <Text style={styles.logItem}>{item.date}</Text>

                                <Text style={styles.logItem}>Present</Text>

                            </View>
                            <View style={{
                                        marginVertical:5,
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                            }}>

                                <Text style={styles.logDate}>Check in</Text>
                                <Text style={styles.logDate}>Check Out</Text>
                            </View>
                            <View style={{
                        
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                    }}>

                        <Text style={styles.logItem}>{item.checkIn}</Text>
                        <Text style={styles.logItem}>{item.checkOut}</Text>
                    </View>
                            <View style={{
                                        marginVertical:5,
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                            }}>

                                <Text style={styles.logDate}>Break</Text>
                                <Text style={styles.logDate}>Late</Text>
                            </View>
                            <View style={{
                        
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                            }}>

                                <Text style={styles.logItem}>10Min</Text>
                                <Text style={styles.logItem}>10Min</Text>
                            </View>
                            <View style={{
                                        marginVertical:5,
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                            }}>

                                <Text style={styles.logDate}>Overtime</Text>
                                <Text style={styles.logDate}>Production Hours</Text>
                            </View>
                            <View style={{
                        
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                            }}>

                                <Text style={styles.logItem}>45 Min</Text>
                                <Text style={[styles.logItem,{color:'#0063FF'}]}>9:45 Hrs</Text>
                            </View>

                              </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default EmployeeAttendance;

const styles = StyleSheet.create({
    searchContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginHorizontal: 15,

        elevation: 5
    },
searchIcon: {
        width: 20,
        height: 20,} ,
    searchInput: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 14,
        color: '#000',
    },
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
    profileCard: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileDate: {
        color: '#666',
        marginBottom: 5,
    },
    productionHours: {
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10
    },
    punchTime: {
        color: '#000',
        backgroundColor: '#FFCC00', padding: 5, borderRadius: 30, width: '60%', textAlign: 'center'
    },
    punchInButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    punchOutButton: {
        backgroundColor: '#0063FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    punchText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    statLabel: {
        fontSize: 16,
        color: '#666',
        alignSelf: 'center',

    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 5

    },
    statPercentage: {
        color: '#007bff',
        alignSelf: 'center',
        fontWeight: '600'
    },
    logCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        margin: 5
    },
    logDate: {
        fontSize: 14,
        fontWeight: 'bold',


    },
    logItem: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600'
    },
    productionHoursText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007bff',
        marginTop: 5,
    },
});
