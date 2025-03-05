import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    ViewToken,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import images from './Image';
import { color } from '../constant';
import { wp } from './utils/Constant';

const { width } = Dimensions.get('window');

interface Banner {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

interface BannerSliderProps {
    navigation: StackNavigationProp<any, any>;
}

// Demo Data (Replace API Call)
const demoBanners: Banner[] = [
    {
        id: '1',
        title: 'Get Special Offer',
        description: 'Up to 40%',
        imageUrl: images.banner,
    },
    {
        id: '2',
        title: 'Home Cleaning',
        description: 'Professional cleaning at your doorstep',
        imageUrl: images.banner,
    },
    {
        id: '3',
        title: 'Fitness Training',
        description: 'Stay fit with expert guidance',
        imageUrl: images.banner,
    },
];

const BannerSlider: React.FC<BannerSliderProps> = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<Banner>>(null);

    const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
        }
    };

    const renderItem = ({ item }: { item: Banner }) => (
        <View style={styles.bannerContainer}>
            <Image source={images.banner}
                resizeMode='cover'
                style={styles.bannerImage} />
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('ServiceDetails', { id: item.id })}
                    >
                        <Text style={styles.buttonText}>BOOK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={demoBanners}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            />
            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {demoBanners.map((_, index) => (
                    <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    bannerContainer: {
        width: width * 0.9,
        height: 180,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: color.baground,
        position: 'relative',
        marginHorizontal: 10,
    },
    bannerImage: {
        width: wp(100),
        height: '100%',
        borderRadius: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    textContainer: {
        position: 'absolute',
        left: 15,
        bottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#ddd',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#0063FF',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        width:wp(30),
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right:40
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#888',
        marginHorizontal:2,
    },
    activeDot: {
        backgroundColor: '#fff',
        width:15,
    },
});

export default BannerSlider;
