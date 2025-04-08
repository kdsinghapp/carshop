import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, Image, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { icon } from '../../component/Image';
import AddressAutocomplete from './AddressAutocomplete';
import { hp, wp } from '../../component/Constant';
import Icon from '../../component/Icon';
import { addaddress } from '../../redux/Api/apiRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
const MapPickerModal2 = ({ sendLocation, modalVisible, setModalVisible, setLocationName }) => {
    const [region, setRegion] = useState({
        latitude: 22.6845605,
        longitude: 75.8618508,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });
    const [address, setAddress] = useState('');
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 22.6845605,
        longitude: 75.8618508,
    });
    const [pickupPoints, setPickupPoints] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [User, setUser] = useState('');
    const addressTypes = [
        { label: 'Home', value: 'Home' },
        { label: 'Work', value: 'Work' },
        { label: 'Other', value: 'Other' },
        { label: 'Favorite', value: 'Favorite' }, // 👈 New option
    ];
    useEffect(() => {

        const getUser = async () => {
            const data = await AsyncStorage.getItem('user');
            const user = JSON.parse(data);
            console.log('==========================user==========');
            console.log(user);
            console.log('====================================');
            setUser(user)
        }
        getUser()
    }, [])
    const fetchPickupPoints = async () => {
        try {
            const response = await fetch("https://panel.dkyss.es/api/get-pickup-points-near-by", {
                method: "POST",
                redirect: "follow",
            });
            const result = await response.json();
            if (result.status === 1) {
                setPickupPoints(result.data);
            } else {
                Alert.alert("Error", "Failed to fetch pickup points.");
            }
        } catch (error) {
            console.error("Error fetching pickup points:", error);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMarkerPosition({ latitude, longitude });
                setRegion({
                    ...region,
                    latitude,
                    longitude,
                });
                sendLocation({ latitude, longitude });
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    useEffect(() => {
        getCurrentLocation();
        fetchPickupPoints();
    }, []);



    const handleConfirmLocation = async() => {
        if (!markerPosition.latitude || !markerPosition.longitude) {
            Alert.alert("Select a location", "Please select a location before confirming.");
            return;
        }
    
        if (!address?.trim()) {
            Alert.alert("Enter address", "Please search and select a valid address.");
            return;
        }
    
        if (!value) {
            Alert.alert("Select address type", "Please select an address type before confirming.");
            return;
        }

        const res = await addaddress(
            User?.id,
            value,
            address,
            markerPosition?.latitude,
            markerPosition?.longitude,
            0
        );
    
  
   if(res?.success){

    ToastAndroid.show('Address Add Successfully', ToastAndroid.SHORT);
   }
   else{
    ToastAndroid.show('Address Add Failure', ToastAndroid.SHORT);
   }
    
        // Optional: Close modal if needed
        setModalVisible(false);
    };
    
    const reverseGeocode = async (latitude, longitude, setAddress, setLocationName) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCPO3jjHmxtN44lSqdaB278knxRvijkSR0`
            );
            const data = await response.json();
            if (data.status === 'OK') {
                const formattedAddress = data.results[0].formatted_address;
                setAddress(formattedAddress);
                setLocationName(formattedAddress);
            } else {
                console.log('Geocoding failed:', data.status);
            }
        } catch (error) {
            console.log('Reverse geocoding error:', error);
        }
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
              
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#0063FF' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={addressTypes}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select address type' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
                  <AddressAutocomplete
                    address={address}
                    setMarkerPosition={(position) => {

                        sendLocation(position);
                        setMarkerPosition(position);
                        setRegion((prevRegion) => ({
                            ...prevRegion,
                            latitude: position.latitude,
                            longitude: position.longitude,
                        }));
                    }}
                    setRegion={setRegion}
                    setAddress={setAddress}
                    setLocationName={setLocationName}
                    sendLocation={sendLocation}
                    
                />
                <MapView
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                >
                    {/* User draggable marker */}
                    <Marker
                        coordinate={markerPosition}
                        draggable
                        onDragEnd={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            const position = { latitude, longitude }
                            sendLocation(position);
                            setMarkerPosition(position);
                            setRegion((prevRegion) => ({
                                ...prevRegion,
                                latitude: position.latitude,
                                longitude: position.longitude,
                            }));


                            setMarkerPosition({ latitude, longitude });
                            sendLocation({ latitude, longitude });
                            reverseGeocode(latitude, longitude, setAddress, setLocationName);
                        }}
                        title="Your Selected Location"
                    >
                        <View style={styles.markerContainer}>
                            <Image
                                source={icon.gps}
                                style={{ height: 30, width: 30 }}
                                resizeMode='contain'
                            />
                        </View>
                    </Marker>


                </MapView>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    position: 'absolute', top: 10, width: wp(95)
                }}>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Icon
                            source={icon.cancel}
                            size={30}
                            style={{
                                tintColor: '#fff'
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleConfirmLocation}
                    >
                        <Icon
                            source={icon.save}
                            size={20}
                            style={{
                                tintColor: '#fff'
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default MapPickerModal2;

const styles = StyleSheet.create({
    
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#000',
           fontWeight:'700'
      },
      dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width:wp(90),
        position:'absolute',
        top:hp(8),
        zIndex:22
      },
      placeholderStyle: {
        fontSize: 14,
        color: '#000',
        fontWeight:'700'
      },
      selectedTextStyle: {
        fontSize: 14,
        color: '#000',
           fontWeight:'700'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 14,
      },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    confirmButton: {
        backgroundColor: '#0063FF',

        height: 40, width: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center'

    },
    CancelButton: {
        backgroundColor: '#0063FF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 50,
        marginBottom: 30,
        elevation: 5,

    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
