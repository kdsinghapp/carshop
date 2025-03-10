import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import CustomHeader from "../../component/CustomHeaderProps";
import CustomButton from "../../component/CustomButton";
import { icon } from "../../component/Image";

const SupportScreen: React.FC = ({ navigation }) => {
    const [message, setMessage] = useState("");

    return (
        <View style={styles.container}>
            {/* Header */}

            <CustomHeader title='Support' navigation={navigation} style={{ marginTop: 0 }} />


            <View style={{ flex: 1, padding: 20 }}>
                <Text style={styles.label}>How can we help?</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Type here..."
                    multiline
                    value={message}
                    onChangeText={setMessage}
                />

                {/* Illustration */}
                <Image
                    source={icon.supporta} // Replace with actual image URL
                    style={styles.image}
                    resizeMode="contain"
                />

                {/* Submit Button */}

            </View>
            <CustomButton
                buttonStyle={{ marginHorizontal: 20, bottom: 20 }}
                title="Submit"
            />
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
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 5,
    },
    textArea: {
        height: 100,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#f9f9f9",
        textAlignVertical: "top",
    },
    image: {
        width: "100%",
        height: 300,
        marginVertical: 50,
   
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SupportScreen;
