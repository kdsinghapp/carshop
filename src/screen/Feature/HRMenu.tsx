import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomHeader from '../../component/CustomHeaderProps';
import Icon from '../../component/Icon';
import { icon } from '../../component/Image';
import ScreenNameEnum from '../../routes/screenName.enum';

const HRMenu = ({ navigation }) => {

    const menuItems = [
        'Employee List',
        'Employee Grid',
        'Projects',
        'Task',
        'Attendence',
        'Leaves',
        'Shift & Schedule',
        'Overtime',
        'Holiday',
        'Request Leave'
    ];

    const handleNavigation = (item) => {
     if(item === 'Employee List'){
        navigation.navigate(ScreenNameEnum.EmployeeList)
     }
     if(item === 'Employee Grid'){
        navigation.navigate(ScreenNameEnum.EmployeeGrid)
     }
     if(item === 'Projects'){
        navigation.navigate(ScreenNameEnum.HrProjects)
     }
     if(item === 'Task'){
        navigation.navigate(ScreenNameEnum.HrTask)
     }
     if(item === 'Attendence'){
        navigation.navigate(ScreenNameEnum.EmployeeAttendance)
     }
     
     if(item === 'Leaves'){
        navigation.navigate(ScreenNameEnum.HrLeave)
     }
     if(item === 'Shift & Schedule'){
        navigation.navigate(ScreenNameEnum.ShirftSchedule)
     }
     if(item === 'Overtime'){
        navigation.navigate(ScreenNameEnum.OverTime)
     }
     if(item === 'Holiday'){
        navigation.navigate(ScreenNameEnum.HolidayListScreen)
     }
     if(item === 'Request Leave'){
        navigation.navigate(ScreenNameEnum.RequestLeave)
     }
     
    };

    return (
        <View style={styles.container}>
            <CustomHeader seconfImg={true}
                title='HR' navigation={navigation} style={{ marginTop:0 }}
            />

            <ScrollView contentContainerStyle={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => handleNavigation(item)}
                    >
                        <Text style={styles.menuText}>{item}</Text>
                        <Icon source={icon.rightarrow} size={20}  />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default HRMenu;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    menuContainer: {
        paddingVertical: 10,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        fontSize: 16,
        color: '#000',
        fontWeight:'600'
    },
});
