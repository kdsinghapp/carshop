import 'react-native-gesture-handler';
import React, {FunctionComponent, useEffect} from 'react';

import ScreenNameEnum from '../routes/screenName.enum';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import _routes from '../routes/routes';
import { useLocation } from '../component/LocationContext';
import { getCurrentLocation, locationPermission } from '../component/helperFunction';
const Stack = createNativeStackNavigator();

const RegistrationRoutes: FunctionComponent = () => {


  return (
    <Stack.Navigator
      initialRouteName={ScreenNameEnum.SPLASH_SCREEN}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        
      }}>
      {_routes.REGISTRATION_ROUTE.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RegistrationRoutes;
