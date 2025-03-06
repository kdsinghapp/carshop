import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '../../constant';
import { icon } from '../../component/Image';
import ProfileMenuList from '../../component/ProfileList';
import ScreenNameEnum from '../../routes/screenName.enum';
import LogoutModal from '../modal/LogoutModal';

// Define navigation type
type RootStackParamList = {
    Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

// Define type for Profile Menu Items
interface ProfileMenuItem {
    id: number;
    title: string;
    icon: any;
    screen: string;
}

const Profile: React.FC<Props> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <ProfileMenuList data={profileData} />
               
            </ScrollView>
        </View>
    );
};

export default Profile;

// Profile menu list data
const profileData: ProfileMenuItem[] = [
    {
        id: 1,
        title: 'Profile',
        icon: icon.EditProfile,
        screen: ScreenNameEnum.EDIT_PROFILE,
    },
    {
        id: 2,
        title: 'Manage Address',
        icon: icon.ManageAddress,
        screen: ScreenNameEnum.VEHICAL_SCREEN,
    },
    {
        id: 3,
        title: 'Change Password',
        icon: icon.ChangePassword,
        screen: ScreenNameEnum.NOTIFICATION_SETTING
    },
    {
        id: 4,
        title: 'Payment Methods',
        icon: icon.Payment,
        screen:ScreenNameEnum.ABOUT_SCREEN
    },
    {
        id: 4,
        title: 'My Booking',
        icon: icon.MyBooking,
        screen:ScreenNameEnum.ABOUT_SCREEN
    },
    {
        id: 4,
        title: 'My Wallet',
        icon: icon.Wallet,
        screen:ScreenNameEnum.ABOUT_SCREEN
    },{
        id: 4,
        title: 'Promo codes',
        icon: icon.PromoCode,
        screen:ScreenNameEnum.ABOUT_SCREEN
    },
    {
        id: 5,
        title: 'Help Center',
        icon: icon.HelpCenter,
        screen: ScreenNameEnum.PRIVACY_POLICY
    },
    {
        id: 5,
        title: 'Privacy Policy',
        icon: icon.PrivacyPolicy,
        screen: ScreenNameEnum.PRIVACY_POLICY
    },
    {
        id: 6,
        title: 'Logout',
        icon: icon.Logout,
        screen: 'Logout',
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
    },
    headerText: {
        fontWeight: '600',
        fontSize: 22,
        color: '#000',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    scrollContent: {
        marginTop:20,
    },
});
