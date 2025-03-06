
    import React from 'react';
    import { View, StyleSheet,ScrollView } from 'react-native';
    import images from '../../component/Image';
    import VerticalList from '../../component/VerticalList';
    import CustomHeader from '../../component/CustomHeaderProps';
    import { NativeStackScreenProps } from '@react-navigation/native-stack';
    import { color } from '../../constant';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
    
    // Define the navigation type
    type RootStackParamList = {
      AllServices: undefined;
      // Add other screens if needed
    };
    
    // Define props for the component
    type Props = NativeStackScreenProps<RootStackParamList, 'AllServices'>;
    
    const CarList: React.FC<Props> = ({ navigation }) => {
      return (
        <View style={styles.container}>
          <CustomHeader navigation={navigation} title="Select Vehicle" onSkipPress={() => { }} showSkip={false} />
         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginTop:20}}>
          <VerticalList data={data} navigation={navigation}  showBtn={true}  />
          </ScrollView>
          <CustomButton
                title='Continue'
                buttonStyle={{
                    marginBottom:0,
                    marginHorizontal:10
                }}
                onPress={() => {
                    navigation.navigate(ScreenNameEnum.BookServiceScreen)
                }}
            />
        </View>
      );
    };
    
    
    
    // Sample shop list data
    const data = [
      {
        name: 'Toyota Fortuner',
        details:'Car 5 seater',
        img: images.c1
    
      },
    
      {
        name: 'Audi',
        details:'Car 5 seater',
        img: images.c1
    
      },
      {
        name: 'Hyundai verna',
        details:'Car 5 seater',
        img:  images.c1
    
      },
      {
        name: 'Kia',
        details:'Car 5 seater',
        img:  images.c1
    
      },
    ]
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:color.baground,
        paddingVertical:30
      },
    });
    
    export default CarList;
    