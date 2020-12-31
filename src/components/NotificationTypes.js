import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, Icon} from "native-base";

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

export const TextNotification = ({status}) => {

    return (
      <Text style={status === "new" ? styles.notificationTextNew : styles.notificationTextOld }>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
    );
  
}

export const AppointmentNotification = ({status}) => {

    return (
        <View>
            <Text style={status === "new" ? styles.notificationTextNew : styles.notificationTextOld }>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
            <View style={{marginTop:10}}>
                
                <Button light style={{borderRadius: 15, backgroundColor:"#f6dcf7", }} >
                    <Text style={{color:"red", textTransform:"lowercase"}}>
                        View details
                    </Text>
                </Button>

            </View>
        </View>
    );
  
}

export const ReportNotification = ({status}) => {
    const report = [1]

    return (
        <View>
            <Text style={status === "new" ? styles.notificationTextNew : styles.notificationTextOld }>
                {`Send ${report.length} Report in chat`}
            </Text>
            <View style={{marginTop:10}}>
                
                <Button iconLeft light style={{borderRadius: 15, backgroundColor:"#707070", }} >
                <Icon name='pulse' style={{color: theme.text}} />
                    <Text style={{color:theme.text, textTransform:"lowercase"}}>
                        X-ray report
                    </Text>
                </Button>

            </View>
        </View>
    );
  
}

export const PhotoNotification = ({status}) => {

    const photos = [1,2,3];
    const photos2display = photos.slice(0,2);

    return (
        <View >
            <Text style={status === "new" ? styles.notificationTextNew : styles.notificationTextOld }>
                    {`${photos.length} photos attarched ` } 
            </Text>
            <View>
                <View style={{...styles.flexrow, marginTop: 10}}> 
                    
                    {photos2display.map(item => <Image key={item} source={{}} style={{width: 70, height:55, borderRadius: 6,backgroundColor:"#999", marginRight: 10,}} />)}
                    
                    <Button light style={{height:55}}>
                        <Text >
                            {`+${photos.length - 2}`} 
                        </Text>
                    </Button>

                </View>
            </View>
        </View>
    );
  
}

const styles = StyleSheet.create({
    flexrow: {
        flexDirection: "row",
        flexWrap: "nowrap",
    },

    image: {
        width: 50,
        height: 50,
        backgroundColor: "red",
        borderRadius: 15,
        marginRight: 10,
    },
   
    notificationTextNew: {
        marginTop: 5,
        fontSize: 12,
        paddingRight: 80,
        color: theme.text2,
        fontWeight: "bold",
    },

    notificationTextOld: {
        marginTop: 5,
        color: theme.text3,
        fontSize: 12,
        paddingRight: 90,
    },
});