import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from '@react-native-community/async-storage';


export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState({});

    const themePref = {
        dark: {
            background: "#1e1f36",
            highlight: "#ff0000",
            text: "#fff",
            text2: "#aaa",
            text3: "#555",
        },
        light: {
            background: "white",
            highlight: "#ff0000",
            text: "#eee",
            text2: "#555",
            text3: "#999",
        },
    };

    useEffect(() => {
        async function getThemeFromMemory() {

            const themePrefVal = await AsyncStorage.getItem("theme");

            if (!themePrefVal) {
                const jsonValue = JSON.stringify(theme.dark)
                await AsyncStorage.setItem("theme", jsonValue)
                setTheme(theme.dark)
            } else {
                const parsValue = JSON.parse(themePrefVal);
                setTheme(parsValue)
            }
        }
        getThemeFromMemory();
    }, [])


    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
