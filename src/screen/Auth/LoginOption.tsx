/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
    Text,
    View,
    Pressable,
    StyleSheet,
    StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { wp } from '../../component/utils/Constant';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Define navigation prop type
type RootStackParamList = {
    Login: { value: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginOption: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    // Function to handle login navigation







    return (
        <View style={styles.container}>
<StatusBar
backgroundColor={'#fff'}
/>
            <View style={styles.buttonContainer}>
                {/* COMPANY Login Button */}
                <Pressable onPress={() => signInHandler('company')} style={styles.loginButton}>
                    <Text style={styles.buttonText}>SHOP</Text>
                </Pressable>

                {/* USER Login Button */}
                <Pressable onPress={() => signInHandler('User')} style={styles.loginButton}>
                    <Text style={styles.buttonText}>USER</Text>
                </Pressable>
            </View>

        </View>
    );
};

export default LoginOption;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center', justifyContent: 'center'
    },
    innerContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 20,
        paddingTop: 0,
    },
    buttonContainer: {
        marginVertical: 20,
        width: wp(90),
        position: 'absolute',
        bottom: 10
    },
    loginButton: {
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4E95D6",
        borderRadius: 15,
        justifyContent: "center",
        width: "100%",
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        marginTop: 20, // Adds spacing between buttons
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
