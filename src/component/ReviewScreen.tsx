import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

import AddReviewModal from '../screen/Feature/AddReviewModal';
import Icon from './Icon';
import Edit from '../assets/svg/messageedit.svg';
import { addstorereview, reviewdelete, updatestorereview } from '../redux/Api/apiRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateReviewModal from '../screen/Feature/UpdateReviewModal';
import images, { icon } from './Image';


type ReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Review'>;
type Props = { navigation: ReviewScreenNavigationProp, Reviews: any, store_id: number, handleReviewList: () => void; };

interface Review {
  id: number;
  first_name: string;
  last_name: string;
  rating: number;
  comment: string;
  created_at: string;
  profile_image: string;
  user_id: number
}

const ReviewScreen: React.FC<Props> = ({ navigation, Reviews, store_id, handleReviewList }) => {
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdateModal, setisUpdateModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(Reviews);
  const [reviewData, setreviewData] = useState('');

  const [User, setUser] = useState<string>();

  useEffect(() => {

    const getUser = async () => {
      const data = await AsyncStorage.getItem('user');
      const user = JSON.parse(data);
      setUser(user)
    }
    getUser()
  }, [Reviews])



  const handleAddReview = async (reviewText: string, rating: number,) => {
    try {

      const body = {
        car_service_store_id: store_id,
        user_id: User?.id,
        rating: rating,
        comment: reviewText,
      };

      const res = await addstorereview(body); // Await the API call

      if (res.success) {
        ToastAndroid.show('Review submitted successfully!', ToastAndroid.SHORT);
        await handleReviewList()
        // You can also use LONG or CENTER depending on UX preference
      } else {
        ToastAndroid.show(res.message || 'Failed to submit review.', ToastAndroid.SHORT);
        await handleReviewList()
      }

    } catch (error) {
      console.error('Review Submit Error:', error);
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
      await handleReviewList()
    }
  };

  const handleUpdateReview = async (reviewText: string, rating: number, review_id: string) => {
    try {

      const body = {
        car_service_store_id: store_id,
        user_id: User?.id,
        rating: rating,
        comment: reviewText,
        review_id: review_id
      };



      const res = await updatestorereview(body); // Await the API call

      if (res.success) {
        ToastAndroid.show('Review submitted successfully!', ToastAndroid.SHORT);
        await handleReviewList()
        // You can also use LONG or CENTER depending on UX preference
      } else {
        ToastAndroid.show(res.message || 'Failed to submit review.', ToastAndroid.SHORT);
        await handleReviewList()
      }

    } catch (error) {
      console.error('Review Submit Error:', error);
      ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.SHORT);
      await handleReviewList()
    }
  };


  const deleteReview = async (review_id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const res = await reviewdelete(review_id, User?.id);
              console.log('===============res=====================', res);
              await handleReviewList()
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Review</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Edit size={16} />

          <Text style={styles.addReview}>
            Add Review
          </Text>
        </TouchableOpacity>
      </View>

      {reviews?.length > 0 ? <FlatList
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
            {item.user_id === User?.id &&
              <View style={{ marginLeft: 15 }}>
                <TouchableOpacity style={{

                }}
                  onPress={() => {
                    setreviewData(item)
                    setisUpdateModal(true)
                  }}
                >

                  <Edit size={15} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                  marginTop: 10
                }}
                  onPress={() => {
                    setreviewData(item)
                    deleteReview(item?.id)
                  }}
                >

                  <Icon source={icon.delete} size={20} />
                </TouchableOpacity>
              </View>
            }

          </View>
        )}
      /> :
        <View style={{
          height: 50, alignItems: 'center', justifyContent: 'center'
        }}>
          <Text style={{
            color: '#000', fontWeight: '600'
          }}>No Review</Text>
        </View>}
      <AddReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddReview}
      />

      <UpdateReviewModal
        visible={isUpdateModal}
        review={reviewData}
        onClose={() => setisUpdateModal(false)}
        onSubmitSuccess={handleUpdateReview}
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
    marginLeft: 5
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
    backgroundColor: '#f0f0f0'
  },
  textContainer: {

    width: '70%'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  review: {
    fontSize: 12,
    color: '#666',
  },
  rating: {
    fontSize: 18,
    color: '#FFA500',
  },
});

export default ReviewScreen;
