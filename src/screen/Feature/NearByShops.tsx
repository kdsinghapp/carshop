import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import CustomHeader from '../../component/CustomHeaderProps';
import { color } from '../../constant';
import VerticalshopList from '../../component/VerticalshopList';
import images from '../../component/Image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getneaybycarservicestore } from '../../redux/Api/apiRequests';
import { useRoute } from '@react-navigation/native';
import HorizontalshopList from './HorizontalshopList';
import Skeleton from 'react-native-reanimated-skeleton';
import { wp } from '../../component/Constant';

// Define navigation type
type RootStackParamList = {
    NearByShops: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'NearByShops'>;

// Define Shop Item type
interface ShopItem {
    name: string;
    description: string;
    distance: string;
    rating: string;
    images: any;
}

const NearByShops: React.FC<Props> = ({ navigation }) => {
    const route = useRoute<any>();
    const { id } = route.params;

    const [NeayStore, setNeayStore] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        allservices();
    }, [id]);

    const allservices = async () => {
        setLoading(true);
        const res = await getneaybycarservicestore('22.7196', '75.8577', id);
        if (res.success) {
            setNeayStore(res?.data);
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={{flex:1}}>

 
        <View style={styles.container}>
            <CustomHeader navigation={navigation} title="Near By Shops" onSkipPress={() => { }} showSkip={false}  style={{marginTop:25}}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Ads Section */}
                <View>
                    <Text style={styles.sectionTitle}>Ads</Text>
                    {loading ? (
                        <Skeleton
                        isLoading={loading}
                        containerStyle={{ marginHorizontal: 15,flexDirection:'row' }}
                        layout={[
                            { key: 'ads1', width: '90%', height: 100, marginLeft: 10, borderRadius: 10 },
                            { key: 'ads2', width: '90%', height: 100, marginLeft: 10, borderRadius: 10 },
                        ]}
                    />
                        
                    ) : NeayStore?.ads?.length > 0 ? (
                        <HorizontalshopList data={NeayStore.ads} navigation={navigation} />
                    ) : (
                        <Text style={styles.emptyText}>No ads available</Text>
                    )}
                </View>

                {/* Store Section */}
                <View>
                    <Text style={styles.sectionTitle}>Store</Text>
                    {loading ? (
                        <Skeleton
                            isLoading={loading}
                            containerStyle={{ marginHorizontal: 15 }}
                            layout={[
                                { key: 'store1', width: '100%', height: 100, marginBottom: 10, borderRadius: 10 },
                                { key: 'store2', width: '100%', height: 100, marginBottom: 10, borderRadius: 10 },
                            ]}
                        />
                    ) : NeayStore?.stores?.length > 0 ? (
                        <VerticalshopList data={NeayStore.stores} navigation={navigation} />
                    ) : (
                        <Text style={styles.emptyText}>No store found</Text>
                    )}
                </View>
            </ScrollView>
        </View>
        </SafeAreaView>
    );
};

export default NearByShops;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
    },
    scrollContent: {
        marginTop: 30,
    },
    sectionTitle: {
        marginLeft: 15,
        marginVertical: 10,
        fontSize: 20,
        color: '#000',
        fontWeight: '700',
    },
    emptyText: {
        marginLeft: 15,
        fontSize: 16,
        color: 'gray',
        fontStyle: 'italic',
    },
});
