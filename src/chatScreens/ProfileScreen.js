import React, { useEffect, useState, useContext } from "react";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';

import {Button, Text, Content, Header, Title, Right, Left, Icon, Body, Thumbnail} from "native-base";

import { View, StyleSheet, Dimensions, Image, TextInput, Alert, Modal, Pressable } from "react-native";

import { Formik } from 'formik';
import { AVATARPICK } from "../../assets/images";

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



function ProfileScreen({user, navigation}) {

    const [patient, setPatient] = useState({})

    const [modalVisible, setModalVissibility] = useState(false);

    const [address, setAddress] = useState("3097 Perry Street, Bloomfield Township, MI, Michigan 48302, US");
    const [status, setStatus] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loypesetting industry.")


    const editPatientProfile = async (values) =>{
        await fetch("http://practxbestaging-env.eba-6m7puu5w.us-east-2.elasticbeanstalk.com/api/patients", {
            method: 'PATCH',
            headers: [["Authorization", user.token], ["Content-Type", "application/json"] ],
            body: JSON.stringify({
                dob: `${values.MM}/${values.DD}/${values.YY}`,
                mobileNo: values.mobileNo,
                firstname: values.firstname,
                lastname: values.lastname
            })
        }).then(res=>res.json()).then(data => {

            if(data.patient){
                console.log(data.message)
                alert(data.message)
                navigation.navigate("login2")
            }else{
                alert(data.errors)
            }
            
        }).catch((err)=>{
            console.log(err, "=========== Error trying to edit profile =========")
            alert("Error: Please make sure you have internet connection.")
        })
    }


    useEffect(()=>{
        setPatient(user.patient)
    },[patient])

    return (
        <React.Fragment>

            <Header style={styles.header}>
                <Left>

                    <Button transparent onPress={()=> navigation.goBack()}>
                        <Icon type="AntDesign" name="arrowleft" />
                    </Button>

                </Left>
                <Body >
                    <Title> Profile </Title>
                </Body>
                <Right>
                    <Button
                        onPress={()=>setModalVissibility(!modalVisible)}
                        transparent
                    > 
                        <Text style={{color:theme.text}}>Edit</Text>
                        
                        <Icon type="AntDesign" name="edit" style={{fontSize:13, color:theme.text2}} />

                    </Button>
                </Right>
            </Header>



            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                presentationStyle="fullScreen"
                onRequestClose={()=>setModalVissibility(false)}
                style={{backgroundColor:theme.background}}
            >   

                <View
                    style={{backgroundColor:theme.background, flex:1, padding:20}}
                >

                    <Button transparent onPress={()=> setModalVissibility(false) }>
                        <Icon type="AntDesign" name="close" style={{color: theme.text}} />
                    </Button>

                    <Formik
                        initialValues={{
                            firstname: "",
                            lastname: "",
                            DD:'', 
                            MM:'', 
                            YY:'',
                            mobileNo: "", 
                            email: 'itstimiking@gmail.com', 
                            password:'xxxxxx' }}
                        onSubmit={values => {editPatientProfile(values)}}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View>

                                <Pressable animation="pulse"
                                    onPress={()=> console.log("========= AVATAR -------")}
                                >
                                    <Image
                                        style={styles.avatar}
                                        source={AVATARPICK}
                                        resizeMode="contain"
                                        
                                    />
                                    <Text style={{color:theme.text2, alignSelf:"center", fontSize:13}}>Select Avatar image</Text>
                                </Pressable>


                                <View style={styles.formField}>

                                    <Icon type="FontAwesome" name="user-circle-o" style={styles.formIcons}/>
                                    <TextInput
                                        autoCapitalize="words"
                                        autoCompleteType="name"
                                        placeholder="First Name"
                                        textContentType="givenName"
                                        placeholderTextColor={theme.text3}
                                        style={styles.formTextInput}
                                        onChangeText={handleChange('firstname')}
                                        onBlur={handleBlur('firstname')}
                                        value={values.firstname}
                                    />
                                </View>


                                <View style={styles.formField}>

                                    <Icon type="FontAwesome" name="user-circle-o" style={styles.formIcons}/>
                                    <TextInput
                                        autoCapitalize="words"
                                        autoCompleteType="name"
                                        placeholder="Last Name"
                                        textContentType="familyName"
                                        placeholderTextColor={theme.text3}
                                        style={styles.formTextInput}
                                        onChangeText={handleChange('lastname')}
                                        onBlur={handleBlur('lastname')}
                                        value={values.lastname}
                                    />
                                </View>


                                {/* --------------------------------------- DATE SECTION --------------------------------------- */}


                                <Text style={{marginTop: 20, color: theme.text2, marginLeft: 10, fontSize: 14,}}>Date of Birth</Text>


                                <View style={styles.formFieldRow}>
                                    <View style={{...styles.formField, width: appwidth * 0.25}}>

                                        <Icon type="FontAwesome" name="calendar" style={styles.formIcons}/>
                                        <TextInput
                                            autoCapitalize="none"
                                            autoCompleteType="cc-exp"
                                            placeholder="DD"
                                            maxLength={2}
                                            placeholderTextColor={theme.text3}
                                            style={{marginLeft: 10}}
                                            onChangeText={handleChange('DD')}
                                            onBlur={handleBlur('DD')}
                                            value={values.DD}
                                        />
                                    </View>

                                    <View style={{...styles.formField, width: appwidth * 0.25}}>

                                        <Icon type="FontAwesome" name="calendar" style={styles.formIcons}/>
                                        <TextInput
                                            autoCapitalize="none"
                                            autoCompleteType="cc-exp-month"
                                            placeholder="MM"
                                            maxLength={2}
                                            placeholderTextColor={theme.text3}
                                            style={{marginLeft: 10, }}
                                            onChangeText={handleChange('MM')}
                                            onBlur={handleBlur('MM')}
                                            value={values.MM}
                                        />
                                    </View>
                                    <View style={{...styles.formField, width: appwidth * 0.25}}>

                                        <Icon type="FontAwesome" name="calendar" style={styles.formIcons}/>
                                        <TextInput
                                            autoCapitalize="none"
                                            autoCompleteType="cc-exp-year"
                                            placeholder="YY"
                                            maxLength={4}
                                            placeholderTextColor={theme.text3}
                                            style={{marginLeft: 10}}
                                            onChangeText={handleChange('YY')}
                                            onBlur={handleBlur('YY')}
                                            value={values.YY}
                                        />
                                    </View>
                                </View>

                                <View style={styles.formField}>

                                    <Icon type="FontAwesome" name="phone" style={styles.formIcons}/>
                                    <TextInput
                                        autoCapitalize="none"
                                        autoCompleteType="tel"
                                        textContentType="telephoneNumber"
                                        placeholder="Phone Number"
                                        placeholderTextColor={theme.text3}
                                        style={{marginLeft: 26, ...styles.formTextInput}}
                                        onChangeText={handleChange('mobileNo')}
                                        onBlur={handleBlur('mobileNo')}
                                        value={values.mobileNo}
                                    />

                                </View>

                                <View styel={styles.loginButtonView}>
                                {/*--------------------- SUBMIT ---------------*/}
                                    <Pressable
                                        onPress={handleSubmit}
                                        android_ripple={{color: 'green'}}
                                    >
                                        <Button rounded style={styles.loginButton}>
                                            <View style={styles.flexrow}>
                                                <Text style={styles.logInButtonText}>
                                                    Edit Profile
                                                </Text>
                                            </View>
                                        </Button>
                                    </Pressable>
                                </View>

                                
                            </View>
                        )}
                    </Formik>

                </View>
            
            </Modal>

            
            <Content style={{padding:30, backgroundColor:theme.background,}}>

                <View style={{flexDirection: "row"}} >
                    <Thumbnail 
                        source={{uri:"https://image.ibb.co/ncAa3b/chloe_1.jpg"}}
                        width={50}
                        height={50}
                        style={{backgroundColor:theme.text3, borderRadius: 10, marginRight: 15}}
                    />

                    <View style={{}}>
                        <Text style={styles.heading}>
                            {patient ? patient.firstname + " " + patient.lastname : "User Name"}
                        </Text>

                        <Text style={{color: theme.highlight, fontSize: 13}}>
                          {patient ? patient.email : "useremail@practx.com"}
                        </Text>
                    </View>
                </View>

                
               
                
                <Text style={styles.text}>

                    {status}

                </Text>

                <Text style={styles.heading}>
                    Address
                    
                </Text>

                <Text style={styles.text}>

                    {address}
                </Text>

                <Text style={styles.heading}>Insurance Details</Text>
                <Text style={{color: theme.highlight, marginTop:10, fontSize: 13}}>
                    Bajaj alliance health Insurance
                </Text>
                <Text style={{color: theme.highlight, fontSize: 13}}>
                    Save life insurance
                </Text>

                <Button style={{marginTop:20, width: "100%",justifyContent: "space-between", backgroundColor: "none",borderRadius: 10, borderColor: theme.text3, borderWidth:1}}>
                    <View style={{flexDirection:"row"}}>
                        <Icon type="AntDesign" name='lock' style={{fontSize:19}} />
                        <Text>Password Reset</Text>
                    </View>
                    <Icon type="AntDesign" name='right' style={{fontSize:13}} />
                </Button>

                <Button style={{marginTop:20, width: "100%",justifyContent: "space-between", backgroundColor: "none",borderRadius: 10, borderColor: theme.text3, borderWidth:1}}>
                    <View style={{flexDirection:"row"}}>
                        <Icon type="AntDesign" name='setting' style={{fontSize:19}} />
                        <Text>Settings</Text>
                    </View>
                    <Icon type="AntDesign" name='right' style={{fontSize:13}} />
                </Button>
              
            </Content>

        </React.Fragment>

    );
}

const styles = StyleSheet.create({

    heading:{
        fontSize: 20, 
        fontWeight:"bold", 
        color: theme.text, 
    },
    text:{
        color:theme.text2, 
        paddingVertical: 20,
        fontSize: 13
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
    // ================== MODAL STYLES FROM SIGNUP SCREEN ===========

    avatar: {
        width: 150,
        height: 150,
        alignSelf: "center",
        borderRadius:50
    },
    formField:{
        flexDirection: "row",
        borderColor: theme.text,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal:15,
        paddingVertical: 7,
        marginTop: 15
    },
    formTextInput:{
        marginLeft: 20,
        width: "90%",
        fontSize: 16,
    },
    formFieldRow:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },

    formIcons:{
        color: theme.text3, 
        fontSize: 16, 
        alignSelf:"center"
    },
    textInput: {
        backgroundColor: theme.background,
        borderWidth: 1,
        borderColor: theme.text,
        marginTop: 20,
        width: appwidth,
        padding: 5,
        color: theme.text,
        borderRadius: 10,
        paddingLeft: 20,
    },
    loginButtonView: {
        width: "100%",
        alignItems: "center",
    },

    loginButton: {
        backgroundColor: theme.highlight,
        width: "100%",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30
    },

    logInButtonText: {
        fontWeight: "bold",
        fontSize: 17,
        color: theme.text,
    },
});


function mapStateToProps(state) {

    const { user } = state.auth
  
    return { user }
  }
  
export default connect(mapStateToProps)(ProfileScreen);