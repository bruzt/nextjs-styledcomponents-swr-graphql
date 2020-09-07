import React from 'react';
import { AppProps } from 'next/app';

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
