import React, { createContext } from 'react';
import { View } from 'react-native';
import moment from "moment";

export const CalendarContext = createContext();

const CalendarContextProvider = ({children}) => {

    const month = [
        {month:'January', days: 31},
        {month:'February', days: 28},
        {month:'March', days:31},
        {month:'April', days:31},
        {month:'May', days:31},
        {month:'June', days: 31},
        {month:'July', days: 31},
        {month:'August', days: 31},
        {month:'September', days: 31},
        {month:'October', days: 31},
        {month:'November', days:31},
        {month:'December', days: 31}
    ];
    const days = ["Mon", "Teu", "Wed","Thu", "Fri","Sat", "Sun"];

    const today = moment();


    return (
        <CalendarContext.Provider value={}>
            {children}
        </CalendarContext.Provider>
    )
    };

export default CalendarContextProvider;
