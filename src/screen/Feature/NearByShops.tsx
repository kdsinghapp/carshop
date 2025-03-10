import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../component/CustomHeaderProps';
import { color } from '../../constant';
import VerticalshopList from '../../component/VerticalshopList';
import images from '../../component/Image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../../component/CustomButton';

// Define navigation type
type RootStackParamList = {
    NearByShops: undefined;
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
    return (
        <View style={styles.container}>
            <CustomHeader navigation={navigation} title="Near By Shops" onSkipPress={() => { }} showSkip={false} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <VerticalshopList data={shopList} navigation={navigation} />
            </ScrollView>
            <CustomButton
                title='Price Guid'
                onPress={() => { }}
                buttonStyle={{ marginBottom: 10, marginHorizontal: 20 }}
            />
        </View>
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
});

// Sample shop list data
const shopList = [
    {
        name: 'Car Center',
        location: 'Grand Park New',
        distance: '2.5',
        logo: images.cd,
        price: '$100',
        rating: '4.5'
    },
    {
        name: 'Car wash',
        location: 'Grand Park New',
        distance: '2.5',
        logo: images.cd,
        price: '$100',
        rating: '4.5'
    },
]