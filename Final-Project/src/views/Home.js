import { Flex, Grid, Heading, Link } from '@chakra-ui/layout';
import { useContext } from 'react';
import GamesBox from '../components/medium/GamesBox';
import Hero from '../components/medium/Hero';
import MovieBox from '../components/medium/MovieBox';
import Loading from '../components/small/Loading';
import { GamesContext } from '../contexts/GamesProvider';
import { MoviesContext } from '../contexts/MoviesProvider';
import { Link as ReactLink } from 'react-router-dom';

const Home = () => {
    const { movies } = useContext(MoviesContext);
    const { games } = useContext(GamesContext);

    return (
        <>
            <Flex justify="center" align="center" height="100vh">
                <Hero
                    title="Website Movies And Games Rating"
                    subtitle="Information website for top movies and games. Check out this year's popular movies and games!. Are your favorite movies and games on the list of top?"
                    image="/movies.png"
                    ctaText="Top Movies and Games"
                    ctaLink="#top-movies-and-games"
                />
            </Flex>
            <Flex direction="column" id="top-movies-and-games">
                <Flex
                    justify="space-between"
                    align="center"
                    pt="60px"
                    px="30px"
                >
                    <Heading fontSize="24px">Top Movies</Heading>
                    <Link as={ReactLink} to="/movies">
                        View More
                    </Link>
                </Flex>
                {movies.length > 0 ? (
                    <Grid templateColumns="repeat(5, 1fr)" gap={6} pt="40px">
                        {movies
                            .filter((movie, i) => i < 5)
                            .map((movie, i) => (
                                <MovieBox key={i} movie={movie} />
                            ))}
                    </Grid>
                ) : (
                    <Loading />
                )}

                <Flex
                    justify="space-between"
                    align="center"
                    pt="60px"
                    px="30px"
                >
                    <Heading fontSize="24px">Top Games</Heading>
                    <Link as={ReactLink} to="/games">
                    View More
                    </Link>
                </Flex>
                {games.length > 0 ? (
                    <Grid templateColumns="repeat(5, 1fr)" gap={6} pt="40px">
                        {games
                            .filter((game, i) => i < 5)
                            .map((game, i) => (
                                <GamesBox key={i} game={game} />
                            ))}
                    </Grid>
                ) : (
                    <Loading />
                )}
            </Flex>
        </>
    );
};

export default Home;
