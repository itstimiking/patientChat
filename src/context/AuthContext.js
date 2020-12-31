import React, {createContext} from 'react';
import { View } from 'react-native';


export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = React.useState({});

    return (
        <AuthContext.Provider value={[user,setUser]}>
            {children}
        </AuthContext.Provider>
    );
    
}
