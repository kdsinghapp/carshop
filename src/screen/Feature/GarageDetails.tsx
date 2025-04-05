import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar, TouchableOpacity, FlatList, ImageBackground, Linking, Alert } from 'react-native';
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
import { useRoute } from '@react-navigation/native';
import { getcarservicestoreid, getservicesbycategoryid } from '../../redux/Api/apiRequests';
import GarageDetailSkeleton from '../../component/GarageDetailSkeleton';

interface Store {
  id: number;
  name: string;
  profile_image: string;
  address: string;
  latitude: string;
  longitude: string;
  rating: string;
  description: string;
  name_no: string | null;
  description_no: string | null;
  monday_open: string;
  monday_close: string;
  tuesday_open: string;
  tuesday_close: string;
  wednesday_open: string;
  wednesday_close: string;
  thursday_open: string;
  thursday_close: string;
  friday_open: string;
  friday_close: string;
  saturday_open: string;
  saturday_close: string;
  sunday_open: string;
  sunday_close: string;
}
 interface GalleryItem {
  image: string;
  title: string;
  description: string;
  title_no: string;
  description_no: string;
}

 interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  price: number;
  duration: string;
}

interface Review {
  id: number;
  first_name: string;
  last_name: string;
  rating: number;
  comment: string;
  created_at: string;
  profile_image: string;
}

 interface Tab {
  name: string; // i.e. message.about_us
}

interface WorkingDay {
  day: string;   // i.e. message.monday
  open: string;  // i.e. "08:00 AM"
  close: string; // i.e. "08:00 PM"
}

export interface StoreDetails {
  store: Store;
  gallery: GalleryItem[];
  services: Service[];
  reviews: Review[];
  tabs: Tab[];
  working_days: WorkingDay[];
}

const GarageDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [showTab, setshowTab] = useState('About us')
  const route = useRoute()
  const { id } = route.params

  const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null);
  const [Store, setStore] = useState<Store>();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    allservices()
  }, [id])
  const allservices = async () => {
    setLoading(true);
    const res = await getcarservicestoreid(id);
    if (res.success) {
      setStoreDetails(res?.data);
      setStore(res?.data?.store)
      setGallery(res?.data?.gallery)
      setServices(res?.data?.services)
      setReviews(res?.data?.reviews)
      setTabs(res?.data?.tabs)
      setWorkingDays(res?.data?.working_days)

    }
    setLoading(false);
  };
  const getDayName = (key: string) => {
    const days: { [key: string]: string } = {
      'message.monday': 'Monday',
      'message.tuesday': 'Tuesday',
      'message.wednesday': 'Wednesday',
      'message.thursday': 'Thursday',
      'message.friday': 'Friday',
      'message.saturday': 'Saturday',
      'message.sunday': 'Sunday',
    };
    return days[key] || key;
  };
  const openMapLocation = (latitude: string, longitude: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open Google Maps');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      {loading ? (
        <GarageDetailSkeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Garage Image */}
          <Image source={{uri:Store?.profile_image}} style={styles.garageImage} resizeMode="cover" />


          <TouchableOpacity style={{ position: 'absolute', top: 40, left: 10 }}>
            <Icon source={images.BackNavs2} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', top: 40, right: 10 }}>
            <Icon source={images.Tag} size={30} />
          </TouchableOpacity>


          <View style={{ marginVertical: 15, paddingHorizontal: 20, marginBottom: 60 }}>
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.title}>{Store?.name}</Text>

              {/* Distance & Rating */}
              <View style={styles.infoRow}>
                <Icon source={icon.pin} size={16} />
                <Text style={styles.infoText}>{Store?.address}</Text>

              </View>
              <View style={styles.infoRow}>

                <Icon source={icon.star} size={16} />
                <Text style={styles.infoText}>{Store?.rating}</Text>
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
            <View style={{ marginVertical: 10, borderTopWidth: 1, borderColor: '#D7D7D7', paddingTop: 20 }}>
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
                  <Text style={{ fontWeight: '500', fontSize: 12 }}>{Store?.description}</Text>
                </View>
                <View style={{ marginVertical: 15 }}>
                  <Text style={{ fontWeight: '800', fontSize: 18,marginBottom:10 }}>Working Hours</Text>
                  {workingDays?.map((item, index) => (
        <Text key={index} style={{ fontWeight: '500', fontSize: 14, marginVertical: 4, }}>
          {getDayName(item.day)}: {item.open} - {item.close}
        </Text>
      ))}
                

                </View>
                <View style={{ marginVertical: 15 }}>
                  <Text style={{ fontWeight: '800', fontSize: 18 }}>Locatione</Text>
                  <View style={styles.infoRow}>
                    <Icon source={icon.pin} size={16} />
                    <Text style={styles.infoText}>{Store?.address}</Text>



                  </View>
                  <View style={{ marginTop: 20 }}>
                    <ImageBackground
                      source={images.map}

                      style={{ height: hp(20), borderRadius: 20, width: wp(90), alignItems: 'center', justifyContent: 'center' }}
                    >
                      <TouchableOpacity
                      onPress={()=>{
                        openMapLocation(Store?.latitude,Store?.longitude)
                      }}
                      >
                      <Image
                        source={images.mapbtn}

                        style={{ height: 100, borderRadius: 20, width: 100, alignSelf: 'center' }}
                      />
                      </TouchableOpacity>
                    </ImageBackground>

                  </View>
                </View>
              </>}



            {showTab === 'Services' &&

              <>
                <VerticalList data={services} navigation={navigation} showBtn={false} />
              </>}
            {showTab === 'Gallery' &&

              <View style={{ flex: 1 }}>
                <GalleryScreen gallery={gallery} navigation={navigation}/>
              </View>}
            {showTab === 'Review' &&

              <View style={{ flex: 1 }}>
                <ReviewScreen  Reviews={reviews} navigation={navigation}/>
              </View>}
            <CustomButton
              title='Book'

              onPress={() => {
                navigation.navigate(ScreenNameEnum.CarBodyTypeScreen)
              }}
            />
          </View>
        </ScrollView>
      )}
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
