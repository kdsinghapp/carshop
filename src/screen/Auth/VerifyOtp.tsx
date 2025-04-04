import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { color } from '../../constant';
import Icon from '../../component/Icon';
import images, { icon } from '../../component/Image';
import { hp, wp } from '../../component/utils/Constant';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

import Loading from '../../configs/Loader';
import { otp_Verify } from '../../redux/Api/apiRequests';

interface VerifyOtpProps {
    navigation: StackNavigationProp<any, any>;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ navigation }) => {
    const route = useRoute();
    const { email } = route.params;
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
   
    const [error, setError] = useState<string>('');
    const ref = useBlurOnFulfill({ value, cellCount: 6 });

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleSubmit = async () => {
        if (value.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }
        setLoading(true);
        setError('');
        
        try {
            const res = await otp_Verify(email, value);
            if (res?.success) {
                navigation.navigate(ScreenNameEnum.CREATE_PASSWORD,{token:res?.token});
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
        
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {loading && <Loading  />}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 15, marginTop: 0 }}>
                <Icon source={images.BackNavs2} size={40} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>Check your mail or check your cell phone</Text>
                <Text style={styles.subtitle}>Please enter the 6-digit OTP sent to you</Text>

                <View style={styles.codeContainer}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={6}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <View key={index} style={styles.cellContainer}>
                                <Text
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}
                                >
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <ImageBackground source={images.buble} style={styles.imageBg}>
                {loading ? (
                    <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                    <CustomButton
                        title="Submit"
                        onPress={handleSubmit}
                        buttonStyle={styles.button}
                    />
                )}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(10),
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: '500',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#9DB2BF',
        fontWeight: '400',
        marginTop: 5,
    },
    codeContainer: {
        height: hp(10),
        width: '80%',
        marginTop: hp(8),
        alignSelf: 'center',
    },
    cellContainer: {
        backgroundColor: '#c9c9c9',
        borderRadius: 15,
        marginRight: 5,
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#F7F8F8',
        textAlign: 'center',
        color: '#000',
        borderRadius: 10,
    },
    focusCell: {
        borderColor: '#0063FF',
        borderRadius: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
    imageBg: {
        height: hp(25),
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        padding: 20,
        alignItems: 'center',
    },
    button: {
        marginTop: 60,
        width: wp(80),
    },
});

export default VerifyOtp;
