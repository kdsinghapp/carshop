
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

const Bookmark: React.FC = () => {

    const carCenters = [
        {
            id: '1',
            name: 'Car Center',
            image: images.tyer,
            distance: '1.2 KM',
            address: '0993 Novick Parkway',
            rating: 4.3,
            price: '7.0-$21.0',
            latitude: 40.713,
            longitude: -74.007,
        },
        {
            id: '2',
            name: 'Car Center',
            address: '0993 Novick Parkway',
            image: images.tyer,
            distance: '1.5 KM',
            rating: 4.5,
            price: '7.0-$21.0',
            latitude: 40.716,
            longitude: -74.008,
        },
    ];

    return (
        <View style={styles.container}>


            <View style={{
                marginTop: 40, alignItems: 'center',
                justifyContent: 'center', borderWidth: 1, borderColor: '#fff',
            }}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: '800' }}>Bookmark</Text>
            </View>
            <View style={styles.searchContainer}>

                <SearchBar placeholder='Search' />


            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={carCenters}

                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card}>
                            <Image source={item.image} style={styles.cardImage} />
                            <View style={{
                                position: 'absolute',
                                top: 40,
                                right: 20
                            }}>
                                <Icon source={images.Tag} size={25} />
                            </View>
                            <View style={styles.cardInfo}>

                                <View>

                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '400' }}>{item.address}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', 
                                    marginVertical:5,
                                    justifyContent: 'space-between' }}>



                                    <View style={styles.ratingContainer}>
                                        <Icon source={icon.pin} size={15} />
                                        <Text style={styles.cardDistance}>{item.distance}</Text>
                                    </View>
                                    <View style={[styles.ratingContainer, { marginLeft: 10 }]}>
                                        <Icon source={icon.star} size={15} />
                                        <Text style={styles.ratingText}>{item.rating}</Text>
                                    </View>
                                </View>

                                <Text style={styles.cardPrice}>{item.price}/<Text style={{ fontWeight: '400', fontSize: 12, color: 'grey' }}>Services </Text></Text>
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
        backgroundColor: '#fff'
    },
    map: {
        flex: 1
    },
    listContainer:
    {

        flex: 1,
        marginTop: 20



    },
    searchContainer: {
        marginHorizontal: 20,
        marginTop: 20



    },

    card: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
        elevation: 3,
        flexDirection: 'row',
        marginVertical: 5



    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    cardInfo: {
        marginTop: 5,
        marginLeft: 20,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    cardDistance: {
        fontSize: 12,
        color: 'gray',
        fontWeight: '600'
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

export default Bookmark;
