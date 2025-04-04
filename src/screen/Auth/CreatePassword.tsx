import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { color } from '../../constant';
import { hp, wp } from '../../component/utils/Constant';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createpassword } from '../../redux/Api/apiRequests';
import CustomButton from '../../component/CustomButton';
import CustomTextInput from '../../component/TextInput';
import { icon } from '../../component/Image';

const CreatePassword: React.FC = () => {
    const route = useRoute();
    const { token } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const validateFields = () => {
        let newErrors = {
            password: password ? '' : 'Password is required',
            confirmPassword: confirmPassword ? '' : 'Confirm Password is required',
        };

        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = async () => {
        console.log('==============handleSubmit======================');
 
        if (!validateFields()) return;
        
        const body = {
            password,
            password_confirmation: confirmPassword,
            token,
        };
        
        try {
            await createpassword(body);
            navigation.navigate('LOGIN_SCREEN');
        } catch (err) {
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar backgroundColor={color.baground} />
                <View style={styles.inputContainer}>
                    <Text style={styles.welcomeText}>Create New Password</Text>
                    <Text style={styles.labelText}>
                        Your new password must be different from previous used passwords.
                    </Text>
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                    <CustomTextInput
                        placeholder='Password'
                        onChangeText={setPassword}
                        value={password}
                        inputStyle={[styles.input, errors.password && styles.errorInput]}
                        firsticon={true}
                        lasticon={true}
                        icons={icon.lock}
                    />
                              <Text style={{
                        color:'red',fontSize:12,marginTop:5
                    }}>{errors.confirmPassword}</Text>
                    <CustomTextInput
                        placeholder='Confirm Password'
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        inputStyle={[styles.input, errors.confirmPassword && styles.errorInput]}
                        firsticon={true}
                        lasticon={true}
                        icons={icon.lock}
                    />
                    <Text style={{
                        color:'red',fontSize:12,marginTop:5
                    }}>{errors.confirmPassword}</Text>
                </View>
            </SafeAreaView>
            <CustomButton title='Save' onPress={handleSubmit} buttonStyle={styles.button} />
        </View>
    );
};

export default CreatePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        position: 'absolute',
        bottom: 20,
        width: wp(90),
        alignSelf: 'center',
    },
});