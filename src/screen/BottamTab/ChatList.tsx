import React from "react";
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import SearchBar from "../../component/SearchBar";
import ScreenNameEnum from "../../routes/screenName.enum";

interface ChatItem {
    id: string;
    name: string;
    message: string;
    time: string;
    avatar: string;
    unreadMessages?: number;
    isTyping?: boolean;
}

const chatData: ChatItem[] = [
    {
        id: "1",
        name: "Wilson Lubin",
        message: "Typing...",
        time: "08:00am",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        unreadMessages: 2,
        isTyping: true,
    },
    {
        id: "2",
        name: "Marcus Kenter",
        message: "Have you spoken to the delivery...",
        time: "08:00am",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        id: "3",
        name: "Desirae Dias",
        message: "Have you spoken to the delivery...",
        time: "08:00am",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        id: "4",
        name: "Skylar Curtis",
        message: "Have you spoken to the delivery...",
        time: "08:00am",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        id: "5",
        name: "Davis Aminoff",
        message: "Have you spoken to the delivery...",
        time: "08:00am",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
];

const ChatList: React.FC = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chat</Text>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>


                <SearchBar placeholder='Search' />


            </View>

            {/* Chat List */}
            <FlatList
                data={chatData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ScreenNameEnum.ChatScreen)
                        }}
                        style={styles.chatItem}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View style={styles.chatDetails}>
                            <Text style={styles.chatName}>{item.name}</Text>
                            <Text style={[styles.chatMessage, item.isTyping && styles.typingText]}>{item.message}</Text>
                        </View>
                        <View style={styles.chatMeta}>
                            <Text style={styles.chatTime}>{item.time}</Text>
                            {item.unreadMessages && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unreadMessages}</Text></View>}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default ChatList;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FB",
    },
    header: {
        backgroundColor: "#007AFF",
        padding: 20,
        paddingTop: 50,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
    searchContainer: {
        padding: 10
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatDetails: {
        flex: 1,
        marginLeft: 10,
    },
    chatName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    chatMessage: {
        fontSize: 14,
        color: "#888",
        marginTop: 3,
    },
    typingText: {
        color: "#007AFF",
        fontWeight: "bold",
    },
    chatMeta: {
        alignItems: "flex-end",
    },
    chatTime: {
        fontSize: 12,
        color: "#888",
    },
    unreadBadge: {
        backgroundColor: "#007AFF",
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    unreadText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
});