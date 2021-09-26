import { Button } from '@chakra-ui/button';
import { Box, Flex, Link } from '@chakra-ui/layout';
import Cookies from 'js-cookie';
import { useContext, useRef } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/toast';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/modal';

const Sidebar = ({ ...props }) => {
    const { setLoginStatus } = useContext(UserContext);
    const history = useHistory();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

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
        <Box>
            <Button
                type="button"
                mt="16"
                ml="2"
                zIndex="1"
                position="fixed"
                ref={btnRef}
                colorScheme="teal"
                size="sm"
                onClick={onOpen}
            >
                Menu Sidebar
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <Flex
                            direction="column"
                            experimental_spaceY="3"
                            {...props}
                            py="5"
                        >
                            <SidebarLink to="/movies-list" onClick={onClose}>
                                Setting Movies
                            </SidebarLink>
                            <SidebarLink to="/games-list" onClick={onClose}>
                                Setting Games
                            </SidebarLink>
                            <SidebarLink to="/change-password" onClick={onClose}>Change Password</SidebarLink>
                            <SidebarButton
                                type="button"
                                onClick={onHandleLogout}
                            >
                                Logout
                            </SidebarButton>
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

const SidebarLink = ({ to, children, ...props }) => {
    return (
        <Link
            as={ReactLink}
            to={to}
            fontSize="xs"
            py="3"
            px="4"
            alignItems="center"
            rounded="lg"
            bg="white"
            _hover={{ bg: 'gray.300', color: 'gray.800' }}
            {...props}
        >
            {children}
        </Link>
    );
};

const SidebarButton = ({ children, ...props }) => {
    return (
        <Button
            fontSize="xs"
            py="2"
            px="3"
            textAlign="center"
            rounded="lg"
            bg="gray.800"
            color="white"
            _hover={{ bg: 'gray.700'}}
            {...props}
        >
            {children}
        </Button>
    );
};

export default Sidebar;
