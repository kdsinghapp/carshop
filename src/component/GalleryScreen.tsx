import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { wp } from './utils/Constant';

type GalleryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Gallery'>;
type Props = { navigation: GalleryScreenNavigationProp; gallery: any };

const GalleryScreen: React.FC<Props> = ({ navigation, gallery }) => {
  const [loadingMap, setLoadingMap] = useState<{ [key: number]: boolean }>({});

  const handleLoadStart = (index: number) => {
    setLoadingMap((prev) => ({ ...prev, [index]: true }));
  };

  const handleLoadEnd = (index: number) => {
    setLoadingMap((prev) => ({ ...prev, [index]: false }));
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ImageDetail', { imageUrl: item })}>
      <View style={styles.imageContainer}>
        {loadingMap[index] && (
          <ActivityIndicator style={StyleSheet.absoluteFill} size="small" color="#000" />
        )}
        <Image
          source={{ uri: item?.image }}
          style={styles.image}
          onLoadStart={() => handleLoadStart(index)}
          onLoadEnd={() => handleLoadEnd(index)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={gallery}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
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
  imageContainer: {
    position: 'relative',
    width: wp(40),
    height: 150,
    margin: '1%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default GalleryScreen;
