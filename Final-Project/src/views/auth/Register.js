import { Button } from '@chakra-ui/button';
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Container, Flex, Heading } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import axios from '../../libs/axios';
import { useContext, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import { UserContext } from '../../contexts/UserProvider';

const Register = () => {
    const toast = useToast();
    const history = useHistory();
    const { setLoginStatus } = useContext(UserContext);

    const initialState = {
        name: '',
        email: '',
        password: '',
    };

    const [credentials, setCredentials] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const onHandleChange = async e => {
        setCredentials(old => ({
            ...old,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmitHandle = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('/register', credentials);
            setLoading(false);
            toast({
                title: `Yeay! account registered successfully`,
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            const user = data.user;
            const token = data.token;
            Cookies.set('user', user.name, { expires: 1 });
            Cookies.set('email', user.email, { expires: 1 });
            Cookies.set('token', token, { expires: 1 });
            setLoginStatus(true);
            history.push('/');
        } catch (err) {
            toast({
                title: `Ups Error ${err.message}`,
                status: 'error',
                isClosable: true,
                position: 'top',
            });
            setLoading(false);
        }
    };

    return (
        <Flex justify="center" align="center" minH="100vh">
            <Container maxW="md" minW="md">
                <Box py="5">
                    <Heading align="center" fontSize="20px">
                        Sign Up and create your account
                    </Heading>
                </Box>
                <chakra.form onSubmit={onSubmitHandle}>
                    <Flex direction="column" experimental_spaceY="3">
                        <FormControl id="name">
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                required
                                value={credentials.name}
                                onChange={onHandleChange}
                            />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                required
                                value={credentials.email}
                                onChange={onHandleChange}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                required
                                value={credentials.password}
                                onChange={onHandleChange}
                            />
                        </FormControl>
                        <br />
                        <Button
                            disabled={loading ? true : false}
                            type="submit"
                            colorScheme="blue"
                            size="md"
                        >
                            {loading ? 'Loading' : 'Sign Up'}
                        </Button>
                    </Flex>
                </chakra.form>
            </Container>
        </Flex>
    );
};

export default Register;
