import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, CardItem } from "native-base";

import { 
    TextNotification, 
    AppointmentNotification, 
    ReportNotification, 
    PhotoNotification} from "./NotificationTypes";

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


const NotificationItem = ({ status }) => {

    return (

        <View style={styles.card}>
            <View style={styles.cardbody}>
                <View>
                    <Image source={{}} style={styles.image} />
                </View>
                <View>
                    <View style={styles.cardhead}>
                        <Text style={styles.notificationHeader}>Username Lastname</Text>
                        <Text style={styles.notificationDate}>{status.time}</Text>
                    </View>

                    
                        {status.type === "appointment" 
                            ? <AppointmentNotification status = {status.status} />
                            : status.type === "photos"
                            ? <PhotoNotification status = {status.status} />
                            : status.type === "report"
                            ? <ReportNotification status = {status.status} />
                            : <TextNotification status = {status.status} />
                        }

                </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    flexrow: {
        flexDirection: "row",
        flexWrap: "nowrap",
        flexGrow: 1,
    },

    image: {
        width: 50,
        height: 50,
        backgroundColor: "#444",
        borderRadius: 15,
        marginRight: 10,
    },
    card: {
        width: windowWidth,
        paddingVertical: 16,
        borderBottomColor: theme.text3,
        borderBottomWidth: 0.5,
    },

    cardbody: {
        flexDirection: "row",
        flexWrap: "nowrap",
        flexGrow: 1,
        paddingHorizontal: 16,
        width: windowWidth * 0.85,
    },

    cardhead: {
        flexDirection: "row",
        width: windowWidth * 0.93,
    },

    notificationHeader: {
        color: theme.text,
        fontSize: 12,
        marginTop: -5,
        fontWeight: "bold",
        flex: 2,
    },

    notificationDate: {
        color: theme.text2,
        marginTop: -5,
        fontWeight: "bold",
        flex: 1,
        fontSize: 10,
        alignSelf: "center",
        textAlign:"right",
        paddingRight:70
    },

    notificationTextNew: {
        marginTop: 5,
        fontSize: 12,
        paddingRight: 80,
        color: theme.text,
        fontWeight: "bold",
    },

    notificationTextOld: {
        marginTop: 5,
        color: theme.text2,
        fontSize: 12,
        paddingRight: 90,
    },
});

export default NotificationItem;
