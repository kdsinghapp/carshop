
    import React, { useState } from 'react';
    import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ScrollView, TextInput } from 'react-native';
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
    
    const AdminProjects: React.FC = ({ navigation }: any) => {
        const [search, setSearch] = useState('');
    
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={'#fff'}
                />
                <CustomHeader title='Projects'
                    style={{ marginTop: -15 }}
                    navigation={navigation} />
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
    
                                 {/* Progress Bar */}
              <View style={styles.progressBarBackground}>
                <View style={styles.progressBarFill}>
                <Text style={{fontSize:9,color:'#fff',alignSelf:'center'}}>60%</Text>
                    </View>
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
        progressBarBackground: {
            width: width * 0.6,
            height: 12,
            backgroundColor: '#F2F2F2',
            borderRadius: 20,
          },
          progressBarFill: {
            height: 12,
            width: '80%', // 80% progress
            backgroundColor: '#0063FF',
            borderRadius: 20,
          },
        searchContainer: {
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 15,
            height: 45,
            marginBottom: 15,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            marginHorizontal:15,
    
            elevation: 5
        },
        searchIcon: {
            width: 20,
            height: 20,
            tintColor: '#999',
        },
        searchInput: {
            flex: 1,
            paddingLeft: 10,
            fontSize: 14,
            color: '#000',
        },
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
    
    export default AdminProjects;
    