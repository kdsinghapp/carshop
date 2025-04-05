import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ScreenNameEnum from '../routes/screenName.enum';
import { icon } from './Image';
import { mergeConfig } from 'axios';

// Define the data type
interface ListItem {
  id: number;
  category_id: number;
  name: string;
  name_no: string;
  description: string;
  description_no: string;
  icon: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
  status: 'Active' | 'Inactive' | string; // Use union if you have predefined statuses
}


// Define props for the component
interface VerticalListProps {
  data: ListItem[];
  showBtn: boolean,
  navigation: any
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const VerticalList: React.FC<VerticalListProps> = ({ data, navigation, showBtn }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNameEnum.NEARBY_SHOPS,{id:item.id})
          }}
          style={styles.card}>
          <Image source={{uri:item.icon}} style={styles.image} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.name}</Text>
           {item.description && <Text style={{color:'#7B6F72',fontSize:14,fontWeight:'600'}}>{item.description}</Text>}

          </View>
          {showBtn &&
            <>

              {index !== 0 ? <Image source={icon.ring} style={{ height: 25, width: 25, marginRight: 20 }} resizeMode="contain" />
                : <Image source={icon.fillring} style={{ height: 25, width: 25, marginRight: 20 }} resizeMode="contain" />
              }
            </>
          }
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff', // Dark blue background
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 5,
    shadowColor: "#000",
    marginVertical: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // White text color
  },
  description: {
    fontSize: 14,
    color: '#fff', // Light gray text
    marginTop: 5,
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: 10,
    backgroundColor:'#f0f0f0',
    borderRadius:15,
    marginRight:10
  },
});

export default VerticalList;
