import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { icon } from './Image';
import { color } from '../constant';


interface HomeHeaderProps {
    navigation: StackNavigationProp<any, any>;
    location: string;
    hasNotifications?: boolean;
    onLocationPress?: () => void;
    onNotificationPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ 
    navigation, 
    location, 
    hasNotifications = false, 
    onLocationPress, 
    onNotificationPress 
}) => {
    return (
        <View style={styles.container}>
            {/* Location Section */}
            <View>
            <Text style={styles.locationText}>Location</Text>
     
            <TouchableOpacity onPress={onLocationPress} style={styles.locationContainer}>
                <Image source={icon.pin} style={styles.locationIcon} />
                <Text style={styles.locationText}>{location}</Text>
            </TouchableOpacity>
            </View>
            {/* Divider */}
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={icon.user}
                resizeMode='contain'
                style={{height:30,width:30,marginRight:5}} />

            {/* Notification Icon */}
            <TouchableOpacity onPress={onNotificationPress} style={styles.notificationContainer}>
                <Image source={icon.notification}
                resizeMode='contain'
                style={styles.notificationIcon} />
                {hasNotifications && <View style={styles.badge} />}
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
      
    
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: 16,
        height: 16,
        tintColor: '#FFC107',
        marginRight: 5,
    },
    locationText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    divider: {
        height: 15,
        width: 15,
      borderRadius:7.5,
        borderWidth:1,borderColor:color.borderColor,
        marginHorizontal: 15,
    },
    notificationContainer: {
        position: 'relative',
    },
    notificationIcon: {
        width: 40,
        height: 40,
        tintColor: '#fff',
    },
    badge: {
        position: 'absolute',
        top: 4
        ,
        right: 4,
        width: 8,
        height: 8,
        backgroundColor: 'red',
        borderRadius: 4,
    },
});

export default HomeHeader;
