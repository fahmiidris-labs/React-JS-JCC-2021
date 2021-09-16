import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [dark, setDark] = useState(false)

    return (
        <ThemeContext.Provider value={{
            dark,
            setDark,
        }}>
            { children }
        </ThemeContext.Provider>
    );
};