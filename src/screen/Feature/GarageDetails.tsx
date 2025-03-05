import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../component/CustomHeaderProps';
import { color } from '../../constant';
import images, { icon } from '../../component/Image';
import { hp, wp } from '../../component/utils/Constant';
import Icon from '../../component/Icon';
import CustomButton from '../../component/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';
import VerticalList from '../../component/VerticalList';
import GalleryScreen from '../../component/GalleryScreen';
import ReviewScreen from '../../component/ReviewScreen';
import AddReviewModal from './AddReviewModal';

interface ServiceItem {
  title: string;
  description: string;
}

const GarageDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [showTab, setshowTab] = useState('About us')

  return (
    <View style={styles.container}>
      {/* Header */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Garage Image */}
        <Image source={images.shop} style={styles.garageImage} resizeMode="cover" />

        <TouchableOpacity style={{ position: 'absolute', top: 40, left: 10 }}>
          <Icon source={images.BackNavs2} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', top: 40, right: 10 }}>
          <Icon source={images.Tag} size={30} />
        </TouchableOpacity>


        <View style={{ marginVertical: 15, paddingHorizontal: 20, marginBottom: 60 }}>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.title}>MotoMend Station</Text>

            {/* Distance & Rating */}
            <View style={styles.infoRow}>
              <Icon source={icon.pin} size={16} />
              <Text style={styles.infoText}>6993 Meaddow Valley Terrace, New york</Text>

            </View>
            <View style={styles.infoRow}>

              <Icon source={icon.star} size={16} />
              <Text style={styles.infoText}>4.3 (3,789 reviews)</Text>
            </View>
          </View>
          <View>
            <FlatList
              horizontal
              data={ListItem}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) => (

                <TouchableOpacity style={{
                  marginHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 15
                }}>
                  <Image
                    source={item.icon}

                    style={{ height: 60, width: 60 }}
                  />
                  <Text style={{ marginTop: 10, fontSize: 16, color: '#000', fontWeight: '500' }}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ marginVertical: 10, borderTopWidth: 1, }}>
            <FlatList
              horizontal
              data={InfoList}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              renderItem={({ item }) => (

                <TouchableOpacity
                  onPress={() => {
                    setshowTab(item.name)
                  }}

                  style={{

                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 30,
                    borderWidth: 1,
                    marginVertical: 10,
                    marginRight: 15,
                    borderColor: '#0063FF',
                    backgroundColor: showTab === item.name ? '#0063FF' : '#ffff'
                  }}>

                  <Text style={{ fontSize: 16, color: showTab === item.name ? '#ffff' : '#0063FF', fontWeight: '500' }}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          {showTab === 'About us' &&

            <>
              <View style={{ marginVertical: 15 }}>
                <Text style={{ fontWeight: '500', fontSize: 12 }}>Lorem ipsum dolor sit amet consectetur. Gravida dictum ut dignissim nisl donec. Ut convallis vel eros in. Varius nullam tortor sed laoreet eget orci diam hendrerit fusce. Integer iaculis ultrices enim justo malesuada in sit odio. Egestas arcu gravida eleifend eu in. Auctor malesuada lectus .Read more</Text>
              </View>
              <View style={{ marginVertical: 15 }}>
                <Text style={{ fontWeight: '800', fontSize: 18 }}>Working Hours</Text>
                <Text style={{ fontWeight: '400', fontSize: 14, marginVertical: 10 }}>Monday - Friday    :08:00 AM - 21:00 PM</Text>

                <Text style={{ fontWeight: '400', fontSize: 14 }}>Monday - Friday    :08:00 AM - 21:00 PM</Text>

              </View>
              <View style={{ marginVertical: 15 }}>
                <Text style={{ fontWeight: '800', fontSize: 18 }}>Locatione</Text>
                <View style={styles.infoRow}>
                  <Icon source={icon.pin} size={16} />
                  <Text style={styles.infoText}>6993 Meaddow Valley Terrace, New york</Text>



                </View>
                <TouchableOpacity style={{ marginTop: 20 }}>
                  <ImageBackground
                    source={images.map}

                    style={{ height: hp(20), borderRadius: 20, width: wp(90), alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Image
                      source={images.mapbtn}

                      style={{ height: 100, borderRadius: 20, width: 100, alignSelf: 'center' }}
                    />
                  </ImageBackground>

                </TouchableOpacity>
              </View>
            </>}



          {showTab === 'Services' &&

            <>
              <VerticalList data={data} navigation={navigation}  showBtn={false} />
            </>}
          {showTab === 'Gallery' &&

            <View style={{flex:1}}>
              <GalleryScreen  />
            </View>}
          {showTab === 'Review' &&

            <View style={{flex:1}}>
              <ReviewScreen  />
            </View>}
          <CustomButton
            title='Book'

            onPress={() => {
              navigation.navigate(ScreenNameEnum.BOOKING_COMPLETE)
            }}
          />
        </View>
      </ScrollView>
  
    </View>
  );
};

export default GarageDetails;

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

const InfoList = [
  {
    name: 'About us'
  },
  {
    name: 'Services'
  },
  {
    name: 'Gallery'
  },
  {
    name: 'Review'
  },
]
const ListItem = [
  {
    name: 'Message',
    icon: images.msg
  },
  {
    name: 'Call',
    icon: images.call
  },
  {
    name: 'Direction',
    icon: images.locatei
  },
  {
    name: 'Share',
    icon: images.share
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.baground,
  },
  garageImage: {
    width: '100%',
    height: hp(30),
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 5,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#A0A3BD',
    marginTop: 10,
    lineHeight: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600'
  },
  featureText2: {
    fontSize: 12,
    color: '#A1A1A1',
    marginLeft: 10,
  },
  serviceContainer: {
    marginTop: 20,


    borderRadius: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  serviceText: {
    fontSize: 14,
    color: '#A0A3BD',
    marginTop: 5,
  },
});
