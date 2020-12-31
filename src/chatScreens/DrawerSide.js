import React, {useState, useEffect} from 'react';
import { View, Pressable, TextInput } from 'react-native';
import { Button, Text, Icon, Thumbnail } from "native-base";
import Animated from 'react-native-reanimated';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

import { connect } from 'react-redux';

import { ThemeContext } from '../context/ThemeContext';
import AuthContext from "../context/AuthContext";

const theme = {/* ---- THeme to be gotten from redux or context------*/
  background: "#1e1f36",
  highlight: "#ff0000",
  text: "#fff",
  text2: "#aaa",
  text3: "#555",
};


function MenuItem (props){
    return (
        <Pressable > 

            <Text style={{color:theme.text, marginTop:-10, fontSize: 12}}>
                {props.menu}
            </Text>

        </Pressable>
  );
}

function MenuText ({text}){
    return (

        <Text style={{color:theme.highlight, fontSize:13}}>
            {text}
        </Text>
    );
}

function MenuLine (){
    return (
        <View style={{borderBottomColor:theme.text3, borderBottomWidth:1, width:400}} />
    );
}


function ProfileImage({patient, navi}) {

    
  return (
      <View style={{ 
                paddingTop:20, 
                flexDirection: "row", 
                width: 400,
            }} >

          <Thumbnail
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Group_people_icon.jpg/800px-Group_people_icon.jpg" }}
              width={50}
              height={50}
              style={{ backgroundColor: theme.text3, borderRadius: 10, marginRight: 15 }}
          />

          <View style={{}}>
              <Text style={{fontSize:18, fontWeight:"bold", color:theme.text}}>
                  {patient ? patient.firstname + " " + patient.lastname : "Yeman Howards"}
          </Text>
            
            <Pressable onPress={()=> navi.navigate("profile") }>
                <Text style={{fontSize:13, color:theme.text, paddingVertical:5}}>
                    View Profile
                </Text>
            </Pressable>

          </View>
    </View>

  )
}


function DrawerSide ({ user, navigation, progress, ppp,...rest}) {

    const [patient, setPatient] = useState({})

    React.useEffect(()=> ppp(progress),[progress])

    const op = Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [1,1],
    });

    const translateY = Animated.interpolate(progress, {
      inputRange: [0, 0.2, 1],
      outputRange: [600, 500, 0],
    });

    useEffect(()=>{
        setPatient(user.patient)
    },[patient])

    return (
        <DrawerContentScrollView {...rest}>
            <Animated.View style={{transform: [{translateY}]}}>

                <DrawerItem 
                    label={() => <ProfileImage navi={navigation} patient={patient}/>} 
                    onPress={() => navigation.navigate("profile") }
                    
                />


                <View style={{marginLeft:20, marginVertical:10}}>

                    <MenuLine />

                </View>

                <View style={{marginLeft:20, marginVertical:5}}>

                    <MenuText text="Services" />
                    
                </View>


                <DrawerItem 
                    label={() => <MenuItem menu="Practice" />}
                    icon={()=><Icon type="AntDesign" name="fork"  style={{color:"white", fontSize: 16, marginBottom:10}}/>} 
                    onPress={() => navigation.navigate("grouprequest") } />
                    
                <DrawerItem 
                    label={() => <MenuItem menu="Messages" />}
                    icon={()=><Icon type="AntDesign" name="message1" style={{color:"white", fontSize: 16, marginBottom:10}} />} 
                    onPress={() => navigation.navigate("chatpage") } />

                <DrawerItem 
                    label={() => <MenuItem menu="Appointments" />}
                    icon={()=><Icon type="AntDesign" name="calendar" style={{color:"white", fontSize: 16, marginBottom:10}} />} 
                    onPress={() => navigation.navigate("appointments") } />

                <DrawerItem 
                    label={() => <MenuItem menu="Media" />}
                    icon={()=><Icon type="AntDesign" name="camerao" style={{color:"white", fontSize: 16, marginBottom:10}} />} 
                    onPress={() => navigation.navigate("media") } />


                <View style={{marginLeft:20, marginVertical:10}}>

                    <MenuLine />

                </View>


                <View style={{marginLeft:20, marginVertical:5}}>

                    <MenuText text="Customer Support" />

                </View>

                <DrawerItem 
                    label={() => <MenuItem menu="FAQ" />}
                    icon={()=><Icon type="AntDesign" name="questioncircleo" style={{color:"white", fontSize: 20, marginBottom:10}}/>} 
                    onPress={() => navigation.navigate("") } />

                <DrawerItem 
                    label={() => <MenuItem menu="Log Out" />}
                    icon={()=><Icon type="AntDesign" name="logout" style={{color:"white", fontSize: 16, marginBottom:10}}/>} 
                    onPress={() => ""} />

            
            </Animated.View>
        </DrawerContentScrollView>
    )
};

function mapStateToProps(state) {

    const { user } = state.auth
  
    return { user }
  }
  
export default connect(mapStateToProps)(DrawerSide);