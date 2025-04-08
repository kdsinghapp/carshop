import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../constant';
import images from '../../component/Image';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentLocation, locationPermission } from '../../component/helperFunction';
import { useLocation } from '../../component/LocationContext';

// Define the navigation type
type RootStackParamList = {
    Home: undefined; // Change 'Home' to your actual destination screen name
};

const Splash: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { locationName, setLocationName } = useLocation();
  
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

    useEffect(() => {



        const fetchLocationData = async () => {
            try {
                const locPermission = await locationPermission();
                if (locPermission !== 'granted') {
                    console.log('Location permission denied');
                    return;
                }
    
                // Get current location
                const { latitude, longitude } = await getCurrentLocation();
    
    
    
                // Fetch geocode
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyADzwSBu_YTmqWZj7ys5kp5UcFDG9FQPVY`;
    
    
                const res = await fetch(url);
                const json = await res.json();
    
                if (json.status === 'OK' && json.results.length) {
    
    
                    const city = findCityName(json);
                  
                    setLocationName(city);
                    
                }
     
    
            } catch (error) {
                console.log("Error fetching location:", error);
            }
        };
    
        fetchLocationData();
    }, []); 
    function findCityName(response) {
        const results = response.results;
        for (let i = 0; i < results.length; i++) {
            const addressComponents = results[i].address_components;
            console.log('====================addressComponents================',addressComponents);
      
            for (let j = 0; j < addressComponents.length; j++) {
                const types = addressComponents[j].types;
                if (types.includes('locality') || types.includes('administrative_area_level_2')) {
                    return addressComponents[j].long_name; // Return the city name
                }
            }
        }
        return null; // Return null if city name not found
      }
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
