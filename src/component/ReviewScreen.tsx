import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

import AddReviewModal from '../screen/Feature/AddReviewModal';
import Icon from './Icon';
import Edit from '../assets/svg/messageedit.svg';


type ReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Review'>;
type Props = { navigation: ReviewScreenNavigationProp,Reviews:any };

interface Review {
  id: number;
  first_name: string;
  last_name: string;
  rating: number;
  comment: string;
  created_at: string;
  profile_image: string;
}

const ReviewScreen: React.FC<Props> = ({ navigation,Reviews }) => {
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(Reviews);

  const handleAddReview = (reviewText: string, rating: number) => {
    setReviews([...reviews, { id: Date.now().toString(), name: 'User', review: reviewText, rating }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Review</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection:'row',alignItems:'center'}}>
          <Edit size={16} />

          <Text style={styles.addReview}>
            Add Review
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.profile_image }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
              <Text style={styles.review}>{item.comment}</Text>
              <Text style={styles.rating}>{renderStars(item.rating)}</Text>
            </View>
          </View>
        )}
      />
      <AddReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddReview}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  addReview: {
    fontSize: 16,
    color: 'blue',
    fontWeight: '500',
    marginLeft:5
  },
  card: {
    flexDirection: 'row',

    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor:'#f0f0f0'
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  review: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 18,
    color: '#FFA500',
  },
});

export default ReviewScreen;
