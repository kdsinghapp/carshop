import React from 'react';
import {
    View,
    Text,
    StatusBar,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { color } from '../../constant';
import images, { icon } from '../../component/Image';
import { hp } from '../../component/utils/Constant';
import FontSizeText from '../../component/utils/FontSizeText';
import ScreenNameEnum from '../../routes/screenName.enum';

const Welcome: React.FC = ({navigation}) => {
    const data: number[] = [1, 2, 3];

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <ImageBackground source={images.welcome} style={styles.imageBackground} />

            <View style={styles.textContainer}>
                <FontSizeText style={styles.title}>
                    Explore
                    <FontSizeText style={styles.highlight}> Car Services </FontSizeText>
                    by interactive Map
                </FontSizeText>

                <FontSizeText style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporncididunt
                </FontSizeText>
            </View>

            <View style={styles.paginationContainer}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={icon.leftblue} />
                </TouchableOpacity>
                <View style={{marginTop:15}}>
                    <FlatList
                        data={data}
                        horizontal
                        renderItem={({ item, index }) => (
                            <View
                                style={[
                                    styles.dot,
                                    { opacity: index === 1 ? 1 : 0.5 }
                                ]}
                            />
                        )}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity
                onPress={()=>{
                    navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
                }}
                >
                    <Image style={styles.icon} source={icon.rightblue} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.baground,
    },
    imageBackground: {
        height: hp(70),
    },
    textContainer: {
        marginTop: 40,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
    },
    highlight: {
        fontSize: 24,
        fontWeight: '600',
        color: '#0063FF',
    },
    description: {
        fontSize: 16,
        fontWeight: '500',
        color: '#9DB2BF',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    icon: {
        height: 40,
        width: 40,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#0063FF',
        marginLeft: 2,
    },
});

export default Welcome;
