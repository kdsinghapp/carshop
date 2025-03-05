import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { hp } from './utils/Constant';

// Define the data type for bike items
interface BikeItem {
  id: string;
  name: string;
  img: any; // Can be a local or remote image
}

// Define props for the component
interface HorizontalListProps {
  data: BikeItem[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const HorizontalList: React.FC<HorizontalListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={item.img} style={styles.image} resizeMode="contain" />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width:100,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop:10,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:0,
// Shadow for Android
  },
  image: {
    width: '100%',
    height: 70,
  },
  text: {

    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});

export default HorizontalList;
