
    import React, { useState } from 'react';
    import {
      View,
      TextInput,
      StyleSheet,
      FlatList,
      Image,
      Text,
      TouchableOpacity,
    } from 'react-native';
    import MapView, { Polygon, Marker } from 'react-native-maps';
import SearchBar from '../../component/SearchBar';
import Icon from '../../component/Icon';
import images, { icon } from '../../component/Image';
import { wp } from '../../component/utils/Constant';
    
    const Explore: React.FC = () => {
      const [region, setRegion] = useState({
        latitude: 40.716,
        longitude: -74.008,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    
      const [polygonCoords, setPolygonCoords] = useState([
        { latitude: 40.715, longitude: -74.01 },
        { latitude: 40.717, longitude: -74.005 },
        { latitude: 40.712, longitude: -74.002 },
        { latitude: 40.708, longitude: -74.005 },
        { latitude: 40.71, longitude: -74.01 },
      ]);
    
      const carCenters = [
        {
          id: '1',
          name: 'Car Center',
          image: images.tyer,
          distance: '1.2 KM',
          address:'0993 Novick Parkway',
          rating: 4.3,
          price: '7.0-$21.0',
          latitude: 40.713,
          longitude: -74.007,
        },
        {
          id: '2',
          name: 'Car Center',
          address:'0993 Novick Parkway',
          image:images.tyer,
          distance: '1.5 KM',
          rating: 4.5,
          price: '7.0-$21.0',
          latitude: 40.716,
          longitude: -74.008,
        },
      ];
    
      return (
        <View style={styles.container}>
          {/* Map */}
          <MapView style={styles.map} region={region}>
            {/* Polygon Drawn Area */}
            <Polygon
              coordinates={polygonCoords}
              strokeColor="blue"
              fillColor="rgba(0, 0, 255, 0.2)"
              strokeWidth={2}
            />
    
            {/* Center Marker */}
            <Marker coordinate={polygonCoords[0]} title="Center" pinColor="blue" >
            <Image source={icon.pin}  style={{height:20,width:20,tintColor:'green'}}/>
            </Marker>
    
            {/* Car Center Markers */}
            {carCenters.map((center) => (
              <Marker
                key={center.id}
                coordinate={{ latitude: center.latitude, longitude: center.longitude }}
                title={center.name}
              >
                <Image source={icon.pin}  style={{height:15,width:15}}/>
              </Marker>
            ))}
          </MapView>
    
          {/* Search Bar */}
          <View style={styles.searchContainer}>
        
          <SearchBar placeholder='Search' />


          </View>
          <View style={styles.listContainer}>
          <FlatList
            data={carCenters}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={{
                    position:'absolute',
                    top:15,
                    right:20
                }}>
                <Icon source={images.Tag} size={25}  />
                </View>
                <View style={styles.cardInfo}>
                    <View style={{flexDirection:'row',width:'95%',justifyContent:'space-between'}}>

          
                    <View>

                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={{fontSize:12,fontWeight:'400'}}>{item.address}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>


          
                  <View style={styles.ratingContainer}>
                  <Icon source={icon.pin} size={25}  />
                  <Text style={styles.cardDistance}>{item.distance}</Text>
                  </View>
                  <View style={[styles.ratingContainer,{marginLeft:10}]}>
                    <Icon source={icon.star} size={25}  />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  </View>
                  </View>
                  <Text style={styles.cardPrice}>{item.price}/<Text style={{fontWeight:'400',fontSize:12,color:'grey'}}>Services </Text></Text>
                </View>
              </TouchableOpacity>
            )}
          />


          </View>
    
     
         
        </View>
      );
    };
    
    // Styles
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      map: {
       flex:1
      },
      listContainer:
      {
        position: 'absolute',
        bottom:10,
        left: 20,
        right: 20,
       
       
        
      },
      searchContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
       
       
        
      },
      searchInput: {
        flex: 1,
        height: 40,
      },
      card: {
        width:wp(70),
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
        elevation: 3,
      },
      cardImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
      },
      cardInfo: {
        marginTop: 5,
      },
      cardTitle: {
        fontWeight: 'bold',
        fontSize:18,
      },
      cardDistance: {
        fontSize: 12,
        color: 'gray',
        fontWeight:'600'
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      ratingText: {
        marginLeft: 5,
      },
      cardPrice: {
        fontWeight: '800',
        fontSize: 16,
        color: 'blue',
      },
    });
    
    export default Explore;
    