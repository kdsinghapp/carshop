
    import React from 'react';
    import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from '../../component/Icon';
import images, { icon } from '../../component/Image';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';

    const PaymentSummary: React.FC = ({navigation}) => {
      return (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity>
            <Icon source={images.BackNavs2} size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Review Summary</Text>
          </View>
    
          {/* Car Center Info */}
          <View style={styles.card}>
            <Image
              source={images.cd} // Replace with actual image
              style={styles.image}
            />
            <View style={styles.carInfo}>
              <Text style={styles.tag}>Car Washing</Text>
              <Text style={styles.carTitle}>Car Center</Text>
              <Text style={styles.carSubtitle}>0893 Novick Parkway</Text>
              <View style={styles.carDetails}>
                <Icon source={icon.star} size={14}  />
                <Text style={styles.rating}>4.8</Text>
                <Icon source={icon.pin} size={14}  />
                <Text style={styles.distance}>1.2 KM</Text>
                <Icon source={icon.clock} size={14} />
                <Text style={styles.time}>5 Mins</Text>
              </View>
            </View>
          </View>
    
          {/* Booking Details */}
          <View style={styles.detailsContainer}>
            <DetailItem label="Booking Date" value="Jan 02, 2024 | 09:41 AM" />
            <DetailItem label="Car" value="SUV | GR 123-ABCD" />
            <DetailItem label="Service Type" value="Pick-Up" />
          </View>
    
          {/* Price Breakdown */}
          <View style={styles.detailsContainer}>
            <DetailItem label="Exterior Cleaning" value="$50.00" />
            <DetailItem label="Engine Bay Cleaning" value="$24.00" />
            <DetailItem label="Tire Cleaning" value="$12.00" />
            <DetailItem label="Tax & Fees" value="$12.00" />
            <DetailItem label="Total" value="$98.00" isBold />
          </View>
    
          {/* Promo Code */}
          <View style={styles.promoContainer}>
            <TextInput style={styles.promoInput} placeholder="Enter a promo code" />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
                        title='Continue'
                        buttonStyle={{
                            marginTop:48,
                            position:'absolute',
                            bottom:20,
                            width:'100%',
                            alignSelf:'center'
                            
                        }}
                        onPress={() => {
                            navigation.navigate(ScreenNameEnum.Congratulation)
                        }}
                    />
        </View>
      );
    };
    
    // Detail Item Component
    const DetailItem: React.FC<{ label: string; value: string; isBold?: boolean }> = ({ label, value, isBold }) => (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, isBold && { fontWeight: 'bold' }]}>{value}</Text>
      </View>
    );
    
    // Styles
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
        marginVertical: 20,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '28%'
      },
      card: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
      },
      image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
      },
      carInfo: {
        flex: 1,
      },
      tag: {
        backgroundColor: '#007bff',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
        fontSize: 12,
        alignSelf: 'flex-start',
      },
      carTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
      },
      carSubtitle: {
        fontSize: 14,
        color: 'gray',
      },
      carDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
      },
      rating: {
        marginLeft: 5,
        marginRight: 10,
        fontSize: 14,
        fontWeight: 'bold',
      },
      distance: {
        marginLeft: 5,
        marginRight: 10,
        fontSize: 14,
        color: 'gray',
      },
      time: {
        marginLeft: 5,
        fontSize: 14,
        color: 'gray',
      },
      detailsContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
      },
      detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
      },
      detailLabel: {
        fontSize: 14,
        color: 'gray',
      },
      detailValue: {
        fontSize: 14,
        color: 'black',
      },
      promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
      },
      promoInput: {
        flex: 1,
        fontSize: 14,
      },
      applyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
      },
      applyText: {
        color: '#fff',
        fontWeight: 'bold',
      },
    });
    
    export default PaymentSummary;
    