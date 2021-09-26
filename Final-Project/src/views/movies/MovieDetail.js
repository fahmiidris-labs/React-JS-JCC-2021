import { Image } from '@chakra-ui/image';
import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../../components/small/Loading';
import axios from '../../libs/axios';
import { AiFillStar, AiFillClockCircle } from 'react-icons/ai';
import Icon from '@chakra-ui/icon';

const MovieDetail = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMovie = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/data-movie/${id}`);
                setMovie(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err.message);
            }
        };

        getMovie();
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
                    {movie !== null ? (
                        <Grid
                            templateRows="repeat(3, 1fr)"
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
                                    src={movie.image_url}
                                    w="70%"
                                    h="400px"
                                    objectFit="cover"
                                    rounded="xl"
                                />
                            </GridItem>
                            <GridItem colSpan={4}>
                                <Heading>{movie.title}</Heading>
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
                                        Release {movie.year}
                                    </Text>
                                    <Text
                                        display="flex"
                                        justifySelf="center"
                                        alignItems="center"
                                    >
                                        Duration <Icon as={AiFillClockCircle} mx="3" /> {movie.duration} Minutes
                                    </Text>
                                </Flex>
                                <Text
                                    display="flex"
                                    justifySelf="center"
                                    alignItems="center"
                                    pt="8"
                                >
                                    <Icon as={AiFillStar} /> {movie.rating}/10
                                </Text>
                                <Text>Genre {movie.genre}</Text>
                            </GridItem>
                            <GridItem colSpan={4}>
                                <Text
                                    textAlign="justify"
                                    lineHeight="8"
                                    fontSize="18px"
                                >
                                    {movie.description}
                                </Text>
                            </GridItem>
                            <GridItem colSpan={6} pt="10">
                                <Heading fontSize="24px" mb="5">
                                    Review
                                </Heading>
                                <Text
                                    as="i"
                                    fontWeight="semibold"
                                    textAlign="justify"
                                >
                                    "{movie.review}"
                                </Text>
                            </GridItem>
                        </Grid>
                    ) : (
                        <Text>Tidak ada Movie dengan ID {id}</Text>
                    )}
                </>
            )}
        </Flex>
    );
};

export default MovieDetail;
