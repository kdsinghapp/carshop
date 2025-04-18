import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";

import SearchBar from "../../component/SearchBar";
import ScreenNameEnum from "../../routes/screenName.enum";
import CustomHeader from "../../component/CustomHeaderProps";
import images from "../../component/Image";
import Icon from "../../component/Icon";
import { chatuserlist } from "../../redux/Api/apiRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
}

interface ChatItem {
    user: User;
    last_message: string;
    message_type: 'text' | 'image' | 'video' | 'file'; // Extendable
    created_at: string; // ISO timestamp
    unseen_count: number;
}



const ChatList: React.FC = ({ navigation }) => {
    const isFocus = useIsFocused()
    const [chatUser, setChatUser] = useState<ChatItem[]>([]);

    useEffect(() => {
        getuserlist()
    }, [isFocus])

    const getuserlist = async () => {
        const data = await AsyncStorage.getItem('user');
        const user = JSON.parse(data);
        const res = await chatuserlist(user?.id)


        if (res.success) {
            setChatUser(res?.data)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity

                    onPress={() => navigation.goBack()} style={{}}>
                    <Image source={images.BackNavs1} style={{ height: 30, width: 30, tintColor: '#fff' }} />
                </TouchableOpacity>


                <Text style={styles.headerTitle}>Chat</Text>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>


                <SearchBar placeholder='Search' />


            </View>

            {/* Chat List */}
            {chatUser.length > 0 ? (
                <FlatList
                    data={chatUser}
                    keyExtractor={(item) => item.user.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ScreenNameEnum.ChatScreen, { receiverId: item.user.id });
                            }}
                            style={styles.chatItem}
                        >
                            <Image source={{ uri: item.user.profile_image }} style={styles.avatar} />
                            <View style={styles.chatDetails}>
                                <Text style={styles.chatName}>{`${item.user.first_name} ${item.user.last_name}`}</Text>
                                <Text style={[styles.chatMessage]}>
                                    {item.message_type === 'text' ? item.last_message : `[${item.message_type.toUpperCase()}]`}
                                </Text>
                            </View>
                            <View style={styles.chatMeta}>
                                <Text style={styles.chatTime}>
                                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                                {item.unseen_count > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadText}>{item.unseen_count}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View>
                    <Text>No User Found</Text>
                </View>
            )}
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
        flexDirection: 'row'
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: '37%'
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
        backgroundColor: "#F9FBFF",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor:'#888'
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