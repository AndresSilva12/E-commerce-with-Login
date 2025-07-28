import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useUser } from '../hooks/useUser.js'
import { logoutAlert } from '../utils/alerts.js'
import {
    Box,
    Flex,
    Popover,
    PopoverTrigger,
    PopoverContent,
    IconButton,
    Button,
    Stack
} from '@chakra-ui/react'


function NavBar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const { userLogout } = useUser()

    const handleLogout = () => { logoutAlert({ logoutFunction: () => userLogout({ setIsAuthenticated }) }) }

    return (
        <Box>
            <Flex
                bg={('white', 'gray.800')}
                color={('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Link className='text-white' to='/' >Home</Link>
                    {/* <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={('gray.800', 'white')}>
                        Logo
                    </Text> */}

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        {isAuthenticated &&
                            <>
                                <Box
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                        bg: ('gray.200', 'gray.700'),
                                    }}
                                >
                                    <Link className='text-white' to='/dashboard' >Dashboard</Link>
                                </Box>
                                <Box
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                        bg: ('gray.200', 'gray.700'),
                                    }}
                                >
                                    <Link className='text-white' to='/users' >Users</Link>
                                </Box>
                                <Box
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                        bg: ('gray.200', 'gray.700'),
                                    }}
                                >
                                    <Link className='text-white' to='/products' >Products</Link>
                                </Box>

                            </>
                        }
                    </Flex>
                </Flex>

                {isAuthenticated &&
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        <Button as={'a'} fontSize={'sm'} color={'white'}
                            colorPalette="teal" fontWeight={400} onClick={() => { handleLogout() }}>
                            Logout
                        </Button>
                    </Stack>
                }

                {!isAuthenticated &&
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'/register'}>
                            Register
                        </Button>
                        <Button
                            colorPalette="teal"
                            as={'a'}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            href={'/login'}
                            _hover={{
                                bg: 'pink.300',
                            }}>
                            Login
                        </Button>
                    </Stack>
                }
            </Flex>

        </Box>

    )
}

export default NavBar