import { Image } from '@chakra-ui/image';
import { Box, Link, Text } from '@chakra-ui/layout';
import { Link as ReactLink } from 'react-router-dom'

const GamesBox = ({ game }) => {
    return (
        <Box w="100%" rounded="lg" p="5" position="relative">
            <ReactLink to={`/games/${game.id}`}>
                <Image
                    src={game.image_url}
                    rounded="xl"
                    w="100%"
                    h="270px"
                    objectFit="cover"
                />
            </ReactLink>
            <Text pt="3" fontSize="xs" color="gray.500">
                {game.release}
            </Text>
            <Link as={ReactLink} to={`/games/${game.id}`} fontSize="sm">{game.name}</Link>
            <Text
                pt="3"
                fontSize="xs"
                position="absolute"
                bg="yellow.300"
                px="10px"
                py="5px"
                rounded="lg"
                top="7"
                right="7"
                fontWeight="semibold"
            >
                {game.platform}
            </Text>
        </Box>
    );
};

export default GamesBox;
