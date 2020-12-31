import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView} from "react-native";
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from "react-redux";
import store from "./src/redux/store";

import { Container } from "native-base";

import MainScreen from "./src/MainScreen";

import { ProfilesProvider } from "./src/context/ProfilesContext";
import { ThemeContext } from './src/context/ThemeContext';
import {AuthContextProvider} from "./src/context/AuthContext";

import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pubnub = new PubNub({
    publishKey: 'pub-c-094cf6df-cba1-4ce9-93a1-c226c2ecd98b',
    subscribeKey: 'sub-c-3ac6e21e-ec61-11ea-92d8-06a89e77181a',
    autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
  	restore: true, // enable catchup on missed messages
});


function App() {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function setFont() {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                ...Ionicons.font,
            });

            setIsReady(true);

        }

        setFont();
    })

    if (!isReady) {
        return <AppLoading />
    }

    return (
        
        <Provider store={store} >
            <PubNubProvider client={pubnub} >
                <AuthContextProvider>
                    <ProfilesProvider >
                    
                        <Container style={{flex:1}} >
                            
                            
                                <MainScreen />
                                <StatusBar style="light" />
                        
                        </Container>
                    </ProfilesProvider>
            </AuthContextProvider>
            </PubNubProvider>
        </Provider>
    );
}

export default App;
