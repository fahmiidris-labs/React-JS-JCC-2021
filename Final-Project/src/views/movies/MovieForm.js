import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { Textarea } from '@chakra-ui/textarea';
import { useToast } from '@chakra-ui/toast';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../contexts/MoviesProvider';

import axios from '../../libs/axios';

const MovieForm = () => {
    const toast = useToast();
    const history = useHistory();
    const token = Cookies.get('token');
    const { getMovies } = useContext(MoviesContext);
    const { id } = useParams();

    const initialState = {
        id: '',
        title: '',
        genre: '',
        year: 2021,
        duration: '',
        description: '',
        image_url: '',
        rating: '',
        review: '',
    };

    const [credentials, setCredentials] = useState(initialState);
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
            await axios.post('/data-movie', credentials, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            await getMovies();
            toast({
                title: `Yeay! Movie created successfully`,
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            history.push('/movies-list');
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
            await axios.put(`/data-movie/${id}`, credentials, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            await getMovies();
            toast({
                title: `Yeay! Movie Updated successfully`,
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            history.push('/movies-list');
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

    useEffect(() => {
        let isMounted = true;
        if (id !== undefined) {
            const get = async () => {
                try {
                    const { data } = await axios.get(`/data-movie/${id}`);
                    if (isMounted) {
                        setCredentials(old => ({
                            ...old,
                            id: data.id,
                            title: data.title,
                            genre: data.genre,
                            year: data.year,
                            duration: data.duration,
                            description: data.description,
                            image_url: data.image_url,
                            rating: data.rating,
                            review: data.review,
                        }));
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
            <Heading py="3">Form Movie</Heading>
            <chakra.form onSubmit={id ? onSubmitUpdateHandle : onSubmitHandle}>
                <Flex experimental_spaceX="4">
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            placeholder="Title Movie"
                            required
                            value={credentials.title}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                    <FormControl id="genre">
                        <FormLabel>Genre</FormLabel>
                        <Input
                            type="text"
                            name="genre"
                            placeholder="Genre Movie"
                            w="100%"
                            required
                            value={credentials.genre}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                </Flex>
                <Flex experimental_spaceX="4" pt="6">
                    <FormControl id="year">
                        <FormLabel>Year</FormLabel>
                        <Input
                            type="number"
                            name="year"
                            placeholder="Year Movie"
                            min="2000"
                            max="2021"
                            w="100%"
                            required
                            value={credentials.year}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                    <FormControl id="duration">
                        <FormLabel>Duration</FormLabel>
                        <Input
                            type="number"
                            name="duration"
                            placeholder="Duration Movie in Minutes"
                            w="100%"
                            required
                            value={credentials.duration}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                </Flex>
                <Flex pt="6">
                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name="description"
                            value={credentials.description}
                            placeholder="Movie Description"
                            onChange={onHandleChange}
                        />
                    </FormControl>
                </Flex>
                <Flex experimental_spaceX="4" pt="6">
                    <FormControl id="image_url">
                        <FormLabel>Image URL</FormLabel>
                        <Input
                            type="text"
                            name="image_url"
                            placeholder="Image URL Movie"
                            required
                            value={credentials.image_url}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                    <FormControl id="rating">
                        <FormLabel>Rating</FormLabel>
                        <Input
                            type="number"
                            name="rating"
                            placeholder="Rating Movie"
                            w="100%"
                            min="0"
                            max="10"
                            required
                            value={credentials.rating}
                            onChange={onHandleChange}
                        />
                    </FormControl>
                </Flex>
                <Flex pt="6">
                    <FormControl id="review">
                        <FormLabel>Review</FormLabel>
                        <Textarea
                            name="review"
                            value={credentials.review}
                            placeholder="Review Movie"
                            onChange={onHandleChange}
                        />
                    </FormControl>
                </Flex>
                <Flex pt="6" experimental_spaceX="2">
                    <Button type="submit" colorScheme="blue">
                        {loading ? 'Loading' : id ? 'Update' : 'Submit'}
                    </Button>
                    <Button as={Link} to="/movies-list" colorScheme="red">
                        Back to List
                    </Button>
                </Flex>
            </chakra.form>
        </Box>
    );
};

export default MovieForm;
