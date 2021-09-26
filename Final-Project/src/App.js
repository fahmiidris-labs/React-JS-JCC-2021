import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { GamesProvider } from './contexts/GamesProvider';
import { MoviesProvider } from './contexts/MoviesProvider';
import { UserProvider } from './contexts/UserProvider';
import Routers from './routers';

const theme = extendTheme({
    fonts: {
        heading: 'Open Sans',
        body: 'Raleway',
    },
});

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <UserProvider>
                <MoviesProvider>
                    <GamesProvider>
                        <Routers />
                    </GamesProvider>
                </MoviesProvider>
            </UserProvider>
        </ChakraProvider>
    );
};

export default App;
