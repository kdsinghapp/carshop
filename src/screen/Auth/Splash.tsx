import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../constant';
import images from '../../component/Image';
import ScreenNameEnum from '../../routes/screenName.enum';

// Define the navigation type
type RootStackParamList = {
    Home: undefined; // Change 'Home' to your actual destination screen name
};

const Splash: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace(ScreenNameEnum.BOTTAM_TAB); // Navigate to the 'Home' screen
        }, 4000); // 3 seconds delay

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, [navigation]);

    
    return (
        <View style={styles.container}>
              <StatusBar
                backgroundColor={'#fff'}
            />
            <SafeAreaView>
                
                <Image source={images.logo} style={styles.logo} resizeMode="contain" />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height:200,
        width: 200,
    },
});

export default Splash;
