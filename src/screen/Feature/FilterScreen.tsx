import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from '../../component/Icon';
import images, { icon } from '../../component/Image';

const FilterScreen: React.FC = ({navigation}) => {
  const [priceRange, setPriceRange] = useState(20);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<string>('All');

  const services = ['All', 'Exterior Cleaning', 'Vacuum Cleaning'];
  const sortOptions = ['All', 'Popular', 'Near by', 'Price -'];

  const reviews = [
    { rating: '4.5 and above', value: 4.5 },
    { rating: '4.0 - 4.5', value: 4.0 },
    { rating: '3.5 - 4.0', value: 3.5 },
    { rating: '3.0 - 3.5', value: 3.0 },
    { rating: '2.5 - 3.0', value: 2.5 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
        onPress={()=>{
            navigation.goBack()
        }}
        >
          <Icon   source={images.BackNavs2} size={35}  />
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
      </View>

      {/* Location Input */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Times Square NYC, Manhattan" />
        <Icon source={icon.pin} size={25} />
      </View>

      {/* Services Section */}
      <Text style={styles.sectionTitle}>Services</Text>
      <View style={styles.serviceContainer}>
        {services.map((service) => (
          <TouchableOpacity
            key={service}
            style={[styles.serviceButton, selectedService === service && styles.selectedButton]}
            onPress={() => setSelectedService(service)}
          >
            <Text style={[styles.serviceText, selectedService === service && styles.selectedText]}>
              {service}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Price Range */}
      <Text style={styles.sectionTitle}>Price Range</Text>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={40}
        step={5}
        value={priceRange}
        onValueChange={setPriceRange}
        minimumTrackTintColor="#007bff"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#007bff"
      />
      <View style={styles.priceLabels}>
        {[5, 10, 15, 20, 25, 30, 35, 40].map((price) => (
          <Text key={price} style={styles.priceText}>
            ${price}
          </Text>
        ))}
      </View>

      {/* Reviews */}
      <Text style={styles.sectionTitle}>Reviews</Text>
      <View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.rating}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.reviewRow} onPress={() => setSelectedReview(item.value)}>
            <View style={styles.starRow}>
              {[...Array(5)].map((_, i) => (
                <Icon  source={icon.StarFill2x} size={20} color="gold" />
              ))}
              <Text style={styles.reviewText}>{item.rating}</Text>
            </View>


            {selectedReview !== item.value ? <Image source={icon.ring} style={{ height: 25, width: 25, marginRight: 20 }} resizeMode="contain" />
                : <Image source={icon.fillring} style={{ height: 25, width: 25, marginRight: 20 }} resizeMode="contain" />
              }
           
          </TouchableOpacity>
        )}
      />
      </View>

      {/* SortBy */}
      <Text style={[styles.sectionTitle,{marginTop:20}]}>Sortby</Text>
      <View style={styles.serviceContainer}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.serviceButton, selectedSort === option && styles.selectedButton]}
            onPress={() => setSelectedSort(option)}
          >
            <Text style={[styles.serviceText, selectedSort === option && styles.selectedText]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:30,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: '35%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
backgroundColor:'#F7F8F8',
    borderColor: '#ddd',
    borderRadius: 10,
    padding:8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  serviceButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
    borderRadius:10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  serviceText: {
    fontSize: 14,
    color: '#0063FF',
  },
  selectedText: {
    color: 'white',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  priceText: {
    fontSize: 14,
    color: '#000',
    fontWeight:'800',
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    marginLeft: 10,
    fontSize: 14,
    color:'#000',
    fontWeight:'700'
  },
});

export default FilterScreen;
