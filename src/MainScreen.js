import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './utils/NavigationUtil';

import ChatStack from "./chatScreens/ChatStack";
import AuthScreen from './auth/AuthScreen';

import {connect} from "react-redux";

const Stack = createStackNavigator();

function MainStack (){

    return (
        <Stack.Navigator
          initialRouteName="NoAuth"
          headerMode="none"
        >
  
            <Stack.Screen name="NoAuth" component={AuthScreen } />
            <Stack.Screen name="Authenticated" component={ChatStack} />

        </Stack.Navigator>
    );
  
}


function MainScreen({user}) {

    return (
        <NavigationContainer ref={navigationRef} >
            <MainStack user={user} />
        </NavigationContainer>
    )   
}

function mapStateToProps(state) {
    const { user } = state.auth
    return { user }
}


export default connect(mapStateToProps)(MainScreen);