import React from "react";
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { icon } from "../../component/Image";
import { color } from "../../constant";
import Icon from "../../component/Icon";
import CustomButton from "../../component/CustomButton";
import CustomHeader from "../../component/CustomHeaderProps";

const ProfileScreen: React.FC = ({navigation}) => {
    const photos = [
        icon.addhome,

    ];

    return (
        <View style={styles.container}>
      <CustomHeader
       seconfImg={true}
      seconfImg={true} navigation={navigation} title='Edit Profile' showSkip={false}  style={{marginTop:0}}/>

            <View style={styles.profileImageContainer}>
                <Image source={icon.profileUpdate} style={styles.profileImage} />
                <TouchableOpacity style={styles.addIcon}>
                    <Icon source={icon.pencile} size={25} />
                </TouchableOpacity>
            </View>

  <View style={{
    flex:1,marginTop:30,  padding:20,
  }}>
            <TextInput style={styles.input} placeholder="Joylen" />
            <TextInput style={styles.input} placeholder="Lavin" />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Lorem ipsum dolor sit amet consectetur..."
                multiline
            />
            <TextInput style={styles.input} placeholder="New York City" />
            <TextInput style={styles.input} placeholder="joylenlavin@gmail.com" />
            <TextInput style={styles.input} placeholder="$50" keyboardType="numeric" />

            {/* Photos Section */}
            <Text style={styles.photoTitle}>Photo</Text>
            <FlatList
                data={[...photos, "add", "add"]}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    item === "add" ? (
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addText}>+</Text>
                        </TouchableOpacity>
                    ) : (
                        <Image source={item} style={styles.photo} />
                    )
                }
            />
            </View>

            <CustomButton

            title="Edit"
            buttonStyle={{marginHorizontal:15,marginBottom:10}}
            onPress={()=>{}}
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
    profileContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImageContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    addIcon: {
        marginTop: -25,
        right: -30,
        borderWidth: 1,
        borderColor: color.white,
        borderRadius: 30,
        padding: 1,
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 10,
        backgroundColor: "#007bff",
        borderRadius: 12,
        padding: 4,
    },
    editText: {
        fontSize: 14,
        color: "#fff",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    photoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 15,
        marginRight: 8,
    },
    addButton: {
        width: 50,
        height: 50,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: color.buttonColor,
        borderStyle: 'dashed',
        borderRadius: 15,
        backgroundColor: "#fff",
    },
    addText: {
        fontSize: 24,
        color: "#007bff",
    },
});

export default ProfileScreen;
