import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from './Icon';
import images, { icon } from './Image';
import { color } from '../constant';

interface CustomHeaderProps {
    navigation: StackNavigationProp<any, any>;
    title: string;
    style:any;
    seconfImg:boolean;
    showSkip?: boolean; // Default is false
    onSkipPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ navigation, title,seconfImg, showSkip = false, onSkipPress,style }) => {
    return (
        <SafeAreaView>
        <View style={[styles.container,style]}>

            {/* Back Button */}
            <TouchableOpacity
            
            onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon source={seconfImg?images.BackNavs1:images.BackNavs2} size={30} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Skip Button (conditionally displayed) */}
            {showSkip? (
                <TouchableOpacity onPress={onSkipPress} style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            ):
            (
                <View style={styles.skipButton}>
                    <Text style={styles.skipText}></Text>
                </View>
            )}
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:5,
        paddingVertical:0,
        backgroundColor:'#fff',
        paddingBottom:10
        
    },
    backButton: {
        padding: 10,
    },
    title: {
        fontSize:20,
        fontWeight: '800',
        color: '#000',
    },
    skipButton: {
        padding: 10,
    },
    skipText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },
});

export default CustomHeader;
