import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
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

interface VerifyOtpProps {
    navigation: StackNavigationProp<any, any>;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ navigation }) => {
    const [value, setValue] = useState<string>('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 15, marginTop: 50 }}>
                <Icon source={images.BackNavs2} size={40} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>Check your mail or check your cell phone</Text>
                <Text style={styles.subtitle}>Please put the 4 digits sent to you</Text>

                <View style={styles.codeContainer}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={4}
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

                <View>
                    <Text style={styles.resendOtp}>RESEND OTP</Text>
                </View>
            </View>

            <ImageBackground source={images.buble} style={{ height: hp(25), position: 'absolute', bottom: 0, width: wp(100), padding: 20 }}>
                <CustomButton
                    title="Submit"
                    onPress={() => { navigation.navigate(ScreenNameEnum.CREATE_PASSWORD) }}
                    buttonStyle={styles.button}
                />
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
        paddingHorizontal: 25
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: '500',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        color: '#9DB2BF',
        fontWeight: '400',
        marginTop: 5,
    },
    codeContainer: {
        height: hp(10),
        width: '50%',
        marginTop: hp(8),
        alignSelf: 'center',
    },
    cellContainer: {
        backgroundColor: '#F7F8F8',
        borderRadius: 15,
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
    resendOtp: {
        fontSize: 14,
        color: color.white,
        borderBottomWidth: 0.8,
        borderColor: '#fff',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {

        marginTop: 60
    },
});

export default VerifyOtp;
