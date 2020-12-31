import React, { useEffect, useState, useContext } from "react";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import { ThemeContext } from "../context/ThemeContext";

import {Button, Text, Content, Header, Title, Right, Left, Icon, Body, Thumbnail} from "native-base";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { View, StyleSheet, Dimensions, Image, TextInput, ScrollView } from "react-native";
import Appointment from "../components/Appointment";

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


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

export const MessagesStack = ()=>(
    <Stack.Navigator
        initialRouteName="login"
        // headerMode="none"
        // screenOptions={{

        //   headerTitleAlign: "center",
        //   headerTitleAllowFontScaling: true,
        //   headerBackAllowFontScaling: true,

        //   headerTintColor: theme.text,
        //   headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
        //   headerStyle: { backgroundColor: theme.background, },
        // }}

      >
          <Stack.Screen name="messages" component="Appointments" />
      </Stack.Navigator>
)


function AppointmentsScreen({navigation}) {


    return (
        <React.Fragment>

            <Header style={styles.header}>
                <Left>

                    <Button transparent onPress={()=> navigation.goBack()}>
                        <Icon type="AntDesign" name="arrowleft" />
                    </Button>

                </Left>
                <Body >
                    <Title> Appointments </Title>
                </Body>
                <Right/>
            </Header>

            <Content style={{backgroundColor:theme.background,}} >
               <Calendar 
                onDayPress={(day) => {console.log('selected day', day)}}

                markingType={'custom'}
                markedDates={{
                    '2020-09-25': {
                        customStyles: {
                            container: {
                              backgroundColor: theme.highlight,
                              borderRadius: 10,
                            }},
                            selected: true, marked: true, /*{selectedColor: theme.highlight}*/},
                    
                  }}      

                theme={{
                    backgroundColor: theme.backgroundColor,
                    calendarBackground: theme.backgroundColor,
                    textSectionTitleColor: theme.text,
                    textSectionTitleDisabledColor: "yellow",
                    selectedDayBackgroundColor: theme.highlight,
                    selectedDayTextColor: theme.text2,
                    todayTextColor: theme.highlight,
                    dayTextColor: theme.text2,
                    textDisabledColor: theme.text3,
                    dotColor: '#00adf5',
                    selectedDotColor: theme.highlight,
                    arrowColor: theme.text,
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: theme.text,
                    indicatorColor: theme.text,
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
               />

               <Text style={{margin: 20, color:theme.text, fontWeight:"bold"}}>Today's Appointment</Text>

               <Appointment color="indigo" icon="phone" call="Voice call" />
               <Appointment color="orange" icon="camera" call="Video call"/>
               <Appointment color="indigo" icon="phone" call="Voice call"/>
               
                
            </Content>

        </React.Fragment>

    );
}

const styles = StyleSheet.create({

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
    image: {
        width: 50,
        height: 50,
        backgroundColor: "gray",
        borderRadius: 15,
        marginRight: 10
    },
    topThumbnails:{
        paddingVertical: 10,
        paddingLeft: 15,
        backgroundColor:theme.background,
    },
    topThumbnailsItem:{
        marginRight: 5,
    },
    topThumbnailsName:{
        color: theme.text2,
        fontSize: 12,
        textAlign: "center",
        width: 50,
    },

    flexrow: {
        flexDirection: "row",
        flexWrap: "nowrap",
        flexGrow: 1,
    },

    card: {
        width: "100%",
        paddingVertical: 16,
        borderBottomColor: theme.text3,
        borderBottomWidth: 0.5,
    },
    cardbody: {
        flexDirection: "row",
        flexWrap: "nowrap",
        flexGrow: 1,
        borderRightWidth: 1,
        paddingHorizontal: 16,
        width: "100%",
    },
    cardhead: {
        flexDirection: "row",
        width: windowWidth * 0.74,
    },

    notificationHeader: {
        color: theme.text,
        fontSize: 12,
        fontWeight: "bold",
        flex: 2,
    },
    
    notificationBody: {
        marginTop: 5,
        fontSize: 12,
        paddingRight: 80,
        color: theme.text2,
        fontWeight: "bold",
    },
    notificationBody2: {
        color: "green",
        fontSize: 11,
    },

    dot:{
        backgroundColor:"green", 
        borderRadius: 10, 
        justifyContent:"flex-end",
        width: 9, 
        height: 9, 
        marginRight: 5,
        alignSelf: "center"
    },
});


export default AppointmentsScreen;
