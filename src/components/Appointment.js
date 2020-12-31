import React, { useEffect, useState, useContext } from "react";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import { ThemeContext } from "../context/ThemeContext";

import {Button, Text, Content, Header, Title, Right, Left, Icon, Body, Thumbnail} from "native-base";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { View, StyleSheet, Dimensions, Image, TextInput, ScrollView } from "react-native";

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


const Appointment = ({color, icon, call}) => (

    <View style={styles.card}>
        <View style={styles.cardbody}>
            <View>
                <Thumbnail
                    source={{}}
                    style={styles.image}
                />

            </View>
            <View style={{ width: "70%" }}>
                <View style={styles.cardhead}>

                    <Text style={styles.notificationHeader}>
                        Dr John Snow
                            </Text>

                </View>

                <Text
                    style={styles.notificationBody}
                >
                    09:00 AM - 12:00 PM
                            </Text>

                {/* ........ call text............. */}

                <View style={{ ...styles.flexrow, marginTop: 3 }} >

                    <View
                        style={{...styles.dot, backgroundColor: color}}
                    />

                        <Text
                            style={{...styles.notificationBody2, color: color}}
                        >

                            {call}
                        
                        </Text>

                    </View>

                </View>

            <View style={{ justifyContent: 'flex-end', }}>
                <Button style={{ backgroundColor: color, borderRadius: 10, marginBottom: 5 }} >
                    <Icon type="AntDesign" name= {icon} style={{ fontSize: 11, width: 8, height: 8, margin: 0 }} />
                </Button>
            </View>
        </View>
    </View>
);

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

export default Appointment;
