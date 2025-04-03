import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { icon } from './Image';
import { color } from '../constant';
import ScreenNameEnum from '../routes/screenName.enum';


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
            <TouchableOpacity onPress={()=>{
                navigation.navigate(ScreenNameEnum.PROFILE_SCREEN)
            }}
             style={styles.box}>
            <Image source={icon.user}
                resizeMode='contain'
                style={{height:25,width:25,}} />
                </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                navigation.navigate(ScreenNameEnum.CHAT_SCREEN)
            }}   style={styles.box}>
            <Image source={icon.chats}
                resizeMode='contain'
                style={{height:40,width:40,}} />
                </TouchableOpacity>

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
    box:{

        borderWidth:1,
        borderColor:'#fff',
        borderRadius:10,
        height:40,width:40,
        alignItems:'center',
        justifyContent:'center',
        marginRight:5,
    },
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
