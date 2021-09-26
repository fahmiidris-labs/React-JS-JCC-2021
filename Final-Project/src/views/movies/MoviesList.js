import { Button } from '@chakra-ui/button';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useToast } from '@chakra-ui/toast';
import Cookies from 'js-cookie';
import { useContext, useMemo, useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSortBy, useTable } from 'react-table';
import { MoviesContext } from '../../contexts/MoviesProvider';
import axios from '../../libs/axios';

const MoviesList = () => {
    const toast = useToast();
    const { movies, getMovies } = useContext(MoviesContext);
    const token = Cookies.get('token');

    let year = [];
    for (var i = 2021; i >= 2000; i--) {
        year.push(i);
    }

    const [search, setSearch] = useState('');
    const [dataFiltered, setDataFiltered] = useState(null);
    const [filter, setFilter] = useState({
        genre: '',
        title: '',
        year: '',
    });

    const onHandleFilter = async e => {
        setFilter(old => ({
            ...old,
            [e.target.name]: e.target.value,
        }));
    };

    const onHandleSearch = e => {
        setSearch(e.target.value);
    };

    let dataMovies = movies;
    const searchString = search.trim().toLowerCase();

    const onHandleDataFilter = async e => {
        e.preventDefault();
        const data = dataMovies.filter(e => {
            return (
                e.genre
                    .toLowerCase()
                    .match(filter.genre.trim().toLowerCase()) &&
                e.title
                    .toLowerCase()
                    .match(filter.title.trim().toLowerCase()) &&
                e.year.toString().match(filter.year.trim())
            );
        });
        setDataFiltered(data);
    };

    const data = useMemo(() => {
        if (dataFiltered !== null) {
            return dataFiltered;
        }
        return dataMovies.filter(e =>
            e.title.toLowerCase().match(searchString)
        );
    }, [searchString, dataFiltered, dataMovies]);
    
    const columns = useMemo(() => {
        const onDeleteHandle = async id => {
            try {
                await axios.delete(`/data-movie/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });
                await getMovies();
                toast({
                    title: `Yeay! Movie deleted successfully`,
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                });
            } catch (err) {
                console.log(err.message);
            }
        };

        return [
            {
                Header: 'Cover',
                Cell: ({ row }) => (
                    <Image
                        src={row.original.image_url}
                        rounded="lg"
                        alt="cover"
                        maxW="100px"
                        h="auto"
                    />
                ),
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Ganre',
                accessor: 'genre',
            },
            {
                Header: 'Description',
                accessor: 'description',
                isTruncated: true,
                maxW: '50px',
            },
            {
                Header: 'Year',
                accessor: 'year',
            },
            {
                Header: 'Duration',
                Cell: ({ row }) => <Text>{row.original.duration} Minutes</Text>,
            },
            {
                Header: 'Rating',
                Cell: ({ row }) => <Text>{row.original.rating}/10</Text>,
            },
            {
                Header: 'Review',
                accessor: 'review',
                isTruncated: true,
                maxW: '50px',
            },
            {
                Header: 'Action',
                Cell: ({ row }) => (
                    <Box experimental_spaceY="2">
                        <Button
                            type="button"
                            onClick={() => onDeleteHandle(row.original.id)}
                        >
                            <FaTrash />
                        </Button>
                        <Button
                            as={Link}
                            to={`/movies-list/edit/${row.original.id}`}
                        >
                            <FaPencilAlt />
                        </Button>
                    </Box>
                ),
            },
        ];
    }, [getMovies, toast, token]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <Box w="95%" pt="20">
            <Heading fontSize="20px">Filter Movies</Heading>
            <Flex
                as="form"
                py="6"
                direction="column"
                experimental_spaceY="5"
                onSubmit={onHandleDataFilter}
            >
                <Flex experimental_spaceX="3">
                    <Input
                        type="text"
                        required
                        name="title"
                        variant="filled"
                        placeholder="Title Movies ..."
                        value={filter.title}
                        onChange={onHandleFilter}
                    />
                    <Input
                        type="text"
                        required
                        name="genre"
                        variant="filled"
                        placeholder="Genre Movies ..."
                        value={filter.genre}
                        onChange={onHandleFilter}
                    />
                    <Input
                        type="number"
                        required
                        name="year"
                        variant="filled"
                        placeholder="Year ..."
                        value={filter.year}
                        onChange={onHandleFilter}
                    />
                </Flex>
                <Flex experimental_spaceX="5">
                    <Button w="full" type="submit">Filter</Button>
                    <Button w="full" type="button" onClick={() => setDataFiltered(null)}>Reset Filter</Button>
                </Flex>
            </Flex>
            <Flex py="6" justify="space-between">
                <Input
                    type="search"
                    variant="filled"
                    placeholder="Search By Name ..."
                    maxW="sm"
                    onChange={onHandleSearch}
                />
                <Button as={Link} to="/movies-list/create">
                    Add new movie
                </Button>
            </Flex>
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map(headerGroup => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <Th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render('Header')}
                                    <chakra.span pl="4">
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                                <TriangleUpIcon aria-label="sorted ascending" />
                                            )
                                        ) : null}
                                    </chakra.span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <Td
                                        {...cell.getCellProps({
                                            style: {
                                                maxWidth: cell.column.maxW,
                                            },
                                        })}
                                        isTruncated={cell.column.isTruncated}
                                    >
                                        {cell.render('Cell')}
                                    </Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Box>
    );
};

export default MoviesList;
