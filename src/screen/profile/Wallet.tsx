import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "../../component/Icon";
import images from "../../component/Image";
import { color } from "../../constant";
import CustomHeader from "../../component/CustomHeaderProps";

interface Transaction {
  id: string;
  amount: number;
  name: string;
  date: string;
}

const transactions: Transaction[] = [
  { id: "1", amount: 399.0, name: "Abram Culhane", date: "8 June 2024" },
  { id: "2", amount: 987.0, name: "Markey Press", date: "6 June 2024" },
  { id: "3", amount: 532.0, name: "Mr. Patrick", date: "6 June 2024" },
  { id: "4", amount: 125.0, name: "Rayna Westervelt", date: "6 June 2024" },
  { id: "5", amount: 987.0, name: "Kadri Baptista", date: "6 June 2024" },
  { id: "6", amount: 399.0, name: "Hanna Bostrom Bothman", date: "6 June 2024" },
  { id: "7", amount: 399.0, name: "Carla Siphron", date: "6 June 2024" },
];

const Wallet: React.FC = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
   <CustomHeader   title="Wallet"  showSkip={false}  navigation={navigation} />

      {/* Balance Section */}

      <View style={{flex:1,padding:20}}>


      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Your Available Balance</Text>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between', borderColor: color.buttonColor,
          borderWidth: 1, width: '100%',
        }}>
          <View style={[styles.addButton, { borderRadius: 30, borderWidth: 0, backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
            <Text style={styles.balanceAmount}>$12,256.00</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Amount +</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment History */}
      <Text style={styles.paymentHistoryTitle}>Payment History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={{}}>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: '#0066FF' }, // Blue for high amounts, Red for low
                ]}
              >
                ${item.amount.toFixed(2)}
              </Text>
              <Text style={styles.transactionName}>{item.name}</Text>
            </View>
            <View style={styles.transactionDetails}>
              <Icon source={item.amount > 500 ? images.debit2x : images.credit2x} size={30} />

              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
          </View>
        )}
      />
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",


  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  balanceContainer: {
    backgroundColor: color.buttonColor,
    marginTop:20,
    borderRadius: 15,
    padding: 20,
    paddingVertical: 40,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#fff",
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",

  },
  addButton: {
    borderColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 2
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  paymentHistoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDetails: {
    alignItems: "flex-end",
  },
  transactionName: {
    fontSize: 14,
    color: "#555",
  },
  transactionDate: {
    fontSize: 12,
    color: "#888",
  },
});

export default Wallet;
