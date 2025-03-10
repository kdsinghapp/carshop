import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import CustomHeader from '../../component/CustomHeaderProps';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import Icon from '../../component/Icon';
import { icon } from '../../component/Image';

interface PaymentMethod {
    id: string;
    name: string;
    icon: any;
    status?: string;
    balance?: string;
    maskedCard?: string;
}

const paymentMethods: PaymentMethod[] = [
    {
        id: '1',
        name: 'Wallet',
        icon: require('../../assets/icons/wall.png'), // Replace with actual wallet icon
        balance: '$10.00',
    },
    {
        id: '2',
        name: 'PayPal',
        icon: require('../../assets/icons/paypal.png'), // Replace with actual PayPal icon
        status: 'Connected',
    },
    {
        id: '3',
        name: 'Card',
        icon: require('../../assets/icons/mater.png'), // Replace with actual card icon
        maskedCard: '**** **** **** 8709',
        status: 'Connected',
    },
];

const PaymentMethods = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <CustomHeader navigation={navigation} title="Payment Methods" showSkip={false} />
            <View style={{ flex: 1, padding: 10,marginTop:40 }}>
                <FlatList
                    data={paymentMethods}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.paymentItem}>
                            <Image source={item.icon} style={styles.icon} />
                            <View style={styles.details}>
                                <Text style={styles.name}>{item.name}</Text>
                                
                                {item.maskedCard && <Text style={styles.maskedCard}>{item.maskedCard}</Text>}
                            </View>
                            {item.balance && <Text style={styles.balance}>{item.balance}</Text>}
                            {item.balance && <Icon source={icon.rightarrow}  size={25}/>}
                            {item.status && <Text style={styles.status}>{item.status}</Text>}
                        </TouchableOpacity>
                    )}
                />
            </View>
            {/* Add Button */}
            <CustomButton
                title="Add"
                onPress={() => { navigation.navigate(ScreenNameEnum.BOTTAM_TAB); }}
                buttonStyle={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        bottom: 20
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 5,

    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paymentItem: {
        margin:10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        justifyContent: 'space-between',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    details: {
        flex: 1,
        marginLeft: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    balance: {
        fontSize: 14,
        color: '#666',
    },
    maskedCard: {
        fontSize: 14,
        color: '#666',
    },
    status: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: '600',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PaymentMethods;
