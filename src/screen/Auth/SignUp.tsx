import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from '../../component/Icon';
import { icon } from '../../component/Image';

const SignUp: React.FC = () => {
    const [selectedType, setSelectedType] = useState<'Private' | 'Company'>('Private');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        tradeNumber: '',
        accountingEmail: ''
    });

    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.logo}>LOGO</Text>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Fill your information below or register with your social account</Text>

                {/* Toggle Buttons */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, selectedType === 'Private' && styles.activeButton]}
                        onPress={() => setSelectedType('Private')}
                    >
                        <Text style={[styles.toggleText, selectedType === 'Private' && styles.activeText]}>Private</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, selectedType === 'Company' && styles.activeButton]}
                        onPress={() => setSelectedType('Company')}
                    >
                        <Text style={[styles.toggleText, selectedType === 'Company' && styles.activeText]}>Company</Text>
                    </TouchableOpacity>
                </View>

                {/* Input Fields */}
                {selectedType === 'Private' ? (
                    <>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.profile}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => handleInputChange('name', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.mobile}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Phone No." onChangeText={(text) => handleInputChange('phone', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.email}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Email Address" onChangeText={(text) => handleInputChange('email', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.building4}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="City" onChangeText={(text) => handleInputChange('city', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.lock}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => handleInputChange('password', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.lock}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={(text) => handleInputChange('confirmPassword', text)} />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.profile}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Company Name" onChangeText={(text) => handleInputChange('companyName', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.office}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Trade Number" onChangeText={(text) => handleInputChange('tradeNumber', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.email}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Accounting Email" onChangeText={(text) => handleInputChange('accountingEmail', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.mobile}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Phone No." onChangeText={(text) => handleInputChange('phone', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.lock}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => handleInputChange('password', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.lock}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />
                            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={(text) => handleInputChange('confirmPassword', text)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon source={icon.building4}
                                size={20}
                                style={{
                                    tintColor: 'grey'
                                }}

                            />

                            <TextInput style={styles.input} placeholder="City" onChangeText={(text) => handleInputChange('city', text)} />
                        </View>
                    </>
                )}

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Login Redirect */}
                <View style={styles.loginRedirect}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.loginLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F8F8',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 60,
        width: '100%',
        marginTop: 10
    },
    container: { flex: 1, backgroundColor: '#fff' },
    scrollView: { alignItems: 'center', padding: 20 },
    logo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    subtitle: { fontSize: 14, color: '#9DB2BF', textAlign: 'center', marginBottom: 20 },
    toggleContainer: {
        flexDirection: 'row',
        marginBottom: 15, borderRadius: 10, padding: 5
    },
    toggleButton: {
        flex: 1, backgroundColor: '#f0f0f0',
        alignItems: 'center', paddingVertical: 10, borderRadius: 30, marginRight: 5
    },
    activeButton: { backgroundColor: '#0063FF' },
    toggleText: { fontSize: 16, color: '#555' },
    activeText: { color: '#fff' },
    input: {
        width: '100%', padding: 12,

        borderRadius: 8,
    },
    button: {
        backgroundColor: '#0063FF',
        width: widthPercentageToDP(90),
        padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    loginRedirect: { flexDirection: 'row', marginTop: 15 },
    loginText: { color: '#909090' },
    loginLink: { color: '#0063FF', fontWeight: 'bold' }
});

export default SignUp;
