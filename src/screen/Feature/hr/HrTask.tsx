

    import React, { useState } from 'react';
    import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ScrollView, TextInput } from 'react-native';
    import CustomHeader from '../../../component/CustomHeaderProps';
    import images, { icon } from '../../../component/Image';
    import { wp } from '../../../component/Constant';
    import Icon from '../../../component/Icon';
    import ScreenNameEnum from '../../../routes/screenName.enum';
    
    const { width } = Dimensions.get('window');
    
    const tasks = [
        { id: '1', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Liam Wilson', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
        { id: '2', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Jaxon Wilson', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
        { id: '3', task: 'Ceramic Coating Application', project: 'Protective Coating', assignedTo: 'Tiana Julian', deadline: '2025-03-20', priority: 'Medium', status: 'In Progress' },
    ];
    
    const HrTask: React.FC = ({ navigation }: any) => {
        const [search, setSearch] = useState('');
    
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={'#fff'}
                />
                <CustomHeader title='Task'
                seconfImg={true}
                    style={{ marginTop: -20 }}
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
                                        <Text style={styles.priority}>Medium</Text>
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
                                        <Text style={styles.label}>Project</Text>
                                        <Text style={styles.taskText}>{item.assignedTo}</Text>
                                    </View>
                                    <View >
                                        <Text style={styles.label}>Status</Text>
                                        <Text style={styles.deadline}>in Progress</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Icon
                                            source={icon.eyes}
    
                                            style={{ height: 25, width: 25 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.label}>Assigned To</Text>
                                        <Text style={styles.taskText}>25-03-20</Text>
    
    
                                    </View>
                                    <View>
                                        <Text style={styles.label}>Deadline</Text>
                                        <Text style={styles.taskText}>25-03-20</Text>
    
                                    </View>
                                    <TouchableOpacity>
                                        <Icon
                                            source={icon.edit}
    
                                            style={{ height: 25, width: 25 }}
                                        />
                                    </TouchableOpacity>
                                </View>
    
                        
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView>
                <TouchableOpacity 
          onPress={()=>{
            navigation.navigate(ScreenNameEnum.AddTaskForm)
          }}
        style={{
          position:'absolute',
          bottom:20,right:15
        }}>
          <Icon
    size={60}
    
    source={images.addpluse}
          />
        </TouchableOpacity>
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
                backgroundColor: '#FFCC00',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',paddingHorizontal:10,marginVertical:5
            
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
            backgroundColor: '#AF52DE',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',paddingHorizontal:10,marginVertical:5
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
    
    export default HrTask;
    