import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import images, { icon } from '../../component/Image';
import CustomHeader from '../../component/CustomHeaderProps';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from '../../component/Icon';
import ScreenNameEnum from '../../routes/screenName.enum';

const { width } = Dimensions.get('window');

const AdminDashboard = ({ navigation }) => {
    const employees = [
        { id: 1, name: 'Terry Botosh', role: 'Car Washer', completed: 110, inProgress: 10, image: images.admindp },
        { id: 2, name: 'Gustavo Vaccaro', role: 'Car Washer', completed: 110, inProgress: 10, image: images.admindp },
        { id: 3, name: 'Jaxson Torff', role: 'Car Washer', completed: 110, inProgress: 10, image: images.admindp },
        { id: 4, name: 'Paityn Rosser', role: 'Car Washer', completed: 110, inProgress: 10, image: images.admindp }
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <CustomHeader
             seconfImg={true}
            navigation={navigation} title="Admin" showSkip={false} style={{ marginTop: -20 }} />

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate(ScreenNameEnum.OvertimeEmploye)
                }}
                style={styles.statCard}>
                    <Text style={styles.statLabel}>Overtime Employees</Text>
                    <Text style={styles.statNumber}>15</Text>
                    <Icon   size={25} source={images.frame} style={{marginTop:10}} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate(ScreenNameEnum.OvertimeHours)
                    }}
                
                style={styles.statCard}>
                    <Text style={styles.statLabel}>Overtime Hours</Text>
                    <Text style={styles.statNumber}>110</Text>
                    <Icon   size={20} source={images.cloack} style={{marginTop:15}} />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>{
                    navigation.navigate(ScreenNameEnum.TotallyTask)
                }}
                
                style={styles.statCard}>
                    <Text style={styles.statLabel}>Total Tasks</Text>
                    <Text style={styles.statNumber}>20</Text>
                    <Icon   size={25} source={images.list} style={{marginTop:10}} />
                </TouchableOpacity>
                <TouchableOpacity 
                      onPress={()=>{
                        navigation.navigate(ScreenNameEnum.AdminProjects)
                    }}
                
                style={styles.statCard}>
                    <Text style={styles.statLabel}>Projects</Text>
                    <Text style={styles.statNumber}>07</Text>
                    <Icon   size={25} source={images.doc} style={{marginTop:10}} />
                </TouchableOpacity>
            </View>

            {/* Employee Section */}
            <Text style={styles.sectionTitle}>Employee Assigned Tasks</Text>
            <ScrollView>
            <FlatList
  data={employees}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.employeeCard}>
      <Image source={item.image} style={styles.employeeImage} />
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.employeeRole}>{item.role}</Text>
        <Text style={styles.employeeStats}>
          Tasks: {item.completed} | Completed: {item.inProgress} | Progress: 92
        </Text>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} >
            <Text style={{fontSize:9,color:'#fff',alignSelf:'center'}}>60%</Text>
          </View>
        </View>
      </View>
    </View>
  )}
/>


            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        width: wp(35),
        alignSelf:'center',
        marginTop: 10,
        backgroundColor: "#F2F2F2",
        height: 13,
        borderRadius: 20,
      },
      progressFill: {
        height: 13,
        borderRadius: 20,
        backgroundColor: "#0063FF",
        alignItems:'center',justifyContent:'center',
        width: "60%", // Adjust as needed
      },
      
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },

    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    statCard: {
        width: width * 0.45,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    statNumber: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    statLabel: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    employeeCard: {
      
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        width: width * 0.42,
        elevation: 3,
        alignItems: 'center',
        justifyContent:'center',
        margin:10
    },
    employeeImage: {
        width: 80,
        height: 80,
       
    },
    employeeInfo: {
        marginLeft: 10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    employeeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    employeeRole: {
        fontSize: 14,
        color: '#0063FF',
        fontWeight:'600'
    },
    employeeStats: {
        fontSize: 12,
        color: '#888',
        textAlign:'center'
    },
});

export default AdminDashboard;
