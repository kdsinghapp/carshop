import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "../../component/Icon";
import images from "../../component/Image";
import ScreenNameEnum from "../../routes/screenName.enum";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque lacus...",
  },
  { id: "2", question: "Lorem ipsum dolor sit amet?", answer: "Answer 2" },
  { id: "3", question: "Lorem ipsum dolor sit amet?", answer: "Answer 3" },
  { id: "4", question: "Lorem ipsum dolor sit amet?", answer: "Answer 4" },
  { id: "5", question: "Lorem ipsum dolor sit amet?", answer: "Answer 5" },
];

const HelpCenter: React.FC = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState<"FAQ" | "Contact">("FAQ");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
<View style={{
    backgroundColor:'#0063FF',
    padding:20,
    paddingTop:40
}}>
    <TouchableOpacity
    style={{}}

    onPress={()=>{
        navigation.goBack()
    }}
    >
        <Icon
source={images.BackNavs2}

size={40}
        />
    </TouchableOpacity>
      <Text style={styles.header}>Help Center</Text>
      <Text style={styles.subHeader}>How Can We Help You?</Text>
      <TextInput style={styles.searchBar} placeholder="Search..." />

      </View>
      {/* Search Bar */}
 
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "FAQ" && styles.activeTab]}
          onPress={() => setSelectedTab("FAQ")}
        >
          <Text style={[styles.tabText,selectedTab === "FAQ"&&{color:'#fff'}]}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Contact" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Contact")}
        >
          <Text style={[styles.tabText,selectedTab === "Contact"&&{color:'#fff'}]}>Contact us</Text>
        </TouchableOpacity>
      </View>
<View style={{
    flex:1,
    padding:20
}}>


      {selectedTab === "FAQ" && (
        <FlatList
          data={faqData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.faqItem}
              onPress={() => toggleFAQ(item.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                {/* <FontAwesome
                  name={expandedId === item.id ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#007AFF"
                /> */}
                <Icon
source={expandedId === item.id ?images.downside:images.upside}
                />
              </View>
              {expandedId === item.id && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
</View>
      {/* Contact Us Section */}
      {selectedTab === "Contact" && (
        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>
            If you need further assistance, please reach out to our support team
            at support@example.com.
          </Text>
        </View>
      )}
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
    marginBottom: 5,
    color: "#fff",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    marginBottom: 15,
  },
  searchBar: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: "#F8F8F8",
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
paddingHorizontal:20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop:20
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius:30,
    marginRight:5,
    alignItems: "center",
    backgroundColor:'rgba(0, 122, 255, 0.15)'
  },
  activeTab: {
    backgroundColor: "#007AFF",
    borderRadius:30,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0063FF",
  },
  faqItem: {
    backgroundColor: "#ECF1FF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: "bold",
  },
  faqAnswer: {
    fontSize: 13,
    color: "#555",
    marginTop: 10,
  },
  contactContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  contactText: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
});

export default HelpCenter;
