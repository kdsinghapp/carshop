import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

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

const Wallet: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Wallet</Text>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Your Available Balance</Text>
        <Text style={styles.balanceAmount}>$12,256.00</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Amount +</Text>
        </TouchableOpacity>
      </View>

      {/* Payment History */}
      <Text style={styles.paymentHistoryTitle}>Payment History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text
              style={[
                styles.transactionAmount,
                { color: item.amount > 500 ? "#007AFF" : "#FF3B30" }, // Blue for high amounts, Red for low
              ]}
            >
              ${item.amount.toFixed(2)}
            </Text>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
          </View>
        )}
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  balanceContainer: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#E0E0E0",
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: "#007AFF",
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
