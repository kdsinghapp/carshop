
    import React, { useState } from 'react';
    import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
    
    import CustomHeader from '../../../component/CustomHeaderProps';
    import images, { icon } from '../../../component/Image';
    import Icon from '../../../component/Icon';
    import ScreenNameEnum from '../../../routes/screenName.enum';
    
    interface Holiday {
        id: string;
        title: string;
        description: string;
        date: string;
        status: string;
    }
    
    const initialHolidays: Holiday[] = [
        { id: '1', title: 'New Year', description: 'First day of the new year', date: '01 Jan 2024', status: 'Active' },
        { id: '2', title: 'Christmas', description: 'Celebration of Christmas', date: '25 Dec 2024', status: 'Active' },
        { id: '3', title: 'Independence Day', description: 'National holiday', date: '04 Jul 2024', status: 'Active' },
        { id: '4', title: 'Labor Day', description: 'International Workers’ Day', date: '01 May 2024', status: 'Active' },
    ];
    
    const RequestLeave: React.FC = ({ navigation }) => {
        const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
        const [search, setSearch] = useState<string>('');
    
        const handleDelete = (id: string) => {
            Alert.alert('Delete Holiday', 'Are you sure you want to delete this holiday?', [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => {
                        const updatedHolidays = holidays.filter((holiday) => holiday.id !== id);
                        setHolidays(updatedHolidays);
                    },
                    style: 'destructive',
                },
            ]);
        };
    
        const handleEdit = (id: string) => {
            Alert.alert('Edit Holiday', `You selected to edit holiday with ID: ${id}`);
        };
    
        const filteredHolidays = holidays.filter((holiday) =>
            holiday.title.toLowerCase().includes(search.toLowerCase()) ||
            holiday.description.toLowerCase().includes(search.toLowerCase())
        );
    
        const renderHoliday = ({ item }: { item: Holiday }) => (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Name</Text>
                    <Text style={styles.cardDate}>Status</Text>
                    <TouchableOpacity onPress={() => handleEdit(item.id)}>
                            <Icon source={icon.edit} size={20} />
                        </TouchableOpacity>
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.cardValue}>{item.title}</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>Approved</Text>
                    </View>
             
                        <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginTop: 10 }}>
                            <Icon source={icon.redtras} size={20} />
                        </TouchableOpacity>
                </View>
    
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Date From</Text>
                    <Text style={styles.cardDate}>Date To</Text>
                    </View>
                <View style={styles.cardHeader}>
                <Text style={styles.cardValue}>March 20,2025</Text>
                <Text style={styles.cardValue}>March 20,2025</Text>
            
                    </View>
              
            </View>
        );
    
        return (
            <View style={styles.container}>
                <CustomHeader
                    seconfImg={true}
                    navigation={navigation} title="Request Leave" showSkip={false} style={{ marginTop: -20 }} />
    
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
    
                {/* Holiday List */}
                <FlatList
                    data={filteredHolidays}
                    keyExtractor={(item) => item.id}
                    renderItem={renderHoliday}
                    showsVerticalScrollIndicator={false}
                />
    
                {/* Add Button */}
    
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(ScreenNameEnum.AddLeaveRequestForm)
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 20, right: 15
                    }}>
                    <Icon
                        size={60}
    
                        source={images.addpluse}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    
    export default RequestLeave;
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            marginLeft: 10,
        },
        searchContainer: {
            marginTop: 20,
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
    
        },
        searchInput: {
            flex: 1,
            paddingLeft: 10,
            fontSize: 14,
            color: '#000',
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: 10,
            margin: 5,
            padding: 20,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        cardTitle: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        cardDate: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        cardBody: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        cardValue: {
            fontSize: 14,
            color: '#333',
        },
        label: {
            fontWeight: 'bold',
            color: '#777',
            marginTop: 10,
        },
        cardDescription: {
            fontSize: 14,
            color: '#555',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            alignItems: 'center',
        },
        statusBadge: {
            backgroundColor: '#34C759',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 15,
        },
        statusText: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
        },
        actions: {
    
        },
        addButton: {
            backgroundColor: '#007bff',
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 20,
            right: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        },
    });
    