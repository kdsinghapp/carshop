
import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    Alert,
    ToastAndroid,
} from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import SearchBar from '../../component/SearchBar';
import Icon from '../../component/Icon';
import images, { icon } from '../../component/Image';
import { hp, wp } from '../../component/utils/Constant';
import { getbookmarkslist, removebookmark } from '../../redux/Api/apiRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from 'react-native-reanimated-skeleton';
import { width } from '../../component/Constant';
import { useFocusEffect } from '@react-navigation/native';

interface CarCenter {
    id: number;
    user_id: number;
    car_service_store_id: number;
    created_at: string;
    updated_at: string;
    store_detail: StoreDetail;
}

interface StoreDetail {
    id: number;
    name: string;
    description: string;
    name_no: string | null;
    description_no: string | null;
    street: string;
    city_id: number;
    zip_code: string;
    latitude: string;
    longitude: string;
    phone: string;
    email: string;
    whatsapp: string;
    rating: string;
    total_reviews: number;
    profile_image: string;
    logo: string;
    monday_open: string;
    monday_close: string;
    tuesday_open: string;
    tuesday_close: string;
    wednesday_open: string;
    wednesday_close: string;
    thursday_open: string;
    thursday_close: string;
    friday_open: string;
    friday_close: string;
    saturday_open: string;
    saturday_close: string;
    sunday_open: string;
    sunday_close: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status: string;
    address: string;
    distance: number;
    available_services: AvailableService[];
}

interface AvailableService {
    id: number;
    car_service_store_id: number;
    car_service_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status: string;
    price: number;
    duration: string;
}

const Bookmark: React.FC = () => {
    const [User, setUser] = useState('');
    const [store, setStore] = useState<CarCenter | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState('');
    const [filteredStore, setFilteredStore] = useState<CarCenter[]>([]);
    useEffect(() => {
        if (store) {
            const filtered = store?.filter(item =>
                item.store_detail.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredStore(filtered);
        }
    }, [store, searchText]);
    useEffect(() => {

        const getUser = async () => {
            const data = await AsyncStorage.getItem('user');
            const user = JSON.parse(data);
         
            setUser(user)
        }
        getUser()
    }, [])
    useFocusEffect(
        useCallback(() => {
            if (User) {
                bookmarkslist();
            }
        }, [User])
    );

    const bookmarkslist = async () => {
        setLoading(true)

        const res = await getbookmarkslist(User?.id, '22.7552', '75.8968')
        if (res.success) {
            setLoading(false)
            setStore(res?.data)
        }
        else {
            setStore([])
            setLoading(false)
        }

    }

    const deletebookmark = async (id: string) => {

        const res = await removebookmark(id)
        if (res.success) {
        await bookmarkslist()
            ToastAndroid.show('Store removed from bookmarks successfully!', ToastAndroid.SHORT);

        }

    }
    return (
        <View style={{
            backgroundColor: '#fff', flex: 1
        }}>
            <View style={{
                marginTop: 40, alignItems: 'center',
                justifyContent: 'center', borderWidth: 1, borderColor: '#fff',
            }}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: '800' }}>Bookmark</Text>
            </View>
            {loading ? (
                <View style={{ flex: 1, marginTop: hp(5) }}>

                    <Skeleton
                        isLoading={loading}
                        containerStyle={{ width: '100%', paddingHorizontal: 16 }}
                        layout={Array.from({ length: 3 }).flatMap((_, index) => [
                            // Main card container (you can wrap this with a View if needed)
                            {
                                key: 'search-bar',
                                width: width - 32,
                                height: 40,
                                borderRadius: 10,
                                marginBottom: 20,
                            },
                            {
                                key: `card-${index}-image`,
                                width: 100,
                                height: 100,
                                borderRadius: 8,
                                marginTop: index === 0 ? 10 : 20,
                            },
                            {
                                key: `card-${index}-title`,
                                width: '60%',
                                height: 20,
                                marginTop: 10,
                            },
                            {
                                key: `card-${index}-address`,
                                width: '80%',
                                height: 15,
                                marginTop: 6,
                            },


                            {
                                key: `card-${index}-icon`,
                                width: 24,
                                height: 24,
                                position: 'absolute',
                                top: 60,
                                right: 10,
                            },
                        ])}
                    />
                </View>
            ) : (
                <View style={styles.container}>



                    <View style={styles.searchContainer}>

                        <SearchBar placeholder='Search' value={searchText}
                            onChangeText={setSearchText} />


                    </View>
                    <View style={styles.listContainer}>
                        {filteredStore?.length > 0 ? <FlatList
                            data={filteredStore}

                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.card}>
                                    <Image source={{ uri: item.store_detail.profile_image }} style={styles.cardImage} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert(
                                                'Remove Bookmark',
                                                'Are you sure you want to remove this store from your bookmarks?',
                                                [
                                                    {
                                                        text: 'Cancel',
                                                        style: 'cancel',
                                                    },
                                                    {
                                                        text: 'Yes',
                                                        onPress: () => deletebookmark(item?.id),
                                                        style: 'destructive',
                                                    },
                                                ],
                                                { cancelable: true }
                                            );
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: 40,
                                            right: 20
                                        }}>
                                        <Icon source={images.Tag} size={25} />
                                    </TouchableOpacity>
                                    <View style={styles.cardInfo}>

                                        <View>

                                            <Text style={styles.cardTitle}>{item.store_detail.name}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: '400' }}>{item.store_detail.address}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: 5,
                                            justifyContent: 'space-between'
                                        }}>



                                            <View style={styles.ratingContainer}>
                                                <Icon source={icon.pin} size={15} />
                                                <Text style={styles.cardDistance}>
                                                    {item.store_detail.distance ? `${item.store_detail.distance.toFixed(1)} km` : ''}
                                                </Text>
                                            </View>
                                            <View style={[styles.ratingContainer, { marginLeft: 10 }]}>
                                                <Icon source={icon.star} size={15} />
                                                <Text style={styles.ratingText}>{item.store_detail.rating}</Text>
                                            </View>
                                        </View>

                                        <Text style={styles.cardPrice}>{item.store_detail.price}/<Text style={{ fontWeight: '400', fontSize: 12, color: 'grey' }}>Services </Text></Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        /> :

                            <View style={{
                                height: 50, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: '#000', fontWeight: '600'
                                }}>No Store Bookmark</Text>
                            </View>
                        }


                    </View>



                </View>
            )}
        </View>

    );
};

// Styles
const styles = StyleSheet.create({
    Skeletoncard: {
        width: width - 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        padding: 10,
        alignItems: 'flex-start',
        position: 'relative',
        height: hp(15)

    },
    Skeletonimage: {
        width: 90,
        height: 90,
        borderRadius: 10,

    },
    SkeletoninfoContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',

    },
    Skeletontitle: {
        width: 120,
        height: 16,
        borderRadius: 6,
        marginBottom: 8,

    },
    Skeletonaddress: {
        width: 150,
        height: 12,
        borderRadius: 6,
        marginBottom: 8,

    },
    Skeletonrow: {
        flexDirection: 'row',
        marginBottom: 8,

    },
    SkeletonsmallBox: {
        width: 60,
        height: 10,
        borderRadius: 5,
        marginRight: 10,

    },
    Skeletonprice: {
        width: 100,
        height: 14,
        borderRadius: 5,

    },
    Skeletonicon: {
        width: 25,
        height: 25,
        borderRadius: 6,
        position: 'absolute',
        top: 15,
        right: 15,

    },

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
