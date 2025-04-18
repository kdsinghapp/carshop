
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { color } from '../../constant';
import images, { icon } from '../../component/Image';
import Icon from '../../component/Icon';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getuserchat, sendchatmessage } from '../../redux/Api/apiRequests';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
}

interface Message {
  id: number;
  sender_user_id: number;
  receiver_user_id: number;
  message: string;
  attachment: string | null;
  message_type: 'text' | 'image' | 'video' | 'file'; // extend if needed
  is_read: 'SEEN' | 'UNSEEN';
  status: 'Active' | 'Inactive'; // or whatever your API supports
  created_at: string; // ISO date string
  updated_at: string;
  deleted_at: string | null;
  sender: User;
  receiver: User;
}

const ChatScreen: React.FC = () => {

  const route = useRoute()
  const { receiverId } = route.params
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('user').then((data) => {
      const user = JSON.parse(data);
      setCurrentUserId(user?.id);
    });
  }, []);


  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender_user_id === currentUserId;

    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
        {!isUser && <Image source={{ uri: item.sender.profile_image }} style={styles.avatar} />}
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };

  const navigation = useNavigation()


  const isFocus = useIsFocused()

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    const fetchChat = async () => {
      await getchatlist();
      console.log('================getchatlist====================');
     
    };
  
    // Fetch chat every 4 seconds
    if (isFocus) {
      interval = setInterval(fetchChat, 4000);
    }
  
    // Clear the interval when the component is unfocused or unmounted
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isFocus]); // Dependency array ensures it runs when `isFocus` changes
  

  const getchatlist = async () => {
    const data = await AsyncStorage.getItem('user');
    const user = JSON.parse(data);
    const res = await getuserchat(user?.id, receiverId)


    if (res.success) {
    
      if(res.data?.length > messages?.length){
        flatListRef.current?.scrollToEnd({ animated: true });
      }

      setMessages(res.data)

    }
  }


  const sendMessage = async () => {
    if (!inputText.trim()) return;
  
    try {
      const data = await AsyncStorage.getItem('user');
      const user = JSON.parse(data);
  
      const newMessagePayload = {
        sender_user_id: user?.id,
        receiver_user_id: receiverId,
        message: inputText,
        message_type: 'text',
        attachment: null,
      };
  
      setInputText('');
      const result = await sendchatmessage(newMessagePayload);
  
      if (result.success) {
        console.warn("Message send failed", result);
        await getchatlist();
      }
      
      // Delay the scroll to the end to ensure the messages are updated
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);  // Delay might need to be adjusted depending on your network response time.
    } catch (error) {
      console.error("Sending message failed", error);
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1,backgroundColor:'#fff' }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}

              style={{ marginTop: 8 }}
            >
              <Icon source={images.BackNavs2} size={30} />
            </TouchableOpacity>
            <View>
              <View style={{ flexDirection: 'row', marginLeft: 15 }}>

                <Icon source={icon.boar} size={50} />
                <View style={{ marginLeft: 10 }}>

                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>Jenny Wilson</Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: 'grey' }}>Online</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Greeting */}

          {/* Chat Messages */}
          <View style={{
            flex: 1, padding: 15,
            backgroundColor:'#fff'
          }}>


<FlatList
  ref={flatListRef}
  data={messages}
  showsVerticalScrollIndicator={false}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderMessage}
  onContentSizeChange={() => {
    if (shouldAutoScroll) {
      flatListRef.current?.scrollToEnd({ animated: true });
      setShouldAutoScroll(false);  // Reset after scroll
    }
  }}
/>


            {/* Message Input */}

          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask Chatbot"
              placeholderTextColor="#A1A1A1"
              value={inputText}
              onChangeText={setInputText}
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { }}>
                <Icon size={25} source={icon.mic} />
              </TouchableOpacity>
              <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 10 }}>
                <Icon size={25} source={icon.send} />
              </TouchableOpacity>

            </View>
          </View>
          <View
style={{
  backgroundColor:'#fff',
  height:40
}}
        />
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    backgroundColor: color.buttonColor,
    height: 120,
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  greetingText: {
    fontSize: 22,
    color: '#FFD700',
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
  highlight: {
    color: '#FFD700',
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 70,  // Adjust this value to increase the bottom padding and prevent the footer from overlapping the list
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0063FF',
    padding: 15,
    borderRadius: 30,
    borderTopRightRadius: 0
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#9E9E9E',
    padding: 15,
    borderRadius: 30,
    borderBottomLeftRadius: 0
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  inputContainer: {
    marginHorizontal:20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 10,
    bottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  micIcon: {
    marginLeft: 10,
  },
});
