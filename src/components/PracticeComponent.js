import React, { useEffect, useState, useContext } from "react";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';


import { ThemeContext } from "../context/ThemeContext";

import { Button, Text, Content, Header, Title, Right, Left, Icon, Body, Thumbnail } from "native-base";
import { View, StyleSheet, Dimensions, Image, TextInput, ScrollView, Alert } from "react-native";


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


export default PracticeComponent = ({ practice, getpractx, token, id}) => {

    const pending = practice.requests.filter(val=> val.id === id );
    const member = practice.patients.filter(val=> val.id === id);

    const practiceId = practice.id;
    const Id = id ;


    const joinPractice = (practiceId, patientToken, patientId) => {

        fetch(`http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/patients/practices/${practiceId}/request`, {
            method: 'POST',
            headers: {"Authorization": patientToken}
        }).then(res=> res.json()).then(response=> {
            pending.push({id: patientId})
            getpractx()
        }).catch(err=> console.log(err))

    }

    useEffect(()=>{

        

    }, [practice])

    return (        
            <View style={{
                borderColor: theme.text3, 
                borderRadius: 30,
                borderWidth: 1,
                marginBottom: 15
            }}>

                    <View style={{ padding:20, flexDirection: "row", borderBottomWidth: 1, borderColor: theme.text3,  }} >
                        <Thumbnail
                            source={{ uri: practice.logo }}
                            width={50}
                            height={50}
                            style={{ backgroundColor: theme.text3, borderRadius: 10, marginRight: 15 }}
                        />

                        <View style={{}}>
                            <Text style={styles.heading}>

                                {practice.practiceName}

                            </Text>

                            <Text style={{ color: theme.text2, fontSize: 13 }}>

                                { `website: ${practice.website}`}

                            </Text>
                        </View>
                    </View>

                    <View style={{padding: 20}}>

                        <View style={{flexDirection:"row"}}>

                        <Thumbnail
                            source={{ uri: "https://image.ibb.co/b4kxGw/zach_1.jpg" }}
                            width={50}
                            height={50}
                            small
                        />
                        <Thumbnail
                            source={{ uri: "https://image.ibb.co/fQKPww/kennith_1.jpg" }}
                            width={50}
                            height={50}
                            style={{marginLeft:-16}}
                            small
                        />
                        <Thumbnail
                            source={{ uri: "https://image.ibb.co/j4Ov3b/darth_vader_1.png" }}
                            width={50}
                            height={50}
                            style={{marginLeft:-16}}
                            small
                        />
                        <Thumbnail
                            source={{ uri: "https://image.ibb.co/dM6hib/tara_1.jpg" }}
                            width={50}
                            height={50}
                            style={{marginLeft:-16}}
                            small
                        />
                        <Thumbnail
                            source={{ uri: "https://image.ibb.co/iasYpG/ash_1.jpg" }}
                            width={50}
                            height={50}
                            style={{marginLeft:-16}}
                            small
                        />

                        <Text style={{color: theme.text2, fontSize: 13, marginTop: 8, marginLeft:10}}>+20 Members</Text>

                        </View>

                        {pending.length > 0 ? (
                            <Button 
                                style={{ 
                                    marginTop: 20, 
                                    width: "100%", 
                                    justifyContent: "center", 
                                    backgroundColor: "transparent", 
                                    borderRadius: 15, 
                                    borderColor: theme.highlight, 
                                    borderWidth: 1 
                                }}
                                disabled
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{color: theme.highlight}}>Pending</Text>
                                </View>
                            </Button>
                        ) 
                        : member.length > 0 ? (
                            <Button 
                                style={{ 
                                    marginTop: 20, 
                                    width: "100%", 
                                    justifyContent: "center", 
                                    backgroundColor: "transparent", 
                                    borderRadius: 15, 
                                    borderColor: "green", 
                                    borderWidth: 1 
                                }}
                                disabled
                            >

                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{color:"green"}}> You are a member </Text>
                                </View>
                            </Button>)
                            : ( <Button 
                                    style={{ 
                                        marginTop: 20, width: "100%", justifyContent: "center", 
                                        backgroundColor: "green", borderRadius: 15, borderColor: theme.text3, 
                                        borderWidth: 1 
                                    }}   
                                    onPress ={()=>joinPractice(practiceId, token, Id)}
                                >

                                    <View style={{ flexDirection: "row" }}>
                                        <Text> Join Practice </Text>
                                    </View>
                                </Button>
                                )}

                    </View>

                </View>

    )
}




const styles = StyleSheet.create({

    heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.text,
    },
    text: {
        color: theme.text2,
        paddingVertical: 20,
        fontSize: 13
    },
    header: {
        backgroundColor: theme.background,
        borderBottomColor: theme.text3,
        borderBottomWidth: 1,
        marginTop: Constants.statusBarHeight,
    },
    image: {
        width: 50,
        height: 50,
        backgroundColor: "gray",
        borderRadius: 15,
        marginRight: 10
    },
    topThumbnails: {
        paddingVertical: 10,
        paddingLeft: 15,
        backgroundColor: theme.background,
    },
    topThumbnailsItem: {
        marginRight: 5,
    },
    topThumbnailsName: {
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

    dot: {
        backgroundColor: "green",
        borderRadius: 10,
        justifyContent: "flex-end",
        width: 9,
        height: 9,
        marginRight: 5,
        alignSelf: "center"
    },
});