
    import React, { useState } from 'react';
    import { View, Text, Image, ScrollView, StyleSheet, Dimensions, FlatList, TouchableOpacity, TextInput } from 'react-native';
import CustomHeader from '../../../component/CustomHeaderProps';
import ScreenNameEnum from '../../../routes/screenName.enum';
import images, { icon } from '../../../component/Image';
import Icon from '../../../component/Icon';
import { wp } from '../../../component/Constant';

    const { width } = Dimensions.get('window');
    
    const OverTime = ({ navigation }) => {
        const [search, setSearch] = useState('');
   
    
        return (
            <View style={styles.container}>
                {/* Header */}
                <CustomHeader
                 seconfImg={true}
                navigation={navigation} title="Overtime" showSkip={false} style={{ marginTop: -20 }} />
    
                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate(ScreenNameEnum.OvertimeEmploye)
                    }}
                    style={styles.statCard}>
                        <Text style={styles.statLabel}>Overtime Employees</Text>
                        <Text style={styles.statNumber}>15</Text>
                        <Icon   size={25} source={images.frame} style={{marginTop:10}} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate(ScreenNameEnum.OvertimeHours)
                        }}
                    
                    style={styles.statCard}>
                        <Text style={styles.statLabel}>Overtime Hours</Text>
                        <Text style={styles.statNumber}>110</Text>
                        <Icon   size={20} source={images.cloack} style={{marginTop:15}} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={()=>{
                        navigation.navigate(ScreenNameEnum.TotallyTask)
                    }}
                    
                    style={styles.statCard}>
                        <Text style={styles.statLabel}>Pending Request</Text>
                        <Text style={styles.statNumber}>20</Text>
                        <Icon   size={25} source={images.list} style={{marginTop:10}} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                          onPress={()=>{
                            navigation.navigate(ScreenNameEnum.AdminProjects)
                        }}
                    
                    style={styles.statCard}>
                        <Text style={styles.statLabel}>Rejected</Text>
                        <Text style={styles.statNumber}>07</Text>
                        <Icon   size={25} source={images.doc} style={{marginTop:10}} />
                    </TouchableOpacity>
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20, paddingVertical: 10 }}>


                <FlatList
                    data={tasks}

                    keyExtractor={(item) => item.id}


                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 10,
                                alignItems: 'center',

                            }}>
                                <Image

                                    source={images.dp}

                                    style={{ height: 40, width: 40 }}
                                />
                                <View style={{ marginLeft: 10, }}>
                                    <Text style={{
                                        fontSize: 14, fontWeight: '600'
                                    }}>Approved By</Text>
                                    <Text style={{
                                        fontSize: 12, fontWeight: '400'
                                    }}>Approved By</Text>
                                </View>


                            </View>
                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.label}>Leave Type</Text>
                                    <Text style={[styles.deadline, { backgroundColor: '#34C759' }]}>Annual Leave</Text>
                                </View>
                                <View>

                                    <Text style={styles.label}>Status</Text>
                                    <Text style={[styles.deadline, { backgroundColor: '#FFCC00' }]}>Pending</Text>
                                </View>
                                <TouchableOpacity>
                                    <Icon
                                        source={icon.redtras}

                                        style={{ height: 25, width: 25 }}
                                    />
                                </TouchableOpacity>
                            </View>



                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.label}>From</Text>
                                    <Text style={styles.taskText}>25-03-20</Text>
                                </View>
                                <View >
                                    <Text style={styles.label}>To</Text>
                                    <Text style={styles.taskText}>25-03-20</Text>
                                </View>
                                <View>
                                <TouchableOpacity>
                                    <Icon
                                        source={icon.eyes}

                                        style={{ height: 25, width: 25 }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    marginTop:10
                                }}>
                                    <Icon
                                        source={icon.edit}

                                        style={{ height: 25, width: 25 }}
                                    />
                                </TouchableOpacity>
                                </View>
                                
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Image

                                    source={images.dp}

                                    style={{ height: 40, width: 40 }}
                                />
                                <View style={{ marginLeft: 10, width: "50%" }}>
                                    <Text style={{
                                        fontSize: 14, fontWeight: '600'
                                    }}>Approved By</Text>
                                    <Text style={{
                                        fontSize: 12, fontWeight: '400'
                                    }}>Approved By</Text>
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{
                                        fontSize: 14, fontWeight: '600'
                                    }}>No of Days</Text>
                                    <Text style={{
                                        fontSize: 12, fontWeight: '400'
                                    }}>3 Days</Text>
                                </View>

                            </View>

                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
            
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ScreenNameEnum.AddOvertimeScreen)
                }}
                style={{
                    position: 'absolute',
                    bottom: 20, right: 15
                }}>
                <Icon
                    size={60}

                    source={images.addpluse}
                />
            </TouchableOpacity>
            </View>
        );
    };
    const tasks = [
        { id: '1', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Liam Wilson', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
        { id: '2', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Jaxon Wilson', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
        { id: '3', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Tiana Julian', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
    ];
    
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
            marginHorizontal: 15,
    
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
            fontSize: 12,
            color: '#444',
            flex: 2,
        },
        priority: {
            fontSize: 12,
            color: '#444',
    
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 30,
            marginVertical: 5,
        },
        status: {
            fontSize: 12,
            color: '#444',
            backgroundColor: '#AF52DE',
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 10,
            marginVertical: 5
        },
        deadline: {
            fontSize: 12,
            backgroundColor: '#0063FF',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold', paddingHorizontal: 10, marginVertical: 5
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
        progressBar: {
            width: wp(35),
            alignSelf:'center',
            marginTop: 10,
            backgroundColor: "#F2F2F2",
            height: 13,
            borderRadius: 20,
          },
          progressFill: {
            height: 13,
            borderRadius: 20,
            backgroundColor: "#0063FF",
            alignItems:'center',justifyContent:'center',
            width: "60%", // Adjust as needed
          },
          
      
    
        statsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginVertical: 20,
        },
        statCard: {
            width: width * 0.45,
            padding: 15,
            backgroundColor: '#fff',
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 10,
            paddingVertical: 30,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
    
            elevation: 5,
        },
        statNumber: {
            marginTop: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
        },
        statLabel: {
            fontSize: 14,
            color: '#555',
            textAlign: 'center',
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginVertical: 10,
        },
        employeeCard: {
          
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 15,
            marginBottom: 10,
            width: width * 0.42,
            elevation: 3,
            alignItems: 'center',
            justifyContent:'center',
            margin:10
        },
        employeeImage: {
            width: 80,
            height: 80,
           
        },
        employeeInfo: {
            marginLeft: 10,
            alignItems:'center',
            justifyContent:'center',
            marginTop:10
        },
        employeeName: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        employeeRole: {
            fontSize: 14,
            color: '#0063FF',
            fontWeight:'600'
        },
        employeeStats: {
            fontSize: 12,
            color: '#888',
            textAlign:'center'
        },
    });
    
    export default OverTime;
    