import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import images, { icon } from "../../component/Image";
import { hp } from "../../component/utils/Constant";
import CustomHeader from "../../component/CustomHeaderProps";
import Icon from "../../component/Icon";
import { useNavigation } from "@react-navigation/native";

interface LeaveReviewProps {
  onSubmit: (rating: number, review: string) => void;
}

const LeaveReview: React.FC<LeaveReviewProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* Header */}
<CustomHeader  title="Leave Review"  navigation={navigation} />

      {/* Review Image */}
      <Image
        source={images.review} // Replace with actual image URL
        style={styles.image}
      />

      {/* Success Message */}
      <Text style={styles.successText}>
        Your work is done successfully!{"\n"}Rate the Vendor Performance
      </Text>

      {/* Rating Section */}
      <Text style={styles.subText}>Please rate Reo Donaldo</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
           
            <Icon
size={30} style={{marginLeft:5,}}
            source={star <= rating ?icon.StarFill2x:icon.DisableStar}

          
            />
          </TouchableOpacity>
        ))}
      </View>

    <View style={{padding:25}}>


      <TextInput
        style={styles.textInput}
        placeholder="Leave Review"
        placeholderTextColor="#999"
        value={review}
        onChangeText={setReview}
        multiline
      />

      {/* Done Button */}
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => onSubmit(rating, review)}
      >
        <Text style={styles.doneButtonText}>DONE</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
    paddingTop:30
    
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  image: {
    width: '80%',
    height: hp(40),
    resizeMode: "contain",
    marginBottom: 15,
    alignSelf:'center'
  },
  successText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007AFF",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  textInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#F8F8F8",
    textAlignVertical: "top",
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: "#007AFF",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LeaveReview;
