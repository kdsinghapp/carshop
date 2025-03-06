import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomHeader from "./CustomHeaderProps";

interface BookingDetailsComponentProps {
  bookingDate: string;
  car: string;
  serviceDuration: string;
  serviceType: string;
  services: { name: string; price: string }[];
  taxFees: string;
  paymentMethod: string;
  transactionId: string;
  totalAmount: string;
  onEdit: () => void;
  onCancel: () => void;
  navigation:any
}

const BookingDetailsComponent: React.FC<BookingDetailsComponentProps> = ({
  bookingDate,
  car,
  serviceDuration,
  serviceType,
  services,
  taxFees,
  paymentMethod,
  transactionId,
  totalAmount,
  onEdit,
  onCancel,
  navigation
}) => {
  return (
    <View style={styles.container}>
 
      <CustomHeader navigation={navigation} title="Bookings Details" onSkipPress={() => { }} showSkip={false} />

      <View style={styles.detailsContainer}>
        <DetailRow label="Booking Date" value={bookingDate} />
        <DetailRow label="Car" value={car} />
        <DetailRow label="Estimated Service Duration" value={serviceDuration} />
        <DetailRow label="Service Type" value={serviceType} />
<View
style={{borderBottomWidth:1,borderColor:'#D5DDE0'}}
/>
        {services.map((service, index) => (
          <DetailRow key={index} label={service.name} value={service.price} />
        ))}

        <DetailRow label="Tax & Fees" value={taxFees} />
        <View
style={{borderBottomWidth:1,borderColor:'#D5DDE0'}}
/>
        <DetailRow label="Payment Methods" value={paymentMethod} />
        <DetailRow label="Transaction ID" value={transactionId} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{totalAmount}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={[styles.buttonText,{color:'#fff'}]}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:10,
    paddingTop:30
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginVertical:8

  },
  detailLabel: {
    fontSize: 14,
    color: "#555",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderStyle:'dashed'
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderWidth:1,borderColor:'#0063FF',
    borderRadius: 15,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#0063FF",
    paddingVertical: 12,
    borderRadius: 15,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#0063FF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingDetailsComponent;

