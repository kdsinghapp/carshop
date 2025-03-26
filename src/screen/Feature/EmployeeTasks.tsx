import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import CustomHeader from '../../component/CustomHeaderProps';
import { wp } from '../../component/Constant';
import { icon } from '../../component/Image';
import Icon from '../../component/Icon';

const { width } = Dimensions.get('window');

const tasks = [
    { id: '1', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Liam Wilson', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
    { id: '2', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Jaxon Wilson', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
    { id: '3', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Tiana Julian', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
];

const EmployeeTasks: React.FC = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'#fff'}
            />
            <CustomHeader title='Employee'
                style={{ marginTop: -15 }}
                seconfImg={true}
                navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20, paddingVertical: 10 }}>


                <FlatList
                    data={tasks}
                
                    keyExtractor={(item) => item.id}

    
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            {/* Task Details */}
                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.label}>Task</Text>
                                    <Text style={styles.taskText}>{item.task}</Text>
                                </View>
                                <View>

                                    <Text style={styles.label}>Priority</Text>
                                    <Text style={styles.priority}>{item.priority}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.label}>Project</Text>
                                    <Text style={styles.taskText}>{item.project}</Text>


                                </View>
                                <View>
                                    <Text style={styles.label}>Status</Text>
                                    <Text style={styles.status}>{item.status}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.label}>Assigned To</Text>
                                    <Text style={styles.taskText}>{item.assignedTo}</Text>
                                </View>
                                <View>
                                    <Text style={styles.label}>Deadline</Text>
                                    <Text style={styles.deadline}>{item.deadline}</Text>
                                </View>
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.rejectButton}>
                                    <Text style={styles.rejectText}>Reject</Text>
                                    <Icon size={15} source={icon.closecircle} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.acceptButton}>
                                    <Text style={styles.acceptText}>Accept</Text>
                                    <Icon source={icon.tickcircle} size={15} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        </View>
    );
};

// **Styles**
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#000',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    card: {
        backgroundColor: '#fff',
        marginTop: 5,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
    },
    taskText: {
        fontSize: 14,
        color: '#444',
        flex: 2,
    },
    priority: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#FFCC00',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 30,
        marginVertical: 5,
    },
    status: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#AF52DE',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        marginVertical: 5
    },
    deadline: {
        fontSize: 12,
        color: '#D9534F',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,

    },
    rejectButton: {

        width: wp(40),
        height: 45,
        flexDirection: 'row',

        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D32F2F',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rejectText: {
        color: '#D32F2F',
        fontWeight: 'bold',
    },
    acceptButton: {
        marginLeft: 10,
        width: wp(40),

        height: 45,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#388E3C',
        alignItems: 'center',
        justifyContent: 'center'

    },
    acceptText: {
        color: '#388E3C',
        fontWeight: 'bold',
    },
});

export default EmployeeTasks;
