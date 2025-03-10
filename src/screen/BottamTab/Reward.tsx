
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import CustomHeader from '../../component/CustomHeaderProps';
import { color } from '../../constant';
import VerticalshopList from '../../component/VerticalshopList';
import images, { icon } from '../../component/Image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BookingList from '../../component/BookingList';
import SearchBar from '../../component/SearchBar';
import Icon from '../../component/Icon';
import ScratchCardList from '../../component/ScratchCardList';

// Define navigation type
type RootStackParamList = {
    NearByShops: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'NearByShops'>;

// Define Shop Item type
interface ShopItem {


    amount: any;
    id: number;
}

const Reward: React.FC<Props> = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <View style={styles.container}>
            <CustomHeader
                title='Redeem'
                navigation={navigation}
            />
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>


                <View>

                    <ScratchCardList data={shopList} navigation={navigation} />
                </View>

            </ScrollView>
        </View>
    );
};

export default Reward;

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
const shopList: ShopItem[] = [
    {


        amount: null,

        id: 3

    }
    ,
    {

        amount: 100,

        id: 2
    },
    {

        amount: null,

        id: 1
    },

];
