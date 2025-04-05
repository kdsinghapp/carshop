import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../constant';
import images from '../../component/Image';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the navigation type
type RootStackParamList = {
    Home: undefined; // Change 'Home' to your actual destination screen name
};

const Splash: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const checkTokenAndNavigate = async () => {
            await new Promise(resolve => setTimeout(resolve, 4000)); // 4 seconds delay

            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    navigation.replace(ScreenNameEnum.BOTTAM_TAB);
                } else {
                    navigation.replace(ScreenNameEnum.LoginOption); // Replace with your login screen enum
                }
            } catch (error) {
                console.error("Error fetching token:", error);
                navigation.replace(ScreenNameEnum.LoginOption); // fallback on error
            }
        };

        checkTokenAndNavigate();
    }, [navigation]);

    
    return (
        <View style={styles.container}>
              <StatusBar
                backgroundColor={'#fff'}
            />
            <SafeAreaView>
                
                <Image source={images.logo} style={styles.logo} resizeMode="contain" />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height:200,
        width: 200,
    },
});

export default Splash;
