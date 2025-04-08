// AddressAutocomplete.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressAutocomplete = ({
    setMarkerPosition,
    setRegion,
    setAddress,
    setLocationName,
    sendLocation,
    onFocus,
    onBlur,
    address
}) => {
    const handlePlaceSelect = (data, details = null) => {
        if (details) {
            const { lat, lng } = details.geometry.location;

            const position = {
                latitude: lat,
                longitude: lng,
            };

            setMarkerPosition?.(position);
            setRegion?.((prevRegion) => ({
                ...prevRegion,
                latitude: lat,
                longitude: lng,
            }));
            setAddress?.(details.formatted_address);
            setLocationName?.(details.formatted_address);
            sendLocation?.(position);
        }
    };

    return (
        <GooglePlacesAutocomplete
        placeholder={address ? address : "Enter your location"} 
            fetchDetails={true}
            onPress={handlePlaceSelect}
            textInputProps={{
                placeholderTextColor: '#000',
                onFocus: onFocus,
                onBlur: onBlur,
                value: address,
                onChangeText: (text) => setAddress?.(text),
            }}
            enablePoweredByContainer={false}
            query={{
                key: 'AIzaSyCPO3jjHmxtN44lSqdaB278knxRvijkSR0', // Make sure to keep this secure
                language: 'en',
            }}
            styles={autocompleteStyles}
            listViewDisplayed="auto"
        />
    );
};

const autocompleteStyles = StyleSheet.create({
    description: {
        fontWeight: 'bold',
        color: 'black',
        width: '100%',
    },
    textInput: {
        fontSize: 13,
        color: '#000',
        height: 48,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: '#ccc',
    },
    container: {
        position: 'absolute',
        width: '90%',
        top: 120,
        alignSelf: 'center',
        zIndex: 2,
    },
    listView: {
        backgroundColor: 'white',
        zIndex: 3,
    },
});

export default AddressAutocomplete;
