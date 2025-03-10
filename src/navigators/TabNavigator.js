import { View, Text, Image, Keyboard, Platform, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import _routes from '../routes/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [UserTab, setUserTab] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);




  useEffect(() => {


    checkUser()
  }, [])

  const checkUser = async () => {

    const res = await AsyncStorage.getItem('type')


    if (res === 'User') {
      setUserTab(true)
    }
    else {
      setUserTab(false)
    }
  }

  const TABBAR = UserTab ? _routes.BOTTOM_TAB : _routes.COMPANY_TAB
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        display: isKeyboardVisible ? 'none' : 'flex',
        height: 70,
      },
    }}
    tabBar={(props) => <CustomTabBar {...props} TABBAR={TABBAR} />} // ✅ Pass TABBAR as a prop
  >
  
      {TABBAR.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <>
                {screen.lable !== 'Help' ? (
                  <>
                    <Image
                      source={screen.logo}
                      style={{
                        width: 24,
                        height: 24,
                        tintColor: focused ? '#0063FF' : color,
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: '700',
                        color: focused ? '#0063FF' : '#777777',
                        fontSize: 11,
                        marginTop: 5,
                      }}
                    >
                      {screen.lable}
                    </Text>
                  </>
                ) : (
                  <Image source={screen.logo} style={{ height: 50, width: 50 }} />
                )}
              </>
            ),
            tabBarLabel: screen.lable,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation, TABBAR }) {
  const tabCount = state.routes.length; // Get the number of tabs

  return (
    <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
      <ScrollView
        horizontal={tabCount > 4} // Scroll only if there are many tabs
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: tabCount > 4 ? 'flex-start' : 'space-between', // Auto-adjust spacing
          alignItems: 'center',
          minWidth: tabCount > 4 ? tabCount * 80 : '100%', // Ensure full width for fewer tabs
          paddingHorizontal: tabCount <= 3 ? 30 : 0, // Add padding for 3-tab layout
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel;
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={{
                alignItems: 'center',
                width: tabCount <= 3 ? '30%' : 90, // Adjust width for fewer tabs
                marginTop: 10,
              }}
            >
              <Image
                source={TABBAR[index]?.logo}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: isFocused ? '#0063FF' : '#777777',
                }}
              />
              <Text
                style={{
                  fontWeight: '700',
                  color: isFocused ? '#0063FF' : '#777777',
                  fontSize: 11,
                  marginTop: 5,
                  textAlign: 'center',
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

