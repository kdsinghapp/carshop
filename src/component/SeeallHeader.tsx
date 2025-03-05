import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { color } from '../constant';


interface CategoryHeaderProps {
    title: string;
    onSeeAllPress?: () => void;
}

const SeeallHeader: React.FC<CategoryHeaderProps> = ({ title, onSeeAllPress }) => {
    return (
        <View style={styles.container}>
            {/* Category Title */}
            <Text style={styles.title}>{title}</Text>

            {/* See All Button */}
            {onSeeAllPress && (
                <TouchableOpacity onPress={onSeeAllPress}>
                    <Text style={styles.seeAllText}>View all</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
       
        backgroundColor: color.baground,
        marginTop:20
 
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    seeAllText: {
        fontSize: 14,
        color: '#0063FF',
        fontWeight: '500',
    },
});

export default SeeallHeader;
