
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from '../../component/Icon';
import images from '../../component/Image';
import CustomButton from '../../component/CustomButton';
import { wp } from '../../component/utils/Constant';
import { getCurrentLocation, locationPermission } from '../../component/helperFunction';
import { useLocation } from '../../component/LocationContext';
import ScreenNameEnum from '../../routes/screenName.enum';

const Congratulation: React.FC = ({ navigation }) => {
    const { locationName, setLocationName } = useLocation();
    function getFormattedAddress(response) {
        if (response.status === "OK" && response.results.length > 0) {
            // Get the formatted address from the results
            return response.results[0].formatted_address;
        } else {
            return "Address not found";
        }
    }
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



                const city = getFormattedAddress(json);

                setLocationName(city);
                // _update_location(latitude, longitude);

            }


        } catch (error) {
            console.log("Error fetching location:", error);
        }
        navigation.navigate(ScreenNameEnum.LocationPicker)
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity

                style={{ position: 'absolute', top: 40, left: 20 }}
                onPress={() => navigation.goBack()}>
                <Icon source={images.BackNavs2} size={30} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <Icon source={images.checks} size={120} />
            </View>

            {/* Heading */}
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.subtitle}>Your Car Washing Service Booked. You can check your booking on the menu Profile.</Text>

            {/* Location Button */}
            <View style={{ position: 'absolute', bottom: 50, alignItems: 'center' }}>



                <CustomButton
                    title='View E-Receipt'
                    onPress={()=>{
                        navigation.navigate(ScreenNameEnum.BOTTAM_TAB)
                    }}
                    buttonStyle={{
                        width: wp(90)
                    }}
                />

                {/* Secondary Link */}
                <TouchableOpacity style={{ marginTop: 30 }}>
                    <Text style={styles.linkText}>View My Bookings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {

        borderRadius: 40,

        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#9DB2BF',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#0063FF',
        fontSize: 16,
        fontWeight: '600'

    },
});

export default Congratulation;
