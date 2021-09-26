import { Flex, Grid, Heading } from "@chakra-ui/layout";
import { useContext } from "react";
import GamesBox from "../../components/medium/GamesBox";
import Loading from "../../components/small/Loading";
import { GamesContext } from "../../contexts/GamesProvider";

const Games = () => {

    const { games } = useContext(GamesContext);

    return (
        <Flex justify="start" align="center" direction="column">
            <Heading pt="80px" fontSize="24px">
                All Games
            </Heading>
            {games.length > 0 ? (
                <Grid templateColumns="repeat(5, 1fr)" gap={6} pt="40px">
                    {games
                        .map((game, i) => (
                            <GamesBox key={i} game={game} />
                        ))}
                </Grid>
            ) : (
                <Loading />
            )}
        </Flex>
    );
};

export default Games;
