
import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView
} from 'react-native';
import images, { icon } from '../../component/Image';
import { color } from '../../constant';
import { hp, wp } from '../../component/utils/Constant';
import Icon from '../../component/Icon';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import CustomTextInput from '../../component/TextInput';
import { useNavigation } from '@react-navigation/native';

const CreatePassword: React.FC = ({  }) => {
    const [errors, setErrors] = useState({
        identity: '',
        password: '',
    });
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');

    const validateFields = () => {
        let newErrors = {
            identity: identity ? '' : 'Identity is required',
            password: password ? '' : 'Password is required',
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };
    const navigation =useNavigation()

    const handleSubmit = () => {
 
            navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
      
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar backgroundColor={color.baground} />

                <View style={styles.logoContainer}>

                </View>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <Text style={styles.welcomeText}>Create New Password</Text>
                    <Text style={styles.labelText}>Your new password must be different from previous used passwords.</Text>


                    <CustomTextInput
                        placeholder='Password'
                        onChangeText={setPassword}
                        value={password}
                        inputStyle={[styles.input, errors.password && styles.errorInput]}
                        firsticon={true}
                        lasticon={true}
                        icons={icon.lock}
                    />

                    <CustomTextInput
                        placeholder='Confirm Password'
                        onChangeText={setPassword}
                        value={password}
                        inputStyle={[styles.input, errors.password && styles.errorInput]}
                        firsticon={true}
                        lasticon={true}
                        icons={icon.lock}
                    />


                    {/* Login Button */}





                </View>


            </SafeAreaView>
            <CustomButton
                title="Save"
                onPress={handleSubmit}
                buttonStyle={styles.button}
            />
        </View>
    );
};

export default CreatePassword;

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(5),
    },
    logo: {
        height: 120,
        width: 120,
    },
    inputContainer: {
        paddingHorizontal: 25,
        marginTop: hp(5),
    },
    welcomeText: {
        fontWeight: '800',
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    labelText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#9DB2BF',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        padding: 10,
        color: '#000',
        marginBottom: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
    forgotPassword: {
        alignItems: 'center',
        marginVertical: 10,
    },
    forgotText: {
        color: '#0063FF',
        fontWeight: '600',
        borderBottomWidth: 0.5,
        borderColor: '#0063FF',
        paddingVertical: 2,
    },
    button: {
        marginTop: 20,
        position: 'absolute',
        bottom: 20,
        width: wp(90),
        alignSelf: 'center'
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    signupText: {
        color: '#909090',
    },
    signupLink: {
        color: '#0063FF',
        fontWeight: '800',
        fontSize: 16,
    },
    bubbleBackground: {
        height: hp(25),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    orText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        marginBottom: 10,
    },
    googleLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    googleText: {
        fontWeight: '500',
        fontSize: 18,
        marginLeft: 15,
    },
});
