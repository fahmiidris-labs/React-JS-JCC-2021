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
import { GamesContext } from '../../contexts/GamesProvider';
import axios from '../../libs/axios';

const GamesList = () => {
    const toast = useToast();
    const { games, getGames } = useContext(GamesContext);
    const token = Cookies.get('token');

    let year = [];
    for (var i = 2021; i >= 2000; i--) {
        year.push(i);
    }

    const [search, setSearch] = useState('');
    const [dataFiltered, setDataFiltered] = useState(null);
    const [filter, setFilter] = useState({
        name: '',
        genre: '',
        release: '',
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

    let dataGames = games;
    const searchString = search.trim().toLowerCase();

    const onHandleDataFilter = async e => {
        e.preventDefault();
        const data = dataGames.filter(e => {
            return (
                e.genre
                    .toLowerCase()
                    .match(filter.genre.trim().toLowerCase()) &&
                e.name
                    .toLowerCase()
                    .match(filter.name.trim().toLowerCase()) &&
                e.release.toString().match(filter.release.trim())
            );
        });
        setDataFiltered(data);
    };

    const data = useMemo(() => {
        if (dataFiltered !== null) {
            return dataFiltered;
        }
        return dataGames.filter(e =>
            e.name.toLowerCase().match(searchString)
        );
    }, [searchString, dataFiltered, dataGames]);

    const columns = useMemo(() => {
        const onDeleteHandle = async id => {
            try {
                await axios.delete(`/data-game/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });
                await getGames();
                toast({
                    title: `Yeay! Game deleted successfully`,
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
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Ganre',
                accessor: 'genre',
            },
            {
                Header: 'Plaform',
                accessor: 'platform',
            },
            {
                Header: 'Release Year',
                accessor: 'release',
            },
            {
                Header: 'Single Player',
                Cell: ({ row }) => (
                    <Text
                        display="inline"
                        px="2"
                        py="1"
                        color="white"
                        rounded="md"
                        bg={row.original.singlePlayer === 1 ? 'green.500' : 'red.500'}
                    >
                        {row.original.singlePlayer === 1 ? 'Yes' : 'No'}
                    </Text>
                ),
            },
            {
                Header: 'Multi Player',
                Cell: ({ row }) => (
                    <Text
                        display="inline"
                        px="2"
                        py="1"
                        color="white"
                        rounded="md"
                        bg={row.original.multiplayer === 1 ? 'green.500' : 'red.500'}
                    >
                        {row.original.multiplayer === 1 ? 'Yes' : 'No'}
                    </Text>
                ),
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
                            to={`/games-list/edit/${row.original.id}`}
                        >
                            <FaPencilAlt />
                        </Button>
                    </Box>
                ),
            },
        ];
    }, [getGames, toast, token]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <Box w="95%" pt="20">
            <Heading fontSize="20px">Filter Games</Heading>
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
                        name="name"
                        variant="filled"
                        placeholder="Name Games ..."
                        value={filter.name}
                        onChange={onHandleFilter}
                    />
                    <Input
                        type="text"
                        required
                        name="genre"
                        variant="filled"
                        placeholder="Genre Games ..."
                        value={filter.genre}
                        onChange={onHandleFilter}
                    />
                    <Input
                        type="number"
                        required
                        name="release"
                        variant="filled"
                        placeholder="Releas Year ..."
                        value={filter.release}
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
                <Button as={Link} to="/games-list/create">
                    Add new game
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
                                    <Td {...cell.getCellProps()}>
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

export default GamesList;
