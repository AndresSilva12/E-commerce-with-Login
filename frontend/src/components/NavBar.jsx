import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useUser } from '../hooks/useUser.js'
import { Box, Flex, IconButton, Button, Stack, Float, Circle } from '@chakra-ui/react'
import CartDrawer from "./CartDrawer";
import { useCart } from '../context/CartContext'
import Modal from './Modal'


function NavBar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const { userLogout } = useUser()
    const { cart } = useCart()

    const handleLogout = () => { userLogout({ setIsAuthenticated }) }

    return (
        <Box position="fixed" zIndex="99" width="full">
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
                                <Box
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                        bg: ('gray.200', 'gray.700'),
                                    }}
                                >
                                    <Link className='text-white' to='/productsDisabled' >Products Disabled</Link>
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
                                    <Link className='text-white' to='/sales' >Sales</Link>
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
                                    <Link className='text-white' to='/entries' >Entries</Link>
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
                                    <Link className='text-white' to='/categories' >Categories</Link>
                                </Box>

                            </>
                        }
                    </Flex>
                </Flex>

                {isAuthenticated &&
                    <Box display="flex" gap="4">
                        <CartDrawer trigger={
                            <Box display="inline-block" pos="relative">
                                <Float zIndex="banner">
                                    <Circle size="5" bg="red" color="white">
                                        {cart.length}
                                    </Circle>
                                </Float>
                                <Button>Carrito</Button>
                            </Box>
                        } />
                        <Stack
                            flex={{ base: 1, md: 0 }}
                            justify={'flex-end'}
                            direction={'row'}
                            spacing={6}>
                            <Modal trigger={<Button as={'a'} fontSize={'sm'} color={'white'} colorPalette="teal" fontWeight={400}>Logout</Button>}>
                                <h2 >Está seguro que desea cerrar sesión</h2>
                                <Button onClick={() => { handleLogout() }}>Cerrar sesión</Button>
                            </Modal>
                        </Stack>
                    </Box>
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