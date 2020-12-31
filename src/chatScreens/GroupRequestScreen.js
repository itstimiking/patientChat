import React, { useEffect, useState, useContext } from "react";
import { connect, useDispatch } from "react-redux";
import { AppLoading } from 'expo';

import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

import { ThemeContext } from "../context/ThemeContext";
import * as Actions from "../redux/auth/actions";

import { Button, Text, Content, Header, Title, Right, Left, Icon, Body, Thumbnail } from "native-base";
import { View, StyleSheet, Dimensions, Image, TextInput, ScrollView } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';

import PracticeComponent from "../components/PracticeComponent";

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



function GroupRequestScreen({user, practices, navigation}) {

    const dispatch = useDispatch();
    const token = user.token;
    const id = user.patient.id;

    const [allPractices, setAllPractices] = useState([]);

    const resetPracticeList = ()=>{
        dispatch(Actions.patientGetAllPracticesSaga(token))
    }


    useEffect(()=>{

        dispatch(Actions.patientGetAllPracticesSaga(token))

        if(practices){
            setAllPractices(practices.practices.rows)
        }
        
    },[practices])


    return (
        <React.Fragment>

            <Header style={styles.header}>
                <Left>

                    <Button transparent onPress={()=> navigation.openDrawer()}>
                        <Icon type="AntDesign" name="bars" />
                    </Button>

                </Left>
                <Body >
                    <Title>Practices</Title>
                </Body>
                <Right/>
            </Header>

            <Content style={{ padding: 20, backgroundColor:theme.background, }}>

                

                {allPractices ?  allPractices.map( practx => (
                            <PracticeComponent 
                                practice={practx} 
                                token={token} 
                                key={practx.id} 
                                id={id} getpractx={resetPracticeList}
                            />
                        )
                    ) : <AppLoading />
                }
                
            </Content>

        </React.Fragment>

    );
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


function mapStateToProps(state) {
    const { user, practices } = state.auth ;
    return { user, practices }
}




export default connect(mapStateToProps)(GroupRequestScreen);
