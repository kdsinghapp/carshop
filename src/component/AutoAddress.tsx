import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const GooglePlacesInput = ({ placeholder, onPlaceSelected }) => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View
      style={{
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
      }}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={placeholder}
        onPress={(data, details = null) => {
          if (details) {
            try {
              onPlaceSelected(details);
            } catch (err) {
              console.log('Error handling place details:', err);
            }
          }
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            overflow: 'hidden',
          },
          textInput: {
            height: 50,
            fontFamily: 'Federo-Regular',
            fontSize: 13,
            color: '#000',
            paddingHorizontal: 10,
          },
          description: {
            fontWeight: 'bold',
            color: 'black',
          },
        }}
        textInputProps={{
          placeholderTextColor: '#000',
        }}
        query={{
          key: 'AIzaSyCPO3jjHmxtN44lSqdaB278knxRvijkSR0',
          language: 'en',
          components: 'country:no',
        }}
        enablePoweredByContainer={false}
      />
    </View>
  );
};

export default GooglePlacesInput;
