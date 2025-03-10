import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { color } from '../../constant';
import CustomHeader from '../../component/CustomHeaderProps';
import CustomTextInput from '../../component/TextInput';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import { StackNavigationProp } from '@react-navigation/stack';
import { hp } from '../../component/utils/Constant';

interface ChangePasswordProps {
    navigation: StackNavigationProp<any, any>;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Error states
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Validation function
    const validateFields = () => {
        let newErrors = {
            currentPassword: currentPassword ? '' : 'Current Password is required',
            newPassword: newPassword ? '' : 'New Password is required',
            confirmPassword: confirmPassword ? '' : 'Confirm Password is required'
        };

        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = () => {
        if (validateFields()) {
            navigation.navigate(ScreenNameEnum.PROFILE_DETAILS);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <CustomHeader navigation={navigation} title="Change Password" showSkip={false} />
                <View style={styles.formContainer}>
                    <CustomTextInput
                        placeholder="Current Password"
                        onChangeText={setCurrentPassword}
                        value={currentPassword}
                        secureTextEntry
                        inputStyle={[styles.input, errors.currentPassword && styles.errorInput]}
                    />
                    {errors.currentPassword ? <Text style={styles.errorText}>{errors.currentPassword}</Text> : null}

                    <CustomTextInput
                        placeholder="New Password"
                        onChangeText={setNewPassword}
                        value={newPassword}
                        secureTextEntry
                        inputStyle={[styles.input, errors.newPassword && styles.errorInput]}
                    />
                    {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}

                    <CustomTextInput
                        placeholder="Confirm New Password"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        secureTextEntry
                        inputStyle={[styles.input, errors.confirmPassword && styles.errorInput]}
                    />
                    {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                </View>
            </SafeAreaView>

            <View style={styles.buttonContainer}>
                <CustomButton title="Save" onPress={handleSubmit} buttonStyle={styles.button} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
    },
    formContainer: {
        paddingHorizontal: 25,
        marginTop: hp(8),
    },
    input: {
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 15,
        padding: 10,
        color: '#000',
        marginTop: 15,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {},
});

export default ChangePassword;
