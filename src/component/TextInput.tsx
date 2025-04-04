import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import Icon from './Icon';
import { icon } from './Image';

interface PasswordInputProps extends TextInputProps {
  placeholder?: string;
  icons: any;
  securitytxt?: boolean;  // Make it optional with default `false`
  firsticon?: boolean;
  lasticon?: boolean;
}

const CustomTextInput: React.FC<PasswordInputProps> = ({
  icons,
  securitytxt = false,
  lasticon,
  firsticon,
  placeholder = 'Password',
  ...props
}) => {
  const [secureText, setSecureText] = useState(securitytxt); // Use securitytxt to set initial value

  return (
    <View style={styles.container}>
      {/* Lock Icon */}
      {firsticon && <Icon source={icons} size={25} style={styles.icon} />}

      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#ADA4A5"
        secureTextEntry={secureText} // Now correctly linked to securitytxt
        {...props}
      />

      {/* Eye Toggle Icon */}
      {lasticon && (
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon source={icon.eye} size={25} style={styles.eyeIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F8',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
    tintColor: '#7B6F72',
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
