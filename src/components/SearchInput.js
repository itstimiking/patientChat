import React, {useState, useEffect} from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from "native-base";


const theme = {/* ---- THeme to be gotten from redux or context------*/
    background: "#1e1f36",
    highlight: "#ff0000",
    text: "#fff",
    text2: "#aaa",
    text3: "#555",
};

function SearchInput(){
    return (
      <View style={{
          flexDirection: "row",
          backgroundColor: theme.text3,
          borderRadius: 10,
          paddingHorizontal:15,
          paddingVertical: 7,
          width: 220,
      }}>
  
            <Icon type="FontAwesome" name="search" style={{
              color: theme.text, 
              fontSize: 16, 
              alignSelf:"center"
            }}/>

            <TextInput
                autoCapitalize="none"
                placeholder="Search"
                placeholderTextColor={theme.text}
                style={{
                    marginLeft: 20,
                    color: theme.text,
                    width: "90%",
                    fontSize: 16,
                }}
            />
  
      </View>
    )
}

export default SearchInput;