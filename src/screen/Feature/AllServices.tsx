import React from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import images from '../../component/Image';
import VerticalList from '../../component/VerticalList';
import CustomHeader from '../../component/CustomHeaderProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '../../constant';

// Define the navigation type
type RootStackParamList = {
  AllServices: undefined;
  // Add other screens if needed
};

// Define props for the component
type Props = NativeStackScreenProps<RootStackParamList, 'AllServices'>;

const AllServices: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="Book Service" onSkipPress={() => { }} showSkip={false} />
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginTop:20}}>
      <VerticalList data={data} navigation={navigation}  showBtn={true} />
      </ScrollView>
    </View>
  );
};



// Sample shop list data
const data = [
  {
    name: 'Car Care',
    img: images.c1

  },

  {
    name: 'Mechanice',
    img: images.c3

  },
  {
    name: 'Painter',
    img: images.c2

  },
  {
    name: 'Electric',
    img: images.c4

  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:color.baground,

  },
});

export default AllServices;
