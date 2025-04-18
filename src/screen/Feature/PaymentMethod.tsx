
    import React from 'react';
    import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
    import Icon from '../../component/Icon';
    import images, { icon } from '../../component/Image';
    import CustomButton from '../../component/CustomButton';
    import ScreenNameEnum from '../../routes/screenName.enum';
    
    type Address = {
      id: string;
      title: string;
      details: string;
      icon: string;
    };
    
    const addresses: Address[] = [
      { id: '1', title: 'Pay At Store', details: 'PV2M+H46, No.8, Residency Area, 200 Ro...', icon: icon.shop},
    ]
    
    const PaymentMethod: React.FC = ({navigation}) => {
      return (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity>
            <Icon source={images.BackNavs2} size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Pick Up Address</Text>
          </View>
    
          {/* Address List */}
          <View>
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.addressItem}>
                <Icon source={item.icon} size={40} style={styles.icon} /> 
                <View style={styles.addressText}>
                  <Text style={styles.addressTitle}>{item.title}</Text>
                
                </View>
              </View>
            )}
          />
    </View>
          {/* Add New Button */}
          <TouchableOpacity style={styles.addNewButton}>
            <Text style={styles.addNewText}>“You can cancel the reservation two hours before the 
            reservation time without any fees. If you do not make any changes, you will pay the full reservation fees.”</Text>
          </TouchableOpacity>
          <CustomButton
                    title='Confirm Payment'
                    buttonStyle={{
                        marginTop:48,
                        position:'absolute',
                        bottom:20,
                        width:'100%',
                        alignSelf:'center'
                        
                    }}
                    onPress={() => {
                        navigation.navigate(ScreenNameEnum.PaymentSummary)
                    }}
                />
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
        marginTop:20
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
        borderColor: '#FF3B30',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 15,
        marginBottom:30
      },
      addNewText: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign:'center',
        marginHorizontal:20
      },
    });
    
    export default PaymentMethod;
    