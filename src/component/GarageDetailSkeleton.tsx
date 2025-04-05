import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';

const { width } = Dimensions.get('window');

const GarageDetailSkeleton = () => {
    return (
        <View style={styles.container}>
            <Skeleton
                isLoading
                layout={[
                    { key: 'image', width, height: 300, marginBottom: 20, marginTop: -200 },
                    {
                        key: 'title', width: width * 0.8, height: 24, alignSelf: 'flex-start',
                        marginBottom: 10
                    },
                    {
                        key: 'address', width: width * 0.5, height: 14, marginBottom: 5,
                        alignSelf: 'flex-start'

                    },
                    { key: 'rating', alignSelf: 'flex-start', width: width * 0.5, height: 14, marginBottom: 20, alignSelf: 'flex-start' },
                    { key: 'actions', alignSelf: 'flex-start', width, height: 60, marginBottom: 20 },
                    { key: 'tabs', alignSelf: 'flex-start', width, height: 40, marginBottom: 20 },
                    { key: 'p1', alignSelf: 'flex-start', width: width * 0.9, height: 12, marginBottom: 6 },
                    { key: 'p2', alignSelf: 'flex-start', width: width * 0.85, height: 12, marginBottom: 6 },
                    { key: 'p3', alignSelf: 'flex-start', width: width * 0.7, height: 12, marginBottom: 20 },
                    { key: 'working-title', alignSelf: 'flex-start', width: width * 0.4, height: 20, marginBottom: 10 },
                    { key: 'work1', alignSelf: 'flex-start', width: width * 0.9, height: 14, marginBottom: 6 },
                    { key: 'work2', alignSelf: 'flex-start', width: width * 0.9, height: 14, marginBottom: 20 },
                
                
                ]}
            />
        </View>
    );
};

export default GarageDetailSkeleton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
