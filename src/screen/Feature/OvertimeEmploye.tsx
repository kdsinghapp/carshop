
    import React, { useState } from 'react';
    import { TouchableOpacity,View, Text, TextInput, Image, FlatList, StyleSheet, Dimensions, StatusBar } from 'react-native';
    
    import images, { icon } from '../../component/Image';
    import CustomHeader from '../../component/CustomHeaderProps';
    import { MarkerAnimated } from 'react-native-maps';
    
    const { width } = Dimensions.get('window');
    
    const employees = [
      { id: '1', name: 'Justin Korsgaard', role: 'Car Washer', overtime: '10h 30m', image: images.admindp },
      { id: '2', name: 'Carter Dorwart', role: 'Interior Cleaner', overtime: '10h 30m', image: images.admindp },
      { id: '3', name: 'Jocelyn Geidt', role: 'Detailing Specialist', overtime: '10h 30m', image: images.admindp },
      { id: '4', name: 'Miracle Kenter', role: 'Supervisor', overtime: '10h 30m', image: images.admindp },
      { id: '5', name: 'Jaylon Saris', role: 'Car Washer', overtime: '10h 30m', image: images.admindp },
      { id: '6', name: 'Rayna Donin', role: 'Supervisor', overtime: '10h 30m', image: images.admindp },
    ];
    
    const OvertimeEmploye: React.FC = ({ navigation }: any) => {
      const [search, setSearch] = useState('');
    
      return (
        <View style={styles.container}>
       <StatusBar
       backgroundColor={'#fff'}
       />
      <CustomHeader 
       seconfImg={true}
      navigation={navigation}  title='Overtime Employee'  style={{marginTop:-10}} />
    
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Image source={icon.search} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search..." 
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>
    <View style={{flex:1,marginTop:20}} >
          <FlatList
            data={employees}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.employeeCard}>
                <Image source={item.image} style={styles.employeeImage} />
                <View style={styles.employeeInfo}>
                  <Text style={styles.employeeName}>{item.name}</Text>
                  <Text style={styles.employeeRole}>{item.role}</Text>
                
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        </View>
      );
    };
    
    // **Styles**
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      backIcon: {
        width: 24,
        height: 24,
        tintColor: '#000',
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
      },
      searchContainer: {
        marginTop:20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        marginBottom: 15,
        shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5
      },
      searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#999',
      },
      searchInput: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 14,
        color: '#000',
      },
      employeeCard: {
        flexDirection: 'row',
        marginHorizontal:10,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      },
      employeeImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 15,
      },
      employeeInfo: {
        flex: 1,
      },
      employeeName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      employeeRole: {
        fontSize: 14,
        color: '#0063FF',
        fontWeight: '600',
      },
      overtimeText: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
      },
      progressBarBackground: {
        width: width * 0.6,
        height: 12,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
      },
      progressBarFill: {
        height: 12,
        width: '80%', // 80% progress
        backgroundColor: '#0063FF',
        borderRadius: 20,
      },
    });
    
    export default OvertimeEmploye;
    