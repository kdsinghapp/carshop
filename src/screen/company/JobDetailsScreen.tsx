import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    StatusBar,
} from "react-native";
import CustomHeader from "../../component/CustomHeaderProps";
import { wp } from "../../component/utils/Constant";
import Icon from "../../component/Icon";
import { icon } from "../../component/Image";
import { color } from "../../constant";
import CustomButton from "../../component/CustomButton";

const JobDetailsScreen: React.FC = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
               <StatusBar
        backgroundColor={'#fff'}
      />
            <View style={styles.headerContainer}>
                <CustomHeader
                    showSkip={false}
                    navigation={navigation}
                    title="Details"
                />
            </View>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
                    style={styles.profileImage}
                />
                <View style={styles.contactIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon source={icon.chats} size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon source={icon.Call2x} size={45} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.profileName}>Phillip Mango</Text>
                <View style={styles.infoRow}>
                    <Icon source={icon.pin} size={15} />
                    <Text style={styles.infoText}>3539 Hill Haven Drive Tacoma, WA 98402</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon source={icon.clock} size={15} />
                    <Text style={styles.infoText}>Time: 9:30am</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon source={icon.send} size={15} />
                    <Text style={styles.infoText}>Distance to request: 4.25 miles</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon source={icon.calendy} size={12} style={styles.dateIcon} />
                    <Text style={styles.infoText}>Date: 10/07/2019</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Job Description</Text>
                <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Amet proin leo mi nunc massa.
                    Vestibulum dolor ac facilisis sem aliquam pulvinar.
                </Text>

                {/* Services */}
                <Text style={styles.sectionTitle}>Service</Text>
                <FlatList
                    data={[1, 2, 3]}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.serviceBox}>
                            <Icon source={icon.raincar} size={40} />
                            <Text style={styles.serviceText}>Exterior Cleaning</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Customer Note */}
                <Text style={styles.sectionTitle}>Customer Note</Text>
                <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Amet proin leo mi nunc massa.
                </Text>
            </View>
            {/* Complete Button */}
            <CustomButton
                title="Start"
                onPress={() => {}}
                buttonStyle={styles.buttonStyle}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
   
        width: wp(100),
        marginTop: -20,
    },
    profileContainer: {
        alignItems: "center",
        marginVertical: 15,
        marginTop: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    contactIcons: {
        flexDirection: "row",
        marginTop: 10,
    },
    iconButton: {
        padding: 10,
        borderRadius: 30,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "bold",
        color: color.buttonColor,
    },
    infoContainer: {
        width: wp(100),
        paddingHorizontal: 20,
        marginVertical:10
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:8
    },
    infoText: {
        fontSize: 14,
        color: "#666",
        marginVertical: 2,
        marginLeft: 10,
    },
    dateIcon: {
        tintColor: color.buttonColor,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007AFF",
        marginVertical: 10,
    },
    descriptionText: {
        fontSize: 14,
        color: "#444",
        marginBottom: 10,
    },
    serviceBox: {
        backgroundColor: "#fff",
        padding: 12,
        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    serviceText: {
        fontSize: 16,
        color: "#333",
        fontWeight: '600',
        marginLeft: 15,
    },
    buttonStyle: {
        marginHorizontal: 10,
        marginVertical: 20,
    },
});

export default JobDetailsScreen;
