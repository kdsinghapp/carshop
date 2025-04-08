import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    Platform,
    Image,
    PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDistance } from 'geolib';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { icon } from './Image';
import GooglePlacesInput from './AutoAddress';
import { useLocation } from './LocationContext';
import CustomHeader from './CustomHeaderProps';



const GOOGLE_PLACES_API_KEY = 'AIzaSyCPO3jjHmxtN44lSqdaB278knxRvijkSR0' // Replace with your actual API key

const SelectLocation = () => {
    const [location, setLocation] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [recentLocations, setRecentLocations] = useState([]);
    const [currentCoords, setCurrentCoords] = useState(null);
    const { setLocationName } = useLocation(); // Get the setLocationName function from context
    const navigation = useNavigation();

    const isFocus = useIsFocused()



    useEffect(() => {
        const loadSavedAddresses = async () => {
            try {
                const saved = await AsyncStorage.getItem('savedAddresses');
                if (saved) {
                    setSavedAddresses(JSON.parse(saved));
                }
            } catch (error) {
                console.log('Error loading saved addresses:', error);
            }
        };

        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
            return true;
        };

        const getCurrentLocation = async () => {
            const hasPermission = await requestLocationPermission();
         console.log('================getCurrentLocation====================');


            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });

                    console.log('==========latitude, longitude ==========================');
                    console.log(latitude, longitude);

                    setCurrentCoords({ latitude, longitude });
                    fetchNearbyLocations(latitude, longitude);
                },
                error => {
                    console.log('Error getting current location:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                }
            );
        };

        loadSavedAddresses();
        getCurrentLocation();
    }, []);

    const fetchNearbyLocations = async (latitude, longitude) => {
        console.log('===========fetchNearbyLocations=========================');
        console.log(latitude, longitude);

        try {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&key=${GOOGLE_PLACES_API_KEY}`;
            console.log('Fetching URL:', url);

            const response = await fetch(url);
            const data = await response.json();

            if (data.error_message) {
                console.error('Google Places API Error:', data.error_message);
                return;
            }

            setNearbyLocations(data.results);

        } catch (error) {
            console.error('Fetch Nearby Locations Error:', error);
        }
    };


    const handleSaveAddress = useCallback(
        async (address) => {
            // Check if the address already exists in savedAddresses
            const existingAddress = savedAddresses.find(item => item.place_id === address.place_id);
            if (existingAddress) {
                errorToast('This address is already saved.');
                setLocationName(address?.name); // Set the location name in context
                navigation.goBack();
                return;
            }

            const updatedAddresses = [...savedAddresses, address];
            setSavedAddresses(updatedAddresses);
            await AsyncStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));

            setLocationName(address?.name); // Set the location name in context
            navigation.goBack();
        },
        [savedAddresses, setLocationName, navigation]
    );

    const handleSelectLocation = useCallback(
        async (details) => {
            const { lat, lng } = details.geometry.location;

            setLocation({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            const recent = [...recentLocations, details];
            setRecentLocations(recent);
            handleSaveAddress(details); // Save the selected address
            setLocationName(details.name); // Set the location name in context
            await AsyncStorage.setItem('Locations', details.name)
            await AsyncStorage.setItem('LocationsLat', JSON.stringify({ lat: lat, lng: lng }))
            navigation.goBack();
        },
        []
    );

    const renderLocationItem = useCallback(({ item }) => {
        const distance = currentCoords
            ? getDistance(currentCoords, {
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
            })
            : 0;

        const formattedDistance = distance < 1000
            ? `${distance} m`
            : `${(distance / 1000).toFixed(2)} km`;

        return (
            <TouchableOpacity
                onPress={() => handleSaveAddress(item)}
                style={styles.locationItem}
            >
                <View>
                    <Image source={icon.pin} style={{ height: 15, width: 15, }} />
                    <Text style={{ fontSize: 10, color: '#000', marginTop: 5 }}>{formattedDistance}</Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.locationName}>{item.name}</Text>
                    <Text style={styles.locationAddress}>{item.vicinity}</Text>
                </View>
            </TouchableOpacity>
        );
    }, [currentCoords]);



    return (

        <View style={styles.container}>

            <CustomHeader navigation={navigation} title="Select Location"
                onSkipPress={() => { }} showSkip={false} style={{ marginTop: 25 }} />


            <View style={{
                width: '100%', marginTop: 10,
        

            }}>
                <GooglePlacesInput placeholder={'search location'}
                    onPlaceSelected={handleSelectLocation} />
            </View>


            <View style={styles.nearbyContainer}>
                <Text style={[styles.sectionTitle, {
                    fontSize: 16, color: '#000',
                    fontWeight: '700', fontFamily: 'Federo-Regular',
                }]}>Near Location</Text>
                {nearbyLocations && <FlatList
                showsVerticalScrollIndicator={false}
                    data={nearbyLocations} // Show only the first 3 nearby locations
                    renderItem={renderLocationItem}
                    keyExtractor={(item, index) => index.toString()}
                />}
                {nearbyLocations == null &&
                    <ActivityIndicator size={20} />

                }
            </View>
            <TouchableOpacity
                style={styles.currentLocationButton}
                onPress={async () => {
                    const hasPermission = await requestLocationPermission();
                    if (!hasPermission) {
                        console.log('Location permission not granted');
                        return;
                    }

                    Geolocation.getCurrentPosition(
                        position => {
                            const { latitude, longitude } = position.coords;

                            try {
                              

                                setLocation({
                                    latitude,
                                    longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                });

                                setCurrentCoords({ latitude, longitude });

                                if (typeof fetchNearbyLocations === 'function') {
                                    fetchNearbyLocations(latitude, longitude);
                                }

                            } catch (error) {
                                console.log('Error inside position callback:', error);
                            }
                        },
                        error => {
                            console.log('Geolocation error:', error);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: 10000,
                        }
                    );
                }}
            >
                <Image
                    source={icon.pin}
                    style={{ height: 20, width: 20, tintColor: '#fff' }}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#fff',
    },
    savedContainer: {
        marginVertical: 10,

    },
    nearbyContainer: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '400',
        marginHorizontal: 15,
        color: '#000',
        marginVertical: 10,
        fontFamily: 'Federo-Regular',
    },
    locationItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationAddress: {
        fontSize: 14,
        color: '#555',
    },
    currentLocationButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#0063FF',
        borderRadius: 30,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SelectLocation;
