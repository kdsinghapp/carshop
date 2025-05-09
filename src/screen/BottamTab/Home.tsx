import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { color } from '../../constant';
import BannerSlider from '../../component/BannerSlider';
import HomeHeader from '../../component/HomeHeader';
import HorizontalList from '../../component/HorizontalList';
import images from '../../component/Image';
import { hp } from '../../component/utils/Constant';
import SeeallHeader from '../../component/SeeallHeader';
import GarageList from '../../component/GarageList';
import ScreenNameEnum from '../../routes/screenName.enum';
import SearchBar from '../../component/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getdashboard, getuser } from '../../redux/Api/apiRequests';
import Skeleton from 'react-native-reanimated-skeleton';
import { useLocation } from '../../component/LocationContext';

export default function Home() {
  const navigation = useNavigation();
  const [Dashboard, setDashboard] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { locationName, setLocationName } = useLocation();

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const data = await AsyncStorage.getItem('user');
    const user = JSON.parse(data);
    setLoading(true);
    const res = await getdashboard();
    const newUser = await getuser(user?.id);

    if (newUser.success) {

      await AsyncStorage.setItem('user', JSON.stringify(newUser?.data))
    }

    const token = await AsyncStorage.getItem('token');
    setDashboard(res?.data);
    setLoading(false);
    console.log(token);
  };



  return (
    <View style={{ flex: 1, backgroundColor: color.baground }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={images.homebg} style={{ height: hp(25), paddingVertical: 50 }}>
          <HomeHeader
            navigation={navigation}
            location={locationName ? locationName : 'Fetching'}
            hasNotifications={true}
            onLocationPress={() => { navigation.navigate(ScreenNameEnum.SelectLocation) }}
            onNotificationPress={() => console.log('Notifications Pressed')}
          />
        </ImageBackground>

        <View style={{ marginTop: -25, paddingHorizontal: 20 }}>
          <SearchBar placeholder="Search" />
        </View>

        {/* Banner Skeleton or Slider */}
        <View style={{ marginTop: 20 }}>
          {loading ? (
            <Skeleton
              isLoading={loading}
              containerStyle={{ paddingHorizontal: 20 }}
              layout={[
                { key: 'banner1', width: '100%', height: 150, borderRadius: 12, marginBottom: 10 },
              ]}
            />
          ) : (
            <BannerSlider navigation={navigation} data={Dashboard?.banners} />
          )}
        </View>

        {/* Categories Section */}
        <View style={{ paddingVertical: 10 }}>
          <SeeallHeader
            title="Category"
            onSeeAllPress={() => navigation.navigate(ScreenNameEnum.ALL_SERVICES)}
          />
          {loading ? (
            <View style={{ flexDirection: 'row' }}>
              <Skeleton
                isLoading={loading}
                animationType="shiver"
                containerStyle={{ flexDirection: 'row', marginTop: 15 }}
                layout={[
                  { key: 'cat1', width: 60, height: 60, borderRadius: 30, marginLeft: 15 },
                  { key: 'cat2', width: 60, height: 60, borderRadius: 30, marginLeft: 15 },
                  { key: 'cat3', width: 60, height: 60, borderRadius: 30, marginLeft: 15 },
                  { key: 'cat5', width: 60, height: 60, borderRadius: 30, marginLeft: 15 },
                  { key: 'cat6', width: 60, height: 60, borderRadius: 30, marginLeft: 15 },
                  { key: 'cat7', width: 60, height: 60, borderRadius: 30, marginLeft: 15 },
                ]}
              />
            </View>
          ) : (
            <HorizontalList data={Dashboard?.categories} />
          )}
        </View>

        {/* Popular Service Center */}
        <SeeallHeader
          title="Popular Service Center"
          onSeeAllPress={() => console.log('See All Pressed')}
        />
        <View style={{ flex: 1, marginTop: 20 }}>
          {loading ? (
            <Skeleton
              isLoading={loading}
              containerStyle={{ paddingHorizontal: 20 }}
              layout={[
                { key: 'store1', width: '100%', height: 100, borderRadius: 12, marginBottom: 10 },
                { key: 'store2', width: '100%', height: 100, borderRadius: 12, marginBottom: 10 },
              ]}
            />
          ) : (
            <GarageList data={Dashboard?.stores}  refresh={()=>{

              getToken()
            }} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
