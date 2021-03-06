import {
    Box,
    Button,
    Flex,
    Image,
    Heading,
    Stack,
} from '@chakra-ui/react';

const Hero = ({
    title,
    subtitle,
    image,
    ctaLink,
    ctaText,
    ...rest
}) => {
    return (
        <Flex
            align="center"
            justify={{
                base: 'center',
                md: 'space-around',
                xl: 'space-evenly',
            }}
            direction={{ base: 'column-reverse', md: 'row' }}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            {...rest}
        >
            <Stack
                spacing={4}
                w={{ base: '80%', md: '40%' }}
                align={['center', 'center', 'flex-start', 'flex-start']}
            >
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="primary.800"
                    textAlign={['center', 'center', 'left', 'left']}
                >
                    {title}
                </Heading>
                <Heading
                    as="h2"
                    size="sm"
                    color="primary.800"
                    opacity="0.8"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={['center', 'center', 'left', 'left']}
                >
                    {subtitle}
                </Heading>
                <a href={ctaLink}>
                    <Button
                        colorScheme="blue"
                        borderRadius="8px"
                        py="4"
                        px="4"
                        lineHeight="1"
                        size="md"
                    >
                        {ctaText}
                    </Button>
                </a>
            </Stack>
            <Box
                w={{ base: '80%', sm: '60%', md: '40%' }}
                mb={{ base: 12, md: 0 }}
                pt={{ base: "50px", md: 0 }}
            >
                {/* TODO: Make this change every X secs */}
                <Image src={image} size="100%" rounded="1rem" />
            </Box>
        </Flex>
    );
}

export default Hero