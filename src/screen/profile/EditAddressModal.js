import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, Image, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { icon } from '../../component/Image';
import AddressAutocomplete from './AddressAutocomplete';
import { hp, wp } from '../../component/Constant';
import Icon from '../../component/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { updateaddress } from '../../redux/Api/apiRequests'; // 👈 Make sure this exists

const EditAddressModal = ({ modalVisible, setModalVisible, addressData, setLocationName }) => {
    const [region, setRegion] = useState({
        latitude: parseFloat(addressData?.latitude),
        longitude: parseFloat(addressData?.longitude),
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });

    const [User, setUser] = useState('');
    const [address, setAddress] = useState('');
    const [markerPosition, setMarkerPosition] = useState({ latitude: 0, longitude: 0 });
    const [value, setValue] = useState(addressData?.title);
    const [isFocus, setIsFocus] = useState(false);

    const addressTypes = [
        { label: 'Home', value: 'Home' },
        { label: 'Work', value: 'Work' },
        { label: 'Other', value: 'Other' },
        { label: 'Favorite', value: 'Favorite' },
    ];





    useEffect(() => {
        const getUser = async () => {
            const data = await AsyncStorage.getItem('user');
            const user = JSON.parse(data);
            setUser(user);
        };

        if (addressData) {
            setMarkerPosition({
                latitude: parseFloat(addressData.latitude),
                longitude: parseFloat(addressData.longitude)
            });
          
            setValue(addressData.title);
            setRegion({
                latitude: parseFloat(addressData.latitude),
                longitude: parseFloat(addressData.longitude),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            });
            reverseGeocode(addressData.latitude,addressData.longitude)
        }

        getUser();
    }, [addressData]);

    const reverseGeocode = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCPO3jjHmxtN44lSqdaB278knxRvijkSR0`
            );
            const data = await response.json();
            if (data.status === 'OK') {
                const formattedAddress = data.results[0].formatted_address;
                console.log('======================formattedAddress==============');
                console.log(formattedAddress);
                console.log('====================================');
                setAddress(formattedAddress)
                setLocationName(formattedAddress);
            } else {
                console.log('Geocoding failed:', data.status);
            }
        } catch (error) {
            console.log('Reverse geocoding error:', error);
        }
    };

    const handleUpdateLocation = async () => {
       
        if (!value || !address || !markerPosition.latitude || !markerPosition.longitude) {
           
            ToastAndroid.show('Please fill all required fields.', ToastAndroid.SHORT);
            return 
        }

        const res = await updateaddress(
            User?.id,
            value,
            address,
            markerPosition.latitude,
            markerPosition.longitude,
            0,
            addressData.id,
        );

        if (res?.success) {
            ToastAndroid.show('Address updated successfully', ToastAndroid.SHORT);
            setModalVisible(false);
        } else {
            ToastAndroid.show('Failed to update address', ToastAndroid.SHORT);
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
                    data={addressTypes}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select address type' : '...'}
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
                        setMarkerPosition(position);
                        setRegion((prevRegion) => ({
                            ...prevRegion,
                            latitude: position.latitude,
                            longitude: position.longitude,
                        }));
                    }}
                    setRegion={setRegion}
                    setAddress={(txt)=>{ console.log('==========txt==========================',txt);
             ; }}
                    setLocationName={setLocationName}
                />

                <MapView
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                >
                    <Marker
                        coordinate={markerPosition}
                        draggable
                        onDragEnd={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            const position = { latitude, longitude };
                            setMarkerPosition(position);
                            reverseGeocode(latitude, longitude);
                        }}
                    >
                        <View style={styles.markerContainer}>
                            <Image source={icon.gps} style={{ height: 30, width: 30 }} resizeMode='contain' />
                        </View>
                    </Marker>
                </MapView>

                <View style={styles.topControls}>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
                        <Icon source={icon.cancel} size={30} style={{ tintColor: '#fff' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleUpdateLocation}>
                        <Icon source={icon.save} size={20} style={{ tintColor: '#fff' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EditAddressModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width: wp(90),
        position: 'absolute',
        top: hp(8),
        zIndex: 22,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#000',
        fontWeight: '700',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#000',
        fontWeight: '700',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButton: {
        backgroundColor: '#0063FF',
        height: 40,
        width: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 10,
        width: wp(95),
    },
});
