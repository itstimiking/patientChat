import React, { useEffect, useState, useContext } from "react";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import { ThemeContext } from "../context/ThemeContext";

import { usePubNub } from "pubnub-react";
import { connect } from 'react-redux';

import {Button, Text, Content, Header, Title, Right, Left, Icon, Body, Thumbnail, Badge} from "native-base";

import { View, StyleSheet, Dimensions, Image, TextInput, ScrollView, Pressable } from "react-native";

import ChatItem from "../components/ChatItem";
import SearchInput from "../components/SearchInput";

import { ProfilesContext } from "../context/ProfilesContext";

import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from "./ChatScreen"

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


function MessagesScreen({user, navigation}) {

    const pubnub = usePubNub();

    const [allPractices, setAllPractices] = useState();
    const [activePractice, setActivePracitce] = useState({});
    const [staffs, setStaffs] = useState([]);
    const [subgroups, setSubgroups] = useState([]);

    const [time, setTime] = useState("Loading");

    const [search, setSearch] = useState(false)

    const getPractice = async (token) => {// ----------------------- Get practice ----------------

        const res = await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/patients/practices",{
            method: 'GET',
            headers: {"Authorization": token}
        });
        
        const data = await res.json();
        setAllPractices(data.patient.practices);
    }

    const changeActivePractice = (practice) => {// --------------------------- Change Active Practice -------

        setActivePracitce(practice)
        
        const id = practice.id;
        const token = user.token;
        console.log(practice, token)
        try{

			fetch(`http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/patients/practices/${id}/staffs`, {
				method: 'GET',
				headers: {"Authorization": token}
			})
			.then(res =>res.json())
			.then(data => {
                console.log(data,"========= staff data =========")
                setStaffs(data.practiceStaffs.staffs)
			})

			// fetch(`http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/practices/${id}/subgroups`, {
			// 	method: 'GET',
			// 	headers: {"Authorization": token}
			// })
			// .then(res =>res.json())
			// .then(data => {
            //     setSubgroups(data.practice.subgroups);
			// })

		}catch(e){

			console.log("------------ Error trying to get subgroups", e)
			
		}

	 };

    useEffect(()=>{

        if(pubnub){
            pubnub.time((status, response) => setTime(response.timetoken));
        }

        const token = user.token;
        const id = user.patient.Id;

        if(allPractices && allPractices.length> 0){
            setActivePracitce(allPractices[0])
        }

        if(activePractice.id){
            changeActivePractice(activePractice)
        }       

        if(!allPractices){
            getPractice(token);
        }

    },[allPractices, activePractice])


    return (
        <React.Fragment>

        <Header style={styles.header}>
            <Left>
                {
                    search ? (
                        <Button transparent onPress={()=> setSearch(!search)}>
                            <Icon type="AntDesign" name="close" />
                        </Button>
                    ) : (
                        <Button transparent onPress={()=> navigation.openDrawer()}>
                            <Icon type="AntDesign" name="bars" />
                        </Button>
                    )
                }
            </Left>

            <Body>
                {!search && <Title>Messages</Title>}
            </Body>

                <Right>

                    {
                        search ? (
                            <Button transparent>
                                <SearchInput />
                            </Button>
                        ) : (
                            <Button transparent onPress={()=> setSearch(!search)}>
                               <Icon type="AntDesign" name="search1" />
                            </Button>
                        )
                    }

                    <Button transparent onPress={()=> navigation.navigate("notifications")} >
                        <Icon type="AntDesign" name="notification" />
                        <Badge danger style={{position:"absolute", right:5}}>
                            <Text>2</Text>
                        </Badge>
                    </Button>
                </Right>
        </Header>

            <Content stickyHeaderIndices={[0]} style={{backgroundColor: theme.background,}}>
                <View style={styles.topThumbnails}>
                    <Content horizontal>

                        {
                            allPractices && allPractices.map(
                                (practx) => {

                                    let name = practx.practiceName;

                                    return (
                                        <Pressable 
                                            key={practx.id} 
                                            style={styles.topThumbnailsItem}
                                            onPress={()=> changeActivePractice(practx)}
                                        >
                                            <Thumbnail source={{uri: practx.logo || "https://image.ibb.co/b4kxGw/zach_1.jpg"}} style={styles.image} />
                                            <Text style={styles.topThumbnailsName}>{name}</Text>
                                        </Pressable>
                                    )
                                
                                }
                            )
                        }

                    </Content>
                </View>

                { 
                    staffs && staffs.map((staff) => (
                        <Pressable key={staff.id} style={styles.topThumbnailsItem}
                            onPress={()=> navigation.navigate("chat", {time:time, ...staff})}
                        >
                            <ChatItem key={staff.id} staff={staff} />

                        </Pressable>
                    ))
                }

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
    online:{
        borderColor:"white", 
        borderWidth:1.5, 
        backgroundColor:"green", 
        borderRadius: 10, 
        width: 13, 
        height: 13, 
        marginTop:-10, 
        alignSelf:"flex-end", 
        marginRight:10
    },

    offline:{
        borderColor:"white", 
        borderWidth:1.5, 
        backgroundColor:"red", 
        borderRadius: 10, 
        width: 13, 
        height: 13, 
        marginTop:-10, 
        alignSelf:"flex-end", 
        marginRight:10
    },
});

function mapStateToProps(state) {
    const { user } = state.auth ;
    return { user }
}
  
export default connect(mapStateToProps)(MessagesScreen);

