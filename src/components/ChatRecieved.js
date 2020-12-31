import React from 'react';

import {Text, Thumbnail} from "native-base";
import { View, Dimensions} from "react-native";

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

const ChatRecieved = ({text, picture, lasttime}) => (

    <View style={{width: "100%", marginTop: 20}}>
        <View style={{flexDirection:"row"}}>

            <View style={{width:"20%", justifyContent: "flex-end", alignItems: "flex-end", paddingRight:10}}>
                <Thumbnail 
                    source={{uri: picture ? picture : "https://image.ibb.co/b4kxGw/zach_1.jpg"}} 
                    style={{width: 35, height: 35, borderRadius: 10}} 
                />
            </View>

            <View 
                style={{
                    maxWidth: "60%", 
                    backgroundColor: theme.text3, 
                    paddingVertical: 8, 
                    paddingHorizontal: 16,
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20, 
                    borderBottomEndRadius: 20
                }}
            >
                <Text style={{color: theme.text, fontSize: 13}}>
                        {text ? text : ""}
                </Text>
            </View>
        </View>
            
        <Text style={{fontSize: 11, color: theme.text3, paddingLeft: "20%", marginTop: 4}}>
            {lasttime ? lasttime : "No time"}
        </Text>
        
    </View>

);

export default ChatRecieved;
