import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { wp } from './utils/Constant';

type GalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Gallery'>;
type Props = { navigation: GalleryScreenNavigationProp };

const images = [
  require('../assets/images/clean.png'),
  require('../assets/images/clean.png'),
  require('../assets/images/clean.png'),
  require('../assets/images/clean.png'),
  require('../assets/images/clean.png'),
  require('../assets/images/clean.png'),
];

const GalleryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ImageDetail', { imageUrl: item })}>
            <Image source={item} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  image: {
    width: wp(40),
    height: 150,
    margin: '1%',
    borderRadius: 10,
  },
});

export default GalleryScreen;
