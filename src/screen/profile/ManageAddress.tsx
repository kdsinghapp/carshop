
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from '../../component/Icon';
import images, { icon, } from '../../component/Image';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import { listaddress } from '../../redux/Api/apiRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface Address {
  id: number;
  user_id: number;
  title: string;
  address: string;
  latitude: string;
  longitude: string;
  is_default: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User;
}
const ManageAddress: React.FC = ({ navigation }) => {
  const [User, setUser] = useState<string>();
  const [AddressList, setAddressList] = useState<Address[]>([]);

  useEffect(() => {

    const getUser = async () => {
      const data = await AsyncStorage.getItem('user');
      const user = JSON.parse(data);
      setUser(user)
    }
    getUser()
  }, [])
  useEffect(() => {
    getAddress()
  }, [User?.id])


  const getAddress = async () => {

    const res = await listaddress(User?.id)
    if (res.success) {

      setAddressList(res?.data)
    }

  }

  const checkIcon = (name: string) => {
    if (name === 'Home') return icon.addhome;
    if (name === 'Office') return icon.addoffice;
    if (name === 'Favorites') return icon.addfav;
    return icon.default; // Fallback icon
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Icon source={images.BackNavs2} size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Address</Text>
      </View>

      {/* Address List */}
      <View>
        {AddressList?.length > 0 ? <FlatList
          data={AddressList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.addressItem}>
              <Icon source={checkIcon(item.title)} size={40} style={styles.icon} />
              <View style={styles.addressText}>
                <Text style={styles.addressTitle}>{item.title}</Text>
                <Text style={styles.addressDetails}>{item.address}</Text>
              </View>
            </View>
          )}
        /> :
          <View style={{
            height: 50, alignItems: 'center', justifyContent: 'center'
          }}>
            <Text style={{
              color: '#000', fontWeight: '600'
            }}>No Address</Text>
          </View>
        }
      </View>
      {/* Add New Button */}
      <TouchableOpacity style={styles.addNewButton}>
        <Text style={styles.addNewText}>Add New</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: '25%',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 10,
  },
  addressText: {
    flex: 1,
    width:'80%'
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressDetails: {
    fontSize: 14,
    color: 'gray',
  },
  addNewButton: {
    marginTop: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#0063FF',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 30
  },
  addNewText: {
    color: '#0063FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageAddress;
