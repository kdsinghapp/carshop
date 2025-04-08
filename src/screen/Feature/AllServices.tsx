import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
import VerticalList from '../../component/VerticalList';
import CustomHeader from '../../component/CustomHeaderProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '../../constant';
import { getservicesbycategoryid } from '../../redux/Api/apiRequests';
import { useRoute } from '@react-navigation/native';
import { wp } from '../../component/Constant';

type RootStackParamList = {
  AllServices: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AllServices'>;

const AllServices: React.FC<Props> = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;

  const [Service, setService] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    allservices();
  }, [id]);

  const allservices = async () => {
    setLoading(true);
    const res = await getservicesbycategoryid(id);
    if (res.success) {
      setService(res?.data);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
       <SafeAreaView style={{flex:1}}>
      <CustomHeader navigation={navigation} title="Book Service" onSkipPress={() => { }} showSkip={false}  style={{marginTop:25}}/>
     
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20 }}>
        <Skeleton
          isLoading={loading}
          containerStyle={styles.skeletonContainer}
          layout={[
            { key: 's1', width: '90%', height: 100, marginBottom: 10, borderRadius: 10 },
            { key: 's2', width: '90%', height: 100, marginBottom: 10, borderRadius: 10 },
            { key: 's3', width: '90%', height: 100, marginBottom: 10, borderRadius: 10 },
          ]}
        >
          {
            Service?.length > 0 ? (
              <View style={{
              width:wp(90)
              }}>

                <VerticalList data={Service} navigation={navigation} showBtn={true} />
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No service found</Text>
              </View>
            )
          }
        </Skeleton>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AllServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.baground,
  },
  skeletonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
  },
});
