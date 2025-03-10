
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

const CompanyProfile: React.FC<Props> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <ProfileMenuList data={profileData} />

            </ScrollView>
        </View>
    );
};

export default CompanyProfile;

// Profile menu list data
const profileData: ProfileMenuItem[] = [
    {
        id: 1,
        title: 'Profile',
        icon: icon.EditProfile,
        screen: ScreenNameEnum.ProfileScreen,
    },
    {
        id: 2,
        title: 'Notification',
        icon: icon.noti,
        screen: ScreenNameEnum.NotificationSetting,
    },

   
    {
        id: 3,
        title: 'Support',
        icon: icon.About2,
        screen: ScreenNameEnum.SupportScreen
    },
    {
        id: 4,
        title: 'About Us',
        icon: icon.iCon2,
        screen: ScreenNameEnum.Aboutus
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
        marginTop: 20,
    },
});
