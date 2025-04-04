import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import Icon from '../../component/Icon';
import images, { icon } from '../../component/Image';
import CustomButton from '../../component/CustomButton';
import { hp, wp } from '../../component/utils/Constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { send_Otp } from '../../redux/Api/apiRequests';

interface ResetOptionProps {
  type: 'sms' | 'email';
  value: string;
  setValue: (text: string) => void;
  disabled: boolean;
  errorMessage: string;
}

const ResetOption: React.FC<ResetOptionProps> = ({ type, value, setValue, disabled, errorMessage }) => {
  return (
    <View style={styles.optionContainer}>
      <View style={styles.iconContainer}>
        <Icon source={type === 'sms' ? icon.Sms2 : icon.Mail2} size={60} />
      </View>
      <View style={{ flex: 1,paddingVertical:0 }}>
        <Text style={styles.optionTitle}>{type === 'sms' ? 'SMS' : 'Email'}</Text>
        <TextInput
          placeholder={type === 'sms' ? 'Enter Mobile' : 'Enter Email'}
          style={[styles.optionInput, errorMessage ? styles.inputError : {}]}
          keyboardType={type === 'sms' ? 'phone-pad' : 'email-address'}
          maxLength={type === 'sms' ? 10 : 50}
          autoCapitalize="none"
          editable={!disabled}
          value={value}
          onChangeText={setValue}
        />

      </View>
    </View>
  );
};

const PasswordResetScreen: React.FC = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    let isValid = true;

    if (!mobile && !email) {
      setMobileError('Enter a mobile number or email.');
      setEmailError('Enter a mobile number or email.');
      isValid = false;
    } else {
      setMobileError('');
      setEmailError('');
    }

    if (mobile && !/^[0-9]{10}$/.test(mobile)) {
      setMobileError('Invalid mobile number. Enter a 10-digit number.');
      isValid = false;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;
    setLoading(true);

    try {
      const res = await send_Otp(email || mobile);

      if (res?.success) {
        navigation.navigate(ScreenNameEnum.OTP_SCREEN, {email: email || mobile });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon source={images.BackNavs2} size={30} />
        </TouchableOpacity>

        <Text style={styles.title}>Password Reset</Text>
        <Text style={styles.subtitle}>Enter your mobile number or email to reset your password</Text>

        {/* Mobile Input */}
        <ResetOption
          type="sms"
          value={mobile}
          setValue={(text) => {
            setMobile(text);
            setEmail('');
            setMobileError('');
            setEmailError('');
          }}
          disabled={email.length > 0} // Disable if email is filled
          errorMessage={mobileError}
        />

        {/* Email Input */}
        <ResetOption
          type="email"
          value={email}
          setValue={(text) => {
            setEmail(text);
            setMobile('');
            setEmailError('');
            setMobileError('');
          }}
          disabled={mobile.length > 0} // Disable if mobile is filled
          errorMessage={emailError}
        />

        {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}
      

      <ImageBackground source={images.buble} style={styles.imageBg}>
        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <CustomButton title='Submit' onPress={handleSubmit} buttonStyle={styles.button} />
        )}
      </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    paddingVertical: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:5,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:15
  },
  optionInput: {
    fontSize: 16,

    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    backgroundColor: '#F9FAFB',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,

    textAlign: 'center',
    marginVertical: 10
  },
  imageBg: {
    height: hp(50),

    width: wp(100),
    padding: 20,
  },
  button: {
    marginTop: 100,
    width: wp(80),
  },
});

export default PasswordResetScreen;
