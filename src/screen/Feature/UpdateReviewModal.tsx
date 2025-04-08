import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from '../../component/Icon';
import { icon } from '../../component/Image';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmitSuccess: (review: string, rating: number,review_id:number) => void;
  review:any
};

const UpdateReviewModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmitSuccess,
  review
}) => {
  const [reviewText, setReviewText] = useState(review?.comment);
  const [rating, setRating] = useState(review?.rating);
  const [loading, setLoading] = useState(false);


  console.log('review',review);
  useEffect(()=>{
    setReviewText(review?.comment)
    setRating(review?.rating)
  },[review])
  
  const handleSubmit = async () => {
    if (reviewText.trim() === '' || rating === 0) {
      Alert.alert('Error', 'Please enter a review and select a rating.');
      return;
    }
    onSubmitSuccess(reviewText,rating,review?.id)
    onClose()
    }
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Leave Review</Text>

          {/* Star Rating */}
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Icon
                  source={icon.StarFill2x}
                  style={{
                    tintColor: star <= rating ? '#FFA500' : '#E0E0E0',
                    marginLeft: 5,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Review Input */}
          <TextInput
            style={styles.input}
            placeholder="Leave Review"
            multiline
            value={reviewText}
            onChangeText={setReviewText}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Updatting...' : 'UPDATE'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { marginTop: 10, backgroundColor: '#aaa' }]}
            onPress={onClose}
            disabled={loading}
          >
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    minHeight: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateReviewModal;
