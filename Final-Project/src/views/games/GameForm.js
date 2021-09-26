import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { chakra } from '@chakra-ui/system';
import { useToast } from '@chakra-ui/toast';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GamesContext } from '../../contexts/GamesProvider';

import axios from '../../libs/axios';

const GameForm = () => {
    const toast = useToast();
    const history = useHistory();
    const token = Cookies.get('token');
    const { getGames } = useContext(GamesContext);
    const { id } = useParams();

    const initialState = {
        id: '',
        name: '',
        genre: '',
        release: 2021,
        platform: '',
        image_url: '',
    };

    const [credentials, setCredentials] = useState(initialState);
    const [singlePlayer, setSinglePlayer] = useState('0');
    const [multiplayer, setMultiplayer] = useState('0');
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
            await axios.post(
                '/data-game',
                { ...credentials, singlePlayer, multiplayer },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
            await getGames();
            toast({
                title: `Yeay! Game created successfully`,
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            history.push('/games-list');
            setLoading(false);
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

    const onSubmitUpdateHandle = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(
                `/data-game/${id}`,
                { ...credentials, singlePlayer, multiplayer },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
            await getGames();
            toast({
                title: `Yeay! Game Updated successfully`,
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            history.push('/games-list');
            setLoading(false);
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

    const updateMultiplayer = val => {
        setMultiplayer(val);
    };

    const updateSinglePlayer = val => {
        setSinglePlayer(val);
    };

    useEffect(() => {
        let isMounted = true;
        if (id) {
            const get = async () => {
                try {
                    const { data } = await axios.get(`/data-game/${id}`);
                    if (isMounted) {
                        setCredentials(old => ({
                            ...old,
                            id: data.id,
                            name: data.name,
                            genre: data.genre,
                            release: data.release,
                            platform: data.platform,
                            image_url: data.image_url,
                        }));
                        updateMultiplayer(data.multiplayer?.toString());
                        updateSinglePlayer(data.singlePlayer?.toString());
                    }
                } catch (err) {
                    console.log(err.message);
                }
            };
            get();
        }
        return () => {
            isMounted = false;
        };
    }, [id]);

    return (
        <Box pt="20" w="100%" px="7">
            <Heading py="3">Form Game</Heading>
            <chakra.form onSubmit={id ? onSubmitUpdateHandle : onSubmitHandle}>
                <Flex experimental_spaceX="4">
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Name Game"
                            required
                            value={credentials.name}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                    <FormControl id="genre">
                        <FormLabel>Genre</FormLabel>
                        <Input
                            type="text"
                            name="genre"
                            placeholder="Genre Game"
                            w="100%"
                            required
                            value={credentials.genre}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                </Flex>
                <Flex experimental_spaceX="4" pt="6">
                    <FormControl id="release">
                        <FormLabel>Release Year</FormLabel>
                        <Input
                            type="number"
                            name="release"
                            placeholder="Release Year Game"
                            min="2000"
                            max="2021"
                            w="100%"
                            required
                            value={credentials.release}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                    <FormControl id="platform">
                        <FormLabel>Platform Game</FormLabel>
                        <Input
                            type="text"
                            name="platform"
                            placeholder="Platform Game"
                            w="100%"
                            required
                            value={credentials.platform}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                </Flex>
                <Flex pt="6">
                    <FormControl id="image_url">
                        <FormLabel>Image URL</FormLabel>
                        <Input
                            type="text"
                            name="image_url"
                            placeholder="Image URL Game"
                            required
                            value={credentials.image_url}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                </Flex>
                <Flex pt="6" justify="space-around">
                    <Flex direction="column" experimental_spaceY="3">
                        <Heading fontSize="xs">Single Player</Heading>
                        <RadioGroup
                            name="singlePlayer"
                            display="flex"
                            experimental_spaceX="4"
                            value={singlePlayer}
                            onChange={setSinglePlayer}
                        >
                            <Radio value="1">Yes</Radio>
                            <Radio value="0">No</Radio>
                        </RadioGroup>
                    </Flex>
                    <Flex direction="column" experimental_spaceY="3">
                        <Heading fontSize="xs">Multi Player</Heading>
                        <RadioGroup
                            name="multiplayer"
                            display="flex"
                            experimental_spaceX="4"
                            value={multiplayer}
                            onChange={setMultiplayer}
                        >
                            <Radio value="1">Yes</Radio>
                            <Radio value="0">No</Radio>
                        </RadioGroup>
                    </Flex>
                </Flex>
                <Flex pt="6" experimental_spaceX="2">
                    <Button type="submit" colorScheme="blue">
                        {loading ? 'Loading' : id ? 'Update' : 'Submit'}
                    </Button>
                    <Button as={Link} to="/games-list" colorScheme="red">
                        Back to List
                    </Button>
                </Flex>
            </chakra.form>
        </Box>
    );
};

export default GameForm;
