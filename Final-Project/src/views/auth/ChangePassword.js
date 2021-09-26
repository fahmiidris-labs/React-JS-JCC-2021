import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useToast } from '@chakra-ui/toast';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../contexts/UserProvider';

import axios from "../../libs/axios"

const ChangePassword = () => {

    const toast = useToast();
    const history = useHistory();
    const token = Cookies.get('token');
    const { setLoginStatus } = useContext(UserContext);

    const initialState = {
        current_password: '',
        new_password: '',
        new_confirm_password: '',
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
            await axios.post('/change-password', credentials, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            setLoading(false);
            toast({
                title: `Yeay! Change successfully, Please login with new password!`,
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            Cookies.remove('user');
            Cookies.remove('email');
            Cookies.remove('token');
            setLoginStatus(false);
            history.push('/login');
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
        <Flex py="28">
            <Stack
                rounded={'xl'}
                p={{ base: 4, sm: 6, md: 8 }}
                spacing={{ base: 8 }}
                maxW={{ lg: 'lg' }}
            >
                <Stack spacing={4}>
                    <Heading
                        color={'gray.800'}
                        lineHeight={1.1}
                        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                    >
                        Change Password
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, blue.400,green.400)"
                            bgClip="text"
                        >
                            !
                        </Text>
                    </Heading>
                    <Text
                        color={'gray.500'}
                        fontSize={{ base: 'sm', sm: 'md' }}
                    >
                        Feeling insecure with your current password? You can change and create your new password here.
                    </Text>
                </Stack>
                <chakra.form mt={10} onSubmit={onSubmitHandle}>
                    <Stack spacing={4}>
                        <Input
                            placeholder="Current Password"
                            type="password"
                            name="current_password"
                            onChange={onHandleChange}
                            value={credentials.current_password}
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <Input
                            placeholder="New Password"
                            type="password"
                            onChange={onHandleChange}
                            value={credentials.new_password}
                            name="new_password"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <Input
                            placeholder="New Password Confirmation"
                            type="password"
                            name="new_confirm_password"
                            onChange={onHandleChange}
                            value={credentials.new_confirm_password}
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                    </Stack>
                    <Button
                    type="submit"
                        fontFamily={'heading'}
                        mt={8}
                        w={'full'}
                        bgGradient="linear(to-r, blue.400,green.400)"
                        color={'white'}
                        _hover={{
                            bgGradient: 'linear(to-r, blue.400,green.400)',
                            boxShadow: 'xl',
                        }}
                    >
                        {loading ? "Loading" : "Change Password"}
                    </Button>
                </chakra.form>
            </Stack>
        </Flex>
    );
};

export default ChangePassword;
