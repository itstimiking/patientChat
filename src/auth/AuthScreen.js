import * as React from 'react';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';

import ForgotPassScreen from "./ForgotPassScreen";
import SignUpScreen from "./SignUpScreen";
import LogInScreen from "./LogInScreen";
import LogInScreen2 from "./LogInScreen2";


const theme = {/* ---- THeme to be gotten from redux or context------*/
  background: "#1e1f36",
  highlight: "#ff0000",
  text: "#fff",
  text2: "#aaa",
  text3: "#555",
};


const Stack = createStackNavigator();

export default function AuthScreen() {

  return (
      <Stack.Navigator
        initialRouteName="login"
        headerMode="none"
        screenOptions={{

          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
          headerBackAllowFontScaling: true,

          headerTintColor: theme.text,
          headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          headerStyle: { backgroundColor: theme.background, },
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
        }}

      >

        <Stack.Screen name="login" component={LogInScreen} />
        <Stack.Screen name="signup" component={SignUpScreen} />
        <Stack.Screen name="forgotpass" component={ForgotPassScreen} />
        <Stack.Screen name="login2" component={LogInScreen2} />

      </Stack.Navigator>
  );
}