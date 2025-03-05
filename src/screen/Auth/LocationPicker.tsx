import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CustomHeader from '../../component/CustomHeaderProps';
import { hp, wp } from '../../component/utils/Constant';
import Icon from '../../component/Icon';
import { icon } from '../../component/Image';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';

const LocationPicker: React.FC = ({ navigation }) => {
    const [location, setLocation] = useState<string>('Times Square NYC, Manhattan');
    const [region, setRegion] = useState({
        latitude: 40.758896, // Default: Times Square, NYC
        longitude: -73.985130,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const handleLocationPress = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setRegion({ ...region, latitude, longitude });
                setLocation('Current Location'); // Ideally, reverse geocode to get address
            },
            (error) => {
                console.log('Error fetching location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.container}>
            <View style={{
                height: hp(8), backgroundColor: '#fff',
                marginTop: 40,
                width: wp(100)
            }}>

                <CustomHeader title='Set Your Location' navigation={navigation} />
            </View>


            <MapView style={styles.map} region={region}>

                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>

            {/* Location Picker Box */}
            <View style={styles.bottomContainer}>
                <Text style={styles.label}>Location</Text>
                <View style={{ borderBottomWidth: 1, marginVertical: 10, borderColor: '#D7D7D7' }} />
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} value={location} editable={false} />
                    <TouchableOpacity onPress={handleLocationPress}>
                        <Icon size={20} source={icon.pin} />
                    </TouchableOpacity>
                </View>

                {/* Continue Button */}

                <CustomButton
                    onPress={() => {navigation.navigate(ScreenNameEnum.BOTTAM_TAB) }}
                    title='Continue'
                    buttonStyle={styles.button}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    bottomContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
       marginVertical:10,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#F7F8F8',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LocationPicker;
