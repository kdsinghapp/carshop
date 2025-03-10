
import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from "react-native";
import Icon from "../../component/Icon";
import { icon } from "../../component/Image";
import { wp } from "../../component/utils/Constant";
import { color } from "../../constant";
import ScreenNameEnum from "../../routes/screenName.enum";

interface Order {
    id: string;
    name: string;
    image: string;
    location: string;
    time: string;
    date: string;
}

const ordersData: Order[] = [
    {
        id: "1",
        name: "Desirae Donin",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        location: "3239 Hill Haven Drive Tacoma, WA 98402",
        time: "9:30am",
        date: "10/07/2019",
    },
    {
        id: "2",
        name: "Hanna Franci",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        location: "3239 Hill Haven Drive Tacoma, WA 98402",
        time: "9:30am",
        date: "10/07/2019",
    },
    {
        id: "3",
        name: "Haylie Kenter",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        location: "3239 Hill Haven Drive Tacoma, WA 98402",
        time: "9:30am",
        date: "10/07/2019",
    },
    {
        id: "4",
        name: "Allison Torff",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        location: "3239 Hill Haven Drive Tacoma, WA 98402",
        time: "9:30am",
        date: "10/07/2019",
    },
    {
        id: "5",
        name: "Wilson Gouse",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        location: "3239 Hill Haven Drive Tacoma, WA 98402",
        time: "9:30am",
        date: "10/07/2019",
    },
];

const CompanyHome: React.FC = ({navigation}) => {
    const [selectedTab, setSelectedTab] = useState("Today Orders");

    return (
        <View style={styles.container}>
           <StatusBar
        backgroundColor={'#fff'}
      />
            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp(90), justifyContent: 'space-between' }}>

                <View>

                    <Text style={styles.welcomeText}>Welcome,</Text>
                    <Text style={styles.userName}>Johan Smiths</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Icon source={icon.filler} size={40} />
                    <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate(ScreenNameEnum.NotificationScreen)
                    }}
                    >

                    <Icon source={icon.noti} size={40} style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Tab Navigation */}
            <View style={styles.tabsContainer}>
                {["Today Orders", "Coming Orders", "Pending Order"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabButton,
                            selectedTab === tab && styles.activeTabButton,
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedTab === tab && styles.activeTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Orders List */}
            <FlatList
                data={ordersData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate(ScreenNameEnum.JobDetailsScreen)
                    }}
                    style={styles.orderCard}>
                        <Image source={{ uri: item.image }} style={styles.profileImage} />
                        <View style={styles.orderDetails}>
                            <Text style={styles.orderName}>{item.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon source={icon.pin}
                                    style={{ tintColor:  '#909090'}}
                                    size={15} />
                                <Text style={styles.orderLocation}>{item.location}</Text>
                            </View>
                            <View style={styles.orderTimeDate}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Icon source={icon.clock}
                                        style={{ tintColor: '#909090' }}
                                        size={15} />
                                    <Text style={styles.orderTime}>{item.time}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginLeft:10
                                }}>
                                    <Icon source={icon.calendy}
                                        style={{ tintColor: '#909090'}}
                                        size={15} />
                                    <Text style={styles.orderTime}>{item.date}</Text>
                                </View>

                            </View>
                        </View>
                        <TouchableOpacity>
                            <Icon source={icon.rightarrow}
                                style={{ tintColor: color.buttonColor }}
                                size={20} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#007AFF",
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#000",
    },
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    activeTabButton: {
        borderBottomColor: "#007AFF",
    },
    tabText: {
        fontSize: 14,
        color: "#888",
    },
    activeTabText: {
        color: "#007AFF",
        fontWeight: "bold",
    },
    orderCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    orderDetails: {
        flex: 1,
    },
    orderName: {
        fontSize: 16,
        fontWeight: "bold",
        color: color.buttonColor,
    },
    orderLocation: {
        fontSize: 10,
        color: "#666",
        marginLeft: 5
    },
    orderTimeDate: {
        flexDirection: "row",

        marginTop: 5,
    },
    orderTime: {
        fontSize: 12,
        color: "#333",
        marginLeft: 5
    },
    orderDate: {
        fontSize: 12,
        color: "#333",
    },
    arrow: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF",
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
    },
    navIcon: {
        fontSize: 20,
        color: "#007AFF",
    },
});

export default CompanyHome;
