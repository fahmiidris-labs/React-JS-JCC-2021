import { Image } from '@chakra-ui/image';
import { Box, Link, Text } from '@chakra-ui/layout';
import { Link as ReactLink } from 'react-router-dom';

const MovieBox = ({ movie }) => {
    return (
        <Box w="100%" rounded="lg" p="5" position="relative">
            <ReactLink to={`/movies/${movie.id}`}>
                <Image
                    src={movie.image_url}
                    rounded="xl"
                    w="100%"
                    h="270px"
                    objectFit="cover"
                />
            </ReactLink>
            <Text pt="3" fontSize="xs" color="gray.500">
                {movie.year}
            </Text>
            <Link as={ReactLink} to={`/movies/${movie.id}`} fontSize="sm">{movie.title}</Link>
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
                {movie.rating}/10
            </Text>
        </Box>
    );
};

export default MovieBox;
