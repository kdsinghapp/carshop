import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { hp } from './utils/Constant';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

// Define the data type for bike items
interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  created_at: string; // ISO date string
  updated_at: string;
  deleted_at: string | null;
  status: string;
}


// Define props for the component
interface HorizontalListProps {
  data: Category[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const HorizontalList: React.FC<HorizontalListProps> = ({ data }) => {
const navigation = useNavigation()
  
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity 
        onPress={()=>{
          navigation.navigate(ScreenNameEnum.ALL_SERVICES,{id:item.id})
        }}
        style={styles.card}>
          <Image source={{uri:item.icon}} style={styles.image} resizeMode="contain" />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
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
