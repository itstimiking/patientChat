import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Thumbnail} from "native-base";
import moment from "moment";

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


const NotificationItem = ({ staff }) => {

    return (

        <View style={styles.card}>
            <View style={styles.cardbody || "https://image.ibb.co/b4kxGw/zach_1.jpg"}>
                <View>
                    <Thumbnail 
                        source={{uri: staff.avatar}} 
                        style={styles.image} 
                    />
                    {/* <View style={staff.id !== 0 ? styles.online : styles.offline}>

                    </View> */}

                </View>
                <View>
                    <View style={styles.cardhead}>

                        <Text style={styles.notificationHeader}>{staff.firstname} {staff.lastname}</Text>

                        <Text style={styles.notificationDate}>{ staff.latest_timestamp || "Time"}</Text>

                    </View>

                    {/* <Text 
                        style={staff.status === "new" ? styles.notificationBody : styles.notificationBody2 } 
                    >
                        {staff.lastChat || "Last message"}
                    </Text> */}

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
        backgroundColor: "red",
        borderRadius: 15,
        marginRight: 10
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

    card: {
        width: windowWidth,
        paddingVertical: 16,
        borderBottomColor: theme.text3,
        borderBottomWidth: 0.5,
        backgroundColor: theme.background,
    },
    cardbody: {
        flexDirection: "row",
        flexWrap: "nowrap",
        flexGrow: 1,
        borderRightWidth: 1,
        paddingHorizontal: 16,
        width: windowWidth
    },
    cardhead: {
        flexDirection: "row",
        width: windowWidth * 0.74,
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
        fontSize: 10,
        alignSelf: "center",
        textAlign: "right"
    },
    notificationBody: {
        marginTop: 5,
        fontSize: 12,
        paddingRight: 80,
        color: theme.text2,
        fontWeight: "bold",
    },
    notificationBody2: {
        marginTop: 5,
        color: theme.text3,
        fontSize: 12,
        paddingRight: 80,
    },
});

export default NotificationItem;
