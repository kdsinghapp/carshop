import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import Icon from './Icon';
import { icon } from './Image';

interface PasswordInputProps extends TextInputProps {
  placeholder?: string;
  icons: any,
  securitytxt: boolean,
  firsticon: boolean,
  lasticon: boolean,
}

const CustomTextInput: React.FC<PasswordInputProps> = ({ icons, securitytxt, lasticon, firsticon,
  placeholder = 'Password', ...props }) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      {/* Lock Icon */}
      {firsticon && <Icon source={icons} size={25} style={styles.icon} />}

      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#ADA4A5"
        secureTextEntry={secureText}
        {...props}
      />

      {/* Eye Toggle Icon */}
      {lasticon && <TouchableOpacity onPress={() => setSecureText(!secureText)}>
        <Icon source={icon.eye} size={25} style={styles.eyeIcon} />
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:2,
    borderColor:'#EBEBEB',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginTop: 10
  },
  icon: {
    marginRight: 10,
    tintColor:'#7B6F72'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A4A',
  },
  eyeIcon: {
    marginLeft: 10,
  },
});



export default CustomTextInput;
