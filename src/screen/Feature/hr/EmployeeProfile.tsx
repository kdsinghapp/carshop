import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomHeader from '../../../component/CustomHeaderProps';
import images, { icon } from '../../../component/Image';
import Icon from '../../../component/Icon';

const EmployeeProfile: React.FC = ({}) => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                backgroundColor={'#fff'}
            />
            <CustomHeader
                seconfImg={true}
                navigation={navigation}
                title=''
                style={{ marginTop: -10 }}
            />

            {/* Profile Info */}
            <View style={styles.profileSection}>
                <Image source={images.dp} style={styles.profileImage} />
                <Text style={styles.name}>Terry Botosh</Text>
                <Text style={styles.position}>Car Washer (Wash Bay)</Text>

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.callButton}>
                        <Icon source={icon.call} size={18} />
                        <Text style={styles.buttonText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageButton}>
                        <Icon source={icon.message} size={18} />
                        <Text style={styles.buttonText}>Message</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Employee Details */}
            <View style={styles.detailsSection}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>


                    <Text style={styles.value}>Employee ID</Text>
                    <Text style={styles.label}>CLT-0024</Text>
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.value}>Team</Text>
                    <Text style={styles.label}>Car Interior Wash</Text>
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.value}>Date of Join</Text>
                    <Text style={styles.label}>1st Jan 2025</Text>
                </View>
            </View>

            {/* Basic Info */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Basic Information</Text>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.value}>Phone:</Text>
                    <Text style={styles.label}>(963) 2469 315</Text>
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.value}>Email:</Text>
                    <Text style={styles.label}>peralt32@example.com</Text>
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.value}>Gender:</Text>
                    <Text style={styles.label}>Male</Text>
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.value}>Birthday:</Text>
                    <Text style={styles.label}>24th July 2000</Text>
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.value}>Address:</Text>
                    <Text style={styles.label}>1888 Bayonne Ave, Norway, 89759</Text>
                </View>
                
   
                
               
                
            </View>

            {/* Privacy */}
            <View style={styles.section}>
            <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}><View>

                <Text style={styles.value}>Primary:</Text>
                <Text style={[styles.label,{marginTop:-0,color:'#0063FF'}]}>Adrian Peralt Father</Text>
                </View>
    
                    <Text style={styles.label}>+1 127 2865 538</Text>
                </View>
            <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View>

                    <Text style={styles.value}>Secondary:</Text>
                    <Text style={[styles.label,{marginTop:-0,color:'#0063FF'}]}>Karen Wills Mother</Text>
                    </View>
                    <Text style={styles.label}>+1 127 2865 538</Text>
                </View>
                
            </View>

            {/* About Employee */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About Employee</Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean egestas magna at porttitor vehicula.
                </Text>
            </View>

            {/* Work Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                <Text style={styles.listItem}>* 5 years in vehicle detailing</Text>
                <Text style={styles.listItem}>* Expertise in deep cleaning and waxing</Text>
                <Text style={styles.listItem}>* Certified in auto detailing</Text>
            </View>

            {/* Assigned Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Assigned Projects</Text>

                {[1, 2, 3].map((item) => (
                    <View key={item} style={styles.projectCard}>
                        <Image source={images.carcare} style={styles.projectImage} />
                        <View>
                            <Text style={styles.projectTitle}>Interior Cleaning</Text>
                            <View style={{
                                flexDirection:'row',alignItems:'center'
                            }}>
<Icon

source={icon.calendy}
style={{height:15,width:15,tintColor:'#0063FF'}}

/>
                            <Text style={styles.projectTime}>20 March 2025</Text>
                        </View>
                            <View style={{
                                flexDirection:'row',alignItems:'center'
                            }}>
<Icon

source={images.list}
style={{height:15,width:15,tintColor:'#0063FF'}}

/>
                            <Text style={styles.projectTime}>12/15</Text>
                        </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default EmployeeProfile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        margin: 15,
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    position: {
        fontSize: 14,
        color: '#0063FF',
        marginBottom: 10,
        fontWeight: '600'
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    callButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 10,
        width: '45%',
        justifyContent: 'center',
    },
    messageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 10,
        width: '45%',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600',
    },
    detailsSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#0063FF'
    },
    infoText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    listItem: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },
    projectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
    },
    projectImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    projectTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    projectTime: {
        fontSize: 13,
        color: '#000',
        marginLeft:5
    },
});
