import * as React from 'react';
import { View, Text } from 'react-native';
import { AppLoading } from 'expo';
import Animated from 'react-native-reanimated';

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerSide from "./DrawerSide";

import MessagesScreen from "../chatScreens/MessagesScreen";
import ProfileScreen from "../chatScreens/ProfileScreen";
import GroupRequestScreen from "../chatScreens/GroupRequestScreen";
import AppointmentsScreen from "../chatScreens/AppointmentsScreen";
import NotificationScreen from "../chatScreens/NotificationScreen";
import MediaScreen from "../chatScreens/MediaScreen";
import ChatScreen from "./ChatScreen";

import { ThemeContext } from '../context/ThemeContext';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';


const theme = {/* ---- THeme to be gotten from redux or context------*/
  background: "#1e1f36",
  highlight: "#ff0000",
  text: "#fff",
  text2: "#aaa",
  text3: "#555",
};

const Stack = createStackNavigator();
function Chat() {
  return (
    <Stack.Navigator
        initialRouteName="messages"
        headerMode="none"
    >
      <Stack.Screen name="messages" component={MessagesScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
      <Stack.Screen name="notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();



export default function ChatStack(props) {

  const [progress, setProgress] = React.useState(new Animated.Value)

  const scale = Animated.interpolate(props.progress, {
    inputRange: [0, 0.2, 1],
    outputRange: [600, 500, 0],
  });

  const screenStyle = {transform: [{scale}]};

  return (
      <Drawer.Navigator
        initialRouteName="grouprequest"
        drawerType="slide"
        drawerStyle={{backgroundColor:theme.background}}
        drawerContent={(props) => <DrawerSide {...props}  ppp={setProgress}/>}
        backBehavior="initialRoute"

        // overlayColor="transparent"
        // drawerContentOptions={{
        //   activeBackgroundColor:"red",
        //   activeTintColor:"green",
        //   inactiveTintColor:"purple",
        //   inactiveBackgroundColor:"yellow",
        // }}
        // sceneContainerStyle={{
        //   backgroundColor:"transparent",
        // }}
        // screenOptions={{
        //   headerTitleAlign: "center",
        //   headerTitleAllowFontScaling: true,
        //   headerBackAllowFontScaling: true,
        // }}
        // contentContainerStyle={{flex:1}}
      >
        
        
        <Drawer.Screen name="grouprequest" component={GroupRequestScreen} />
        <Drawer.Screen name="appointments" component={AppointmentsScreen} />
        <Drawer.Screen name="chatpage" component={Chat} />
        <Drawer.Screen name="profile" component={ProfileScreen} />
        <Drawer.Screen name="media" component={MediaScreen} />
        
      </Drawer.Navigator>
  );
}



