import React from 'react';
import { AppProps } from 'next/app';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { ThemeContextProvider} from '../contexts/ThemeContext';
import GlobalStyles from '../styles/GlobalStyles';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

    return (
        <ThemeContextProvider>

            <GlobalStyles />

            <Component {...pageProps} />    

        </ThemeContextProvider>
    );
}

export default MyApp
