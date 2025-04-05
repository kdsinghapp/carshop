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
    Alert,
    ActivityIndicator
} from 'react-native';
import images, { icon } from '../../component/Image';
import { color } from '../../constant';
import { hp } from '../../component/utils/Constant';
import Icon from '../../component/Icon';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import CustomTextInput from '../../component/TextInput';
import { login } from '../../redux/Api/apiRequests';

const Login: React.FC = ({ navigation }) => {
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        identity: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        let newErrors = {
            identity: '',
            password: '',
        };

        if (!identity) {
            newErrors.identity = 'Identity is required';
        } else if (!/^\S+@\S+\.\S+$/.test(identity) && isNaN(Number(identity))) {
            newErrors.identity = 'Enter a valid email or phone number';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        setLoading(true);
        const body = {
            email: identity,
            password,
        };

        try {
            const res = await login(body);

            if (res?.success) {
                navigation.navigate(ScreenNameEnum.LocationAccessScreen);
            } else {
                Alert.alert('Login Failed', res?.message || 'Invalid credentials, please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar backgroundColor={color.baground} />
                
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                </View>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <Text style={styles.welcomeText}>Login</Text>
                    <Text style={styles.labelText}>Enter your email and password</Text>

                    <CustomTextInput
                        placeholder='Phone or Email'
                        onChangeText={setIdentity}
                        value={identity}
                        inputStyle={[styles.input, errors.identity && styles.errorInput]}
                        firsticon={true}
                        icons={icon.email}
                        securitytxt={false}
                    />
                    {errors.identity ? <Text style={styles.errorText}>{errors.identity}</Text> : null}

                    <CustomTextInput
                        placeholder='Password'
                        onChangeText={setPassword}
                        value={password}
                        inputStyle={[styles.input, errors.password && styles.errorInput]}
                        firsticon={true}
                        lasticon={true}
                        icons={icon.lock}
                        securitytxt={true}
                    />
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                    <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.FORGOT_PASSWORD)} style={styles.forgotPassword}>
                        <Text style={styles.forgotText}>Forgot your password?</Text>
                    </TouchableOpacity>

                    {/* Login Button with Loader */}
                    <TouchableOpacity
                        style={[styles.button, loading && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.SIGNUP_SCREEN)}>
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <ImageBackground source={images.buble} style={styles.bubbleBackground}>
                        <Text style={styles.orText}>OR</Text>
                        <TouchableOpacity style={styles.googleLogin}>
                            <Icon source={icon.google} size={25} />
                            <Text style={styles.googleText}>Sign in with Google</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Login;

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(8),
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
        marginBottom: 5,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 10,
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
        backgroundColor: '#0063FF',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#A0A0A0',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
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
        height: hp(20),
        alignItems: 'center',
        justifyContent: 'center',

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
