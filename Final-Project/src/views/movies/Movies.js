import { Flex, Grid, Heading } from "@chakra-ui/layout";
import { useContext } from "react";
import MovieBox from "../../components/medium/MovieBox";
import Loading from "../../components/small/Loading";
import { MoviesContext } from "../../contexts/MoviesProvider";

const Movies = () => {

    const { movies } = useContext(MoviesContext);

    return (
        <Flex
            justify="start"
            align="center"
            direction="column"
        >
            <Heading pt="80px" fontSize="24px">
                All Movies
            </Heading>
            {movies.length > 0 ? (
                <Grid templateColumns="repeat(5, 1fr)" gap={6} pt="40px">
                    {movies
                        .map((movie, i) => (
                            <MovieBox key={i} movie={movie} />
                        ))}
                </Grid>
            ) : (
                <Loading />
            )}
        </Flex>
    );
};

export default Movies;
