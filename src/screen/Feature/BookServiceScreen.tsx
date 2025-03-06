import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import images from "../../component/Image";
import Icon from "../../component/Icon";
import CustomButton from "../../component/CustomButton";
import ScreenNameEnum from "../../routes/screenName.enum";

const BookServiceScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "01:00", "02:00", "03:00", "04:00",
    "05:00", "06:00", "07:00", "08:00",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon source={images.BackNavs2} size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Book Service</Text>
      </View>

      {/* Select Date */}
      <Text style={styles.sectionTitle}>Select Date</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "blue" },
        }}
        theme={{
          todayTextColor: "blue",
          arrowColor: "black",
        }}
        style={styles.calendar}
      />

      {/* Select Time Slot */}
      <Text style={styles.sectionTitle}>Select Time Slot</Text>
      <View style={styles.timeSlotContainer}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTimeSlot,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Note */}
      <TextInput
        style={styles.noteInput}
        placeholder="Add Note..."
        placeholderTextColor="#aaa"
        value={note}
        onChangeText={setNote}
        multiline
      />
       <CustomButton
                title='Continue'
                buttonStyle={{
                    marginTop:48,
                    
                }}
                onPress={() => {
                    navigation.navigate(ScreenNameEnum.PickUpAddress)
                }}
            />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: '28%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  calendar: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlot: {
    width: "22%",
    paddingVertical: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#0063FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: "#0063FF",
  },
  timeText: {
    fontSize: 14,
    color: "#0063FF",
  },
  selectedTimeText: {
    color: "white",
  },
  noteInput: {
    backgroundColor: "#F7F8F8",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginTop: 15,

    borderColor: "#ccc",
  },
});

export default BookServiceScreen;
