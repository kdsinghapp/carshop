
    import React from 'react';
    import { View, FlatList, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
    import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from '../../component/Icon';
import ScreenNameEnum from '../../routes/screenName.enum';
import { icon } from '../../component/Image';

    // Define the data type for list items
    
    interface ListItem {
        id: number;
        name: string;
        profile_image: string;
        latitude: string;   // Could be number if you parse it
        longitude: string;  // Same here
        rating: string;     // Or number if your backend returns it as a number
        distance: number;
        price:string
      }
      
    
    // Define props for the component
    interface VerticalListProps {
      data: ListItem[];
    }
    
    const SCREEN_WIDTH = Dimensions.get('window').width;
    
    const HorizontalshopList: React.FC<VerticalListProps> = ({ data, navigation }) => {
      return (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.GARAGE_DETAILS,{id:item.id})
              }}
              style={styles.card}>
              <Image source={{uri:item.profile_image}} style={styles.image} resizeMode="cover" />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.address}>{item.name}</Text>
                <View style={styles.infoContainer}>
                  <Icon size={16} source={icon.pin} />
                  <Text style={styles.infoText}>{item.distance?.toFixed(2)} km</Text>
                  <Icon source={icon.star} size={16} />
                  <Text style={styles.infoText}>{item.rating}</Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
    
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#0063FF' }}>{item.price}.00</Text>
    
                </View>
              </View>
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
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
        width: SCREEN_WIDTH * 0.9, // 90% of screen width
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
        marginRight:10
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000', // White text color
      },
      address: {
        fontSize: 14,
        color: '#A0A3BD', // Light gray text
        marginBottom: 5,
      },
      infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      infoText: {
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
        marginRight: 10,
        fontWeight: '500'
      },
    });
    
    export default HorizontalshopList;
    