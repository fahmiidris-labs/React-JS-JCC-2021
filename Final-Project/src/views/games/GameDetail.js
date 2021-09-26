import { Image } from '@chakra-ui/image';
import { Flex, Grid, GridItem, Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../../components/small/Loading';
import axios from '../../libs/axios';
import { MdCheckCircle } from 'react-icons/md';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const GameDetail = () => {
    const { id } = useParams();

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getGame = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/data-game/${id}`);
                setGame(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err.message);
            }
        };

        getGame();
    }, [id]);

    return (
        <Flex
            justify="start"
            align="center"
            direction="column"
            minH="100vh"
            pt="32"
        >
            {loading ? (
                <Loading />
            ) : (
                <>
                    {game !== null ? (
                        <Grid
                            templateRows="repeat(2, 1fr)"
                            templateColumns="repeat(6, 1fr)"
                            gap={4}
                        >
                            <GridItem
                                rowSpan={2}
                                colSpan={2}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Image
                                    src={game.image_url}
                                    w="70%"
                                    h="400px"
                                    objectFit="cover"
                                    rounded="xl"
                                />
                            </GridItem>
                            <GridItem colSpan={2} rowSpan={2}>
                                <Heading>{game.name}</Heading>
                                <Flex
                                    py="3"
                                    justify="start"
                                    experimental_spaceX="10"
                                    align="center"
                                >
                                    <Text
                                        bg="blue.500"
                                        display="inline"
                                        color="white"
                                        px="3"
                                        py="1"
                                        rounded="md"
                                    >
                                        Release {game.release}
                                    </Text>
                                    <Text
                                        display="flex"
                                        justifySelf="center"
                                        alignItems="center"
                                    >
                                        {game.platform}
                                    </Text>
                                </Flex>
                                <Text>Genre {game.genre}</Text>
                                <List spacing={1} pt="5">
                                    <ListItem>
                                        <ListIcon
                                            as={game.singlePlayer === 1 ? MdCheckCircle : IoMdCloseCircleOutline}
                                            color={game.singlePlayer === 1 ? "green.500" : "red.500"}
                                        />
                                        Single Player
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon
                                            as={game.multiplayer === 1 ? MdCheckCircle : IoMdCloseCircleOutline}
                                            color={game.multiplayer === 1 ? "green.500" : "red.500"}
                                        />
                                        Multi Player
                                    </ListItem>
                                </List>
                            </GridItem>
                            <GridItem colSpan={2}></GridItem>
                            <GridItem colSpan={4}>
                                <Text
                                    textAlign="justify"
                                    lineHeight="8"
                                    fontSize="18px"
                                >
                                    {game.description}
                                </Text>
                            </GridItem>
                        </Grid>
                    ) : (
                        <Text>Tidak ada Game dengan ID {id}</Text>
                    )}
                </>
            )}
        </Flex>
    );
};

export default GameDetail;
