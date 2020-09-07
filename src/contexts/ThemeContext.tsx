import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import darkTheme from '../styles/darkTheme';

interface IThemeHook {
    changeThemeTo: (theme: string) => void
}

const Context = createContext({});

export const ThemeContextProvider: React.FC = ({ children }) => {
    
    const [getTheme, setTheme] = useState(darkTheme);

    function changeThemeTo(theme: string){

        if(theme === 'dark') setTheme(darkTheme);
    }
    
    return (
        <Context.Provider 
            value={{ 
                changeThemeTo,
            }}
        >
            <ThemeProvider theme={getTheme}>
                {children}
            </ThemeProvider>
        </Context.Provider>
    );
}

export const useTheme = () => {

    const context = useContext(Context) as IThemeHook;

    return context;
}