
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
        Linking,
        Alert,
        BackHandler
    } from 'react-native';
    import images, { icon } from '../../component/Image';
    import { color } from '../../constant';
    import { hp, wp } from '../../component/utils/Constant';
    import Icon from '../../component/Icon';
    import CustomButton from '../../component/CustomButton';
    import ScreenNameEnum from '../../routes/screenName.enum';
    import CustomTextInput from '../../component/TextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
    
    const CompanyLogin: React.FC = ({ navigation }) => {
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
    
        const handleSubmit = () => {
           
            navigation.navigate(ScreenNameEnum.BOTTAM_TAB);
           
        };
        const signInHandler = async (value: string): void => {

            await AsyncStorage.setItem('type', value)
    
            if (value === 'User') {
    
                navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
            }
            else {
                navigation.navigate(ScreenNameEnum.COMPANY_LOGIN);
            }
        };

        useFocusEffect(
            React.useCallback(() => {
              const backAction = () => {
                Alert.alert('Exit App', 'Are you sure you want to exit?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Yes', onPress: () => BackHandler.exitApp() },
                ]);
                return true;
              };
              const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
              );
              return () => backHandler.remove();
            }, [])
          );
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
                        />
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
                            placeholder='Company ID'
                            onChangeText={setPassword}
                            value={password}
                            inputStyle={[styles.input, errors.password && styles.errorInput]}
                            firsticon={true}
                            lasticon={false}
                            icons={icon.office}
                        />
    
                        <TouchableOpacity 
                        
                        onPress={()=>{
                            navigation.navigate(ScreenNameEnum.FORGOT_PASSWORD)
                        }}
                        style={styles.forgotPassword}>
                            <Text style={styles.forgotText}>Forgot your password?</Text>
                        </TouchableOpacity>
    
                        {/* Login Button */}
                        <CustomButton
                            title="Login"
                            onPress={handleSubmit}
                            buttonStyle={styles.button}
                        />
     <ImageBackground source={images.buble} style={styles.bubbleBackground}>
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity
                            onPress={()=>{
                               Linking.openURL('https://server-php-8-3.technorizen.com/amitendra/car-care/home1.html')
                            }}
                            >
                                <Text style={styles.signupLink}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
    
                       
                            <Text style={styles.orText}>OR</Text>
                            <TouchableOpacity style={styles.googleLogin}>
                                <Icon source={icon.google} size={25} />
                                <Text style={styles.googleText}>Sign in with Google</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </SafeAreaView>
                <TouchableOpacity 
            onPress={()=>{
                signInHandler('User')
            }}
            style={{
                    
                        bottom:0,alignSelf:'center'
                    }}>
                        <Text style={{color:'#0063FF',fontWeight:'800',fontSize:14}}>User app</Text>
                    </TouchableOpacity>
            </View>
        );
    };
    
    export default CompanyLogin;
    
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
            borderBottomWidth:0.5,
            borderColor: '#0063FF',
            paddingVertical: 2,
        },
        button: {
            marginTop: 20,
        },
        signupContainer: {

            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
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
    