import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import Icon from '../../component/Icon';
import images, { icon } from '../../component/Image';
import CustomButton from '../../component/CustomButton';
import { hp, wp } from '../../component/utils/Constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

interface ResetOptionProps {
  type: 'sms' | 'email';
  onPress: () => void;
}

const ResetOption: React.FC<ResetOptionProps> = ({ type, onPress }) => {

  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon source={type === 'sms' ? icon.Sms2 : icon.Mail2} size={60} />
      </View>
      <View>
        <Text style={styles.optionTitle}>{type === 'sms' ? 'SMS' : 'Email'}</Text>
        <Text style={styles.optionSubtitle}>
          {type === 'sms' ? '+91 **********' : 'joh********@gmail.com'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const PasswordResetScreen: React.FC = () => {
  const handleResetViaSMS = () => {
    console.log('Reset via SMS');
  };

  const handleResetViaEmail = () => {
    console.log('Reset via Email');
  };
  const handleSubmit = () => {

  };
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon source={images.BackNavs2} size={30} />
      </TouchableOpacity>

      <Text style={styles.title}>Password Reset</Text>
      <Text style={styles.subtitle}>
        Please put your mobile number to reset your password
      </Text>

      <ResetOption type="sms" onPress={handleResetViaSMS} />
      <ResetOption type="email" onPress={handleResetViaEmail} />
      <ImageBackground source={images.buble} style={{ height: hp(25), position: 'absolute', bottom: 0, width: wp(100), padding: 20 }}>
        <CustomButton
          title="Submit"
          onPress={() => { navigation.navigate(ScreenNameEnum.OTP_SCREEN) }}
          buttonStyle={styles.button}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 20
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
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    paddingVertical:30
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,

    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default PasswordResetScreen;
