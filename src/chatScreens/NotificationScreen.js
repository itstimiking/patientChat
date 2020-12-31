import React, { useEffect, useState, useContext } from "react";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import { ThemeContext } from "../context/ThemeContext";

import {
    Button,
    Text,
    Content,
    CheckBox,
    Header,
    Title,
    Right,
    Left,
    Icon,
    Container,
    Body,
    Card,
    CardItem
} from "native-base";

import { View, StyleSheet, Dimensions, Image, TextInput, ScrollView } from "react-native";

import NotificationItem from "../components/NotificationItem";

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import { LOGO } from "../../assets/images";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const appwidth = windowWidth * 0.8;

const theme = {/* ---- THeme to be gotten from redux or context------*/
    background: "#1e1f36",
    highlight: "#ff0000",
    text: "#fff",
    text2: "#aaa",
    text3: "#555",
};



function NotificationScreen({navigation}) {

    return (
        <React.Fragment>

            <Header style={styles.header}>
                <Left>

                    <Button transparent onPress={()=> navigation.goBack()}>
                        <Icon type="AntDesign" name="arrowleft" />
                    </Button>

                </Left>
                <Body >
                    <Title>Notifications</Title>
                </Body>
                <Right/>
            </Header>

            <Content style={styles.container}>
                <Text style={styles.date}>
                    31st Aug, 2020
                </Text>

                <NotificationItem status={{status:"", time:"2 min Ago",type:"photos"}}/>
                <NotificationItem status={{status:"new", time:"5 days Ago", type:"text"}}/>
                <NotificationItem status={{status:"", time:"2 weeks Ago", type:"appointment"}}/>
                <NotificationItem status={{status:"new", time:"2 weeks Ago", type:"report"}}/>
                <NotificationItem status={{status:"new", time:"5 days Ago", type:"text"}}/>


            </Content>

        </React.Fragment>

    );
}

const styles = StyleSheet.create({

    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: theme.background,
    },
    date:{
        fontSize: 20, 
        fontWeight:"bold", 
        color: theme.text2, 
        paddingTop: 20, 
        paddingLeft: 10
    },
    header:{
        backgroundColor: theme.background, 
        borderBottomColor: theme.text3, 
        borderBottomWidth:1,
        marginTop: Constants.statusBarHeight,
    },
});


export default NotificationScreen;
