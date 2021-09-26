import { Container, Flex } from '@chakra-ui/layout';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';
import Footer from './big/Footer';
import Navbar from './big/Navbar';
import Sidebar from './big/Sidebar';

const Main = ({ children }) => {
    const { loginStatus } = useContext(UserContext);
    return (
        <>
            <Navbar />
            <Flex direction="">
                {loginStatus && (
                    <Sidebar />
                )}
                <Container maxW="container.xl" centerContent>
                    {children}
                </Container>
            </Flex>
            <Footer />
        </>
    );
};

export default Main;
