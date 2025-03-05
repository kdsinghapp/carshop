import { View, Text, ScrollView, ImageBackground, StatusBar } from 'react-native'
import React from 'react'
import { color } from '../../constant'
import BannerSlider from '../../component/BannerSlider'
import { useNavigation } from '@react-navigation/native'
import HomeHeader from '../../component/HomeHeader'
import HorizontalList from '../../component/HorizontalList'
import images from '../../component/Image'
import { hp } from '../../component/utils/Constant'
import SeeallHeader from '../../component/SeeallHeader'
import VerticalList from '../../component/VerticalList'
import GarageList from '../../component/GarageList'
import ScreenNameEnum from '../../routes/screenName.enum'
import SearchBar from '../../component/SearchBar'

export default function Home({ }) {

  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: color.baground }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false} >
        <ImageBackground
          source={images.homebg}

          style={{ height: hp(25), paddingVertical: 50 }}
        >


          <HomeHeader
            navigation={navigation}
            location="Wallace, Australia"
            hasNotifications={true}
            onLocationPress={() => console.log("Location Pressed")}
            onNotificationPress={() => console.log("Notifications Pressed")}
          />
        </ImageBackground>
        <View style={{ marginTop: -25, paddingHorizontal: 20 }}>
          <SearchBar placeholder='Search' />

        </View>
        <BannerSlider navigation={navigation} />
        <View style={{paddingVertical:10}}>
          <SeeallHeader
            title="Category"
            onSeeAllPress={() => { navigation.navigate(ScreenNameEnum.ALL_SERVICES) }}
          />
          <HorizontalList data={data} />
        </View>
        <SeeallHeader
          title="Popular Service Center"
          onSeeAllPress={() => console.log("See All Pressed")}
        />
        <View style={{ flex: 1, marginTop: 20 }}>
          <GarageList
            data={shopList}
          />
        </View>
      </ScrollView>
    </View>
  )
}

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

const shopList = [
  {
    name: 'Car Center',
    location: 'Grand Park New',
    distance: '2.5',
    logo: images.cd
  },
  {
    name: 'Car wash',
    location: 'Grand Park New',
    distance: '2.5',
    logo: images.cd
  },
]