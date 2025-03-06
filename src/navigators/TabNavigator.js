import { View, Text, Image, Keyboard, Platform, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import _routes from '../routes/routes';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {_routes.BOTTOM_TAB.map((screen) => (
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

// Custom Scrollable Bottom Tab Bar
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ backgroundColor: '#fff', paddingBottom: 10 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: state.routes.length * 80, // Ensures all tabs are scrollable
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
                paddingHorizontal: 15,
                width: 90, // Ensure equal spacing
      marginTop:10
              }}
            >
              <Image
                source={_routes.BOTTOM_TAB[index].logo}
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
