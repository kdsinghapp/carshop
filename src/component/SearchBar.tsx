import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { color } from '../../constant';
import Icon from './Icon';
import { icon } from './Image';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search', value, onChangeText }) => {
  return (
    <View style={styles.container}>
       <Icon  size={20}  source={icon.search} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A0A3BD"
        value={value}
        onChangeText={onChangeText}
      />
      <Icon  size={25}  source={icon.Filter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Dark background
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    width: '100%',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft:5
  },
});

export default SearchBar;
