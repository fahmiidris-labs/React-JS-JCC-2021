import { FaGithub, FaTwitter } from 'react-icons/fa';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { Box, Container, Stack, Text } from '@chakra-ui/layout';
import ApplicationMark from '../small/ApplicationMark';

const Footer = () => {
    return (
        <Box
            as="footer"
            role="contentinfo"
            mx="auto"
            py="5"
            px={{ base: '4', md: '8' }}
            bg="gray.900"
            mt="20"
            pb="40px"
        >
            <Container maxW="7xl">
                <Stack
                    direction="row"
                    spacing="2"
                    align="center"
                    justify="space-between"
                >
                    <ApplicationMark color="white" />
                    <ButtonGroup variant="ghost" color="gray.600">
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="GitHub"
                            icon={<FaGithub fontSize="20px" />}
                        />
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="Twitter"
                            icon={<FaTwitter fontSize="20px" />}
                        />
                    </ButtonGroup>
                </Stack>
                <Text fontSize="sm" color="white">
                    &copy; {new Date().getFullYear()} Fahmi Idris. All rights
                    reserved.
                </Text>
            </Container>
        </Box>
    );
};

export default Footer;
