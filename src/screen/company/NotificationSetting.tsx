
import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import CustomHeader from "../../component/CustomHeaderProps";

const NotificationSetting: React.FC = ({ navigation }) => {
    const [notifications, setNotifications] = useState({
        general: true,
        sound: false,
        vibrate: false,
        updates: true,
        tips: true,
    });

    const toggleSwitch = (key: keyof typeof notifications) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View style={styles.container}>
            {/* Header */}

            <CustomHeader
                title="Notification"
                showSkip={false}
                style={{marginTop:0}}
                navigation={navigation}
                seconfImg={true}
            />



            <View style={styles.option}>
                <Text style={styles.optionText}>General Notification</Text>
                <Switch
                    value={notifications.general}
                    onValueChange={() => toggleSwitch("general")}
                    trackColor={{ false: "#ddd", true: "#007bff" }}
                    thumbColor="#fff"
                />
            </View>

            <View style={styles.option}>
                <Text style={styles.optionText}>Sound</Text>
                <Switch
                    value={notifications.sound}
                    onValueChange={() => toggleSwitch("sound")}
                    trackColor={{ false: "#ddd", true: "#007bff" }}
                    thumbColor="#fff"
                />
            </View>

            <View style={styles.option}>
                <Text style={styles.optionText}>Vibrate</Text>
                <Switch
                    value={notifications.vibrate}
                    onValueChange={() => toggleSwitch("vibrate")}
                    trackColor={{ false: "#ddd", true: "#007bff" }}
                    thumbColor="#fff"
                />
            </View>

            <View style={styles.option}>
                <Text style={styles.optionText}>App Updates</Text>
                <Switch
                    value={notifications.updates}
                    onValueChange={() => toggleSwitch("updates")}
                    trackColor={{ false: "#ddd", true: "#007bff" }}
                    thumbColor="#fff"
                />
            </View>

            <View style={styles.option}>
                <Text style={styles.optionText}>New Tips Available</Text>
                <Switch
                    value={notifications.tips}
                    onValueChange={() => toggleSwitch("tips")}
                    trackColor={{ false: "#ddd", true: "#007bff" }}
                    thumbColor="#fff"
                />
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        padding: 20,
    },
    optionText: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default NotificationSetting;
