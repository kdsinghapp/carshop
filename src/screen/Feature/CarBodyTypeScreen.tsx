import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import images from "../../component/Image";
import Icon from "../../component/Icon";
import CustomButton from "../../component/CustomButton";

interface CarType {
    id: string;
    name: string;
    image: string;
}

const carTypes: CarType[] = [
    { id: "1", name: "Sedan", image: images.car1 },
    { id: "2", name: "SUV", image: images.car1 },
    { id: "3", name: "Hatchback", image: images.car1 },
    { id: "4", name: "Convertible", image: images.car1 },
    { id: "5", name: "Coupe", image: images.car1 },
    { id: "6", name: "Pickup Truck", image: images.car1 },
];

const CarBodyTypeScreen: React.FC = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: { item: CarType }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon source={images.BackNavs2} size={30} />
                </TouchableOpacity>
                <Text style={styles.title}>Car Body Type</Text>
                <TouchableOpacity onPress={() => console.log("Add New")}>
                    <Icon source={images.add} size={30} />
                </TouchableOpacity>
            </View>

            {/* Grid View */}
            <FlatList
                data={carTypes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
            />

            <CustomButton
                title='Continue'
                buttonStyle={{
                    marginBottom:10,
                    paddingHorizontal:10
                }}
                onPress={() => {
                    navigation.navigate(ScreenNameEnum.CarBodyTypeScreen)
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        marginTop: 30
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    card: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        margin: 8,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 4,
    },
    image: {
        width: 80,
        height: 50,
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
});

export default CarBodyTypeScreen;
