import { Button } from '@chakra-ui/button';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { Link as ReachLink } from 'react-router-dom';
import ApplicationMark from '../small/ApplicationMark';
import { Link } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom"
import { useToast } from '@chakra-ui/toast';

const Navbar = () => {
    const { loginStatus, setLoginStatus } = useContext(UserContext);
    const name = Cookies.get('user');
    const history = useHistory()
    const toast = useToast()

    const menus = [
        {
            name: 'Home',
            url: '/',
        },
        {
            name: 'Movies',
            url: '/movies',
        },
        {
            name: 'Games',
            url: '/games',
        },
    ];

    const onHandleLogout = () => {
        setLoginStatus(false);
        Cookies.remove('user');
        Cookies.remove('email');
        Cookies.remove('token');
        toast({
            title: `Yeay! Logout Successfully`,
            status: 'success',
            isClosable: true,
            position: 'top',
        });
        history.push('/login');
    };

    return (
        <Box
            as="nav"
            bg="gray.700"
            position="fixed"
            top="0"
            insetX="0"
            zIndex="9"
        >
            <Container maxW="container.xl" centerContent>
                <Flex
                    position="relative"
                    justify="space-between"
                    align="center"
                    height="14"
                    width="full"
                >
                    <Flex
                        justify={{ base: 'center', sm: 'start' }}
                        align={{ base: 'center' }}
                    >
                        <Flex shrink="0" align="center">
                            <ReachLink to="/">
                                <ApplicationMark />
                            </ReachLink>
                        </Flex>

                        <Box display={{ base: 'none', md: 'block' }} ml="3">
                            <Flex experimental_spaceX="1">
                                {menus.map((menu, i) => (
                                    <NavbarLink key={i} to={menu.url}>
                                        {menu.name}
                                    </NavbarLink>
                                ))}
                            </Flex>
                        </Box>
                    </Flex>

                    <Flex
                        display={{ base: 'none', md: 'flex' }}
                        align="center"
                        justify="end"
                    >
                        <Box display={{ base: 'none', sm: 'block' }}>
                            <Flex experimental_spaceX="1">
                                {loginStatus ? (
                                    <Flex
                                        justify="center"
                                        align="center"
                                        experimental_spaceX="2"
                                    >
                                        <Text color="white" fontSize="xs">
                                            Welcome, {name}
                                        </Text>
                                        <NavbarButton onClick={onHandleLogout}>Logout</NavbarButton>
                                    </Flex>
                                ) : (
                                    <>
                                        <NavbarLink to="/login">
                                            Sign In
                                        </NavbarLink>
                                        <NavbarLink to="/register">
                                            Sign Up
                                        </NavbarLink>
                                    </>
                                )}
                            </Flex>
                        </Box>
                    </Flex>

                    <Flex display={{ base: 'flex', md: 'none' }}>
                        <Button p="0" bg="gray.100" color="gray.900">
                            <HamburgerIcon />
                        </Button>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

const NavbarLink = ({ to, children }) => {
    return (
        <Link
            as={ReachLink}
            to={to}
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            px="4"
            py="2"
            rounded="lg"
            fontSize="xs"
            bg="gray.700"
            color="white"
            _hover={{ bg: 'gray.800' }}
        >
            {children}
        </Link>
    );
};

const NavbarButton = ({ children, ...props }) => {
    return (
        <Button
            type="button"
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            px="4"
            py="2"
            rounded="lg"
            fontSize="xs"
            bg="gray.700"
            color="white"
            _hover={{ bg: 'gray.800' }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default Navbar;
