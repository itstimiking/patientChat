import React, { useEffect, useState, useContext, useRef } from "react";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import { ThemeContext } from "../context/ThemeContext";

import { AppLoading } from 'expo';
import {Button, Text, Content, Header, Title, Right, Left, Icon, Body, Thumbnail, Spinner} from "native-base";

import { View,Linking, StyleSheet, Dimensions, Image, TextInput, ScrollView, Pressable, FlatList, KeyboardAvoidingView} from "react-native";

import ChatItem from "../components/ChatItem";

import { ProfilesContext } from "../context/ProfilesContext";
import ChatRecieved from "../components/ChatRecieved";
import ChatSent from "../components/ChatSent";

import { usePubNub } from "pubnub-react";
import { connect } from 'react-redux';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const appwidth = windowWidth * 0.8;

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const theme = {/* ---- THeme to be gotten from redux or context------*/
    background: "#1e1f36",
    highlight: "#ff0000",
    text: "#fff",
    text2: "#aaa",
    text3: "#555",
};


 
function ChatScreen({user, route, navigation}) {

    const {avatar, id, chatId, firstname, lastname} = route.params;
    
    const chatbox = useRef(null);

    const pubnub = usePubNub();

    const flatList = useRef(null)
    const [messages, addMessage] = useState([]);
    const [message, setMessage] = useState("");
    const [messageCount, setMessageCount] = useState(20);
    const [channels, setChannel] = useState([""]);
    const [userdata, setUserdata] = useState("");
    const [sending, setSending] = useState(false);

    const d = new Date();
    const time = d.getTime();

    const renderItem = ({ item }) => (
        item.uuid === chatId ?(
            <ChatRecieved 
                text={item.message.text}
                picture={item.message.avatar}
                lasttime={moment(item.timetoken/10000).fromNow()}
            />
        ) : (
            <ChatSent
                text={item.message.text}
                picture={item.message.avatar}
                lasttime={moment(item.timetoken/10000).fromNow()}
            />
        )
    );
    
    const sendMessage = message => {

        if(message.length > 0){
            setSending(true)
            pubnub.publish(
                {
                    channel: channels[0],
                    message:{
                        text: message,
                        avatar: "https://image.ibb.co/b4kxGw/zach_1.jpg",
                        fullname: `${userdata.firstname} ${userdata.lastname}`,
                        email: userdata.email
                    }
                },
    
                () => setMessage('')
                
            );
        }
    };

	const getMessages = (cha, num) => {

	 	const channels = [cha]

	 	pubnub.fetchMessages({
			channels: [channels[0]],
			count: num,
			end: time
		},

		(status, data) => {

			if(status.statusCode === 200){

                addMessage([...data.channels[channels]])
                setLoaded(true);
                
            }
			
		})

    }
    
    useEffect(()=>{

        if(user.patient){
            setUserdata(user.patient)

            const chatId = user.patient.chatId

            let channels = [`ch-${chatId}`];

            if(pubnub){

                pubnub.setUUID(user.patient.chatId);

                pubnub.addListener({
                    message: messageEvent => {
                        addMessage([...messages, {
                            channel: messageEvent.channel,
                            message:messageEvent.message,
                            timetoken: messageEvent.timetoken,
                            uuid: messageEvent.publisher,
                        }]);
                        setSending(false)
                    },

                    presence: function(p) {

                        console.log("============ PRESENCE LISTENER ============", p)
                        // handle presence
                        // var action = p.action; // Can be join, leave, state-change, or timeout
                        // var channelName = p.channel; // The channel to which the message was published
                        // var occupancy = p.occupancy; // Number of users subscribed to the channel
                        // var state = p.state; // User State
                        // var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
                        // var publishTime = p.timestamp; // Publish timetoken
                        // var timetoken = p.timetoken;  // Current timetoken
                        // var uuid = p.uuid; // UUIDs of users who are subscribed to the channel
                    },
                });

                // Fetch messaged from pubnub history..............

                if(messages < 1){

                    getMessages(channels[0], messageCount)
                    
                }

                    pubnub.subscribe({ channels });

                    setChannel(channels)

            }
        }

    }, [pubnub, messages, user])


    return (
        <React.Fragment>

            <Header style={styles.header}>
                <Left>

                    <Button transparent onPress={()=> navigation.goBack()}>
                        <Icon type="AntDesign" name="arrowleft" />
                    </Button>

                </Left>
                <Body >

                    <View style={{  
                            flexDirection: "row",
                        }} >

                        <Thumbnail 
                            source={{uri: avatar || "https://image.ibb.co/b4kxGw/zach_1.jpg"}} 
                            style={{width: 30, height: 30, borderRadius: 10, marginRight:10}} 
                        />

                        <Title> {firstname + " " + lastname || "No name"} </Title>
                    </View>
                    
                </Body>
                <Right>
                    <Button transparent onPress={()=> navigation.navigate("appointments")}>
                        <Icon type="AntDesign" name="calendar" />
                    </Button>
                    <Button transparent onPress={()=> Linking.openURL(`tel: 08064655310`)}>
                        <Icon type="AntDesign" name="phone" />
                    </Button>
                </Right>
            </Header>

                {/* ///////// ..Chat box showing messages... ///////////   */}
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{width:"100%", height: windowHeight*0.885, backgroundColor:theme.background}}
                >
                    <ScrollView 
                        ref={chatbox}
                        contentOffset={0, windowHeight*0.8}
                        showsVerticalScrollIndicator={true} 
                        maintainVisibleContentPosition={{minIndexForVisible: messages.length - 1, autoscrollToTopThreshold: 0}}
                        onContentSizeChange={()=>chatbox.current.scrollToEnd({animated: true})}
                        onScrollToTop={()=>{
                            const val = messageCount + 10;
                            getMessages(channels[0], val)
                            setMessageCount(val)
                        }}
                    >

                {/* {
                    messages.length > 1 ? (
                        <FlatList
                            ref={flatList}
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={messg => messg.timetoken}
                            onContentSizeChange={()=> flatList.current.scrollToEnd({animated:true})}
                            
                        />
                    ) : <Spinner color="white" style={{marginHorizontal:"50%", marginVertical:"50%"}} />
                } */} 
                
                            {   messages.length > 1 ?  messages.map((messg, messageIndex) => (
                                        messg.uuid === chatId ?(
                                            <ChatRecieved 
                                                key={`message-${messageIndex}`}
                                                text={messg.message.text}
                                                picture={messg.message.avatar}
                                                lasttime={moment(messg.timetoken/10000).fromNow()}
                                            />
                                        ) : (
                                            <ChatSent
                                                key={`message-${messageIndex}`}
                                                text={messg.message.text}
                                                picture={messg.message.avatar}
                                                lasttime={moment(messg.timetoken/10000).fromNow()}
                                            />
                                        )
                                        
                                    )
                                ) : <Spinner color="white" style={{marginHorizontal:"50%", marginVertical:"50%"}} />
                            } 


                        </ScrollView>
                    <View style={styles.footer}>

                        <View style={styles.formField}>


                            <TextInput
                                autoCapitalize="none"
                                style={styles.formInput}
                                value={message}
                                onChangeText={(text)=> setMessage(text)}
                                placeholder="write message"
                                placeholderTextColor= {theme.text2}
                            />
                            <Icon type="FontAwesome" name="paperclip" style={styles.formIcons}/>
                        </View>

                        <Pressable 
                            style={styles.formSend}
                            
                        >
                            <Button 
                                danger style={styles.sendButton}
                                onPress={()=> sendMessage(message)}
                                disabled={sending}
                            >

                                {sending ? <Spinner color="white" style={{width:50}} /> : <Icon type="FontAwesome" name="send" style={styles.sendIcon} />}

                            </Button>
                        </Pressable>

                    </View>
                </KeyboardAvoidingView>

        </React.Fragment>

    );
}

const styles = StyleSheet.create({

    header:{
        backgroundColor: theme.background, 
        borderBottomColor: theme.text3, 
        borderBottomWidth:1,
        marginTop: Constants.statusBarHeight,
        paddingVertical: 10,
    },
    image: {
        width: "11%",
        height: "100%",
        backgroundColor: "gray",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.text,
        marginRight: "2%",
        marginBottom: "2%",
    },

    footer:{
        height: 70,
        width: "100%",
        padding: 10,
        backgroundColor: theme.background,
        borderTopColor: theme.text3, 
        borderTopWidth:1,
        flexDirection: "row",
    },
    formField:{
        flexDirection: "row",
        backgroundColor: "#444",
        borderRadius: 10,
        paddingHorizontal:15,
        paddingVertical: "2%",
        height: "100%",
        width: "82%"
    },
    formInput:{
        marginRight: 26, 
        width:"80%",
        color: theme.text,
    },
    formIcons:{
        color: theme.text2, 
        fontSize: 18, 
        alignSelf:"center",
        transform: [{ rotate: "90deg" }],
    },

    formSend: {
        marginLeft: 10,
    },
    sendButton:{
        borderRadius: 10,
        backgroundColor: theme.highlight,
        height: "100%",
    },
    sendIcon:{
        fontSize: 16,
    }

});

function mapStateToProps(state) {

    const { user } = state.auth
  
    return { user }
  }
  
export default connect(mapStateToProps)(ChatScreen);