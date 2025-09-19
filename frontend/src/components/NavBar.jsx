import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useUser } from '../hooks/useUser.js'
import { Box, Button, Stack, Float, Circle, Strong, Icon } from '@chakra-ui/react'
import CartDrawer from "./CartDrawer";
import { useCart } from '../context/CartContext'
import Modal from './Modal'
import { LuCircleUserRound, LuLogOut, LuLogIn, LuShoppingCart, LuStore, LuUsersRound, LuShirt, LuPackagePlus, LuChartNoAxesCombined, LuShoppingBag, LuUserRoundPlus } from "react-icons/lu";
import { TbShirtOff } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";

export function NavItem({ icon, text, path }) {
    return (
        <Link className='text-white' to={path} >
            <Box display="flex" flexDirection="column" alignItems="initial" gap="1" _hover={{ color: "teal" }}>
                <Icon size="xl">
                    {icon}
                </Icon>
                <Strong>
                    {text}
                </Strong>
            </Box>
        </Link>
    )
}


function NavBar() {
    const { isAuthenticated, user } = useContext(AuthContext)
    const { userLogout } = useUser()
    const { cart } = useCart()

    const handleLogout = () => { userLogout() }

    return (
        <Box display="flex" justifyContent="space-between" position="fixed" zIndex="99" width="full" padding='10px' borderColor="gray.500" borderBottomWidth={'2px'} backgroundColor="black">
            <Box display="flex" gap="4" >
                <NavItem icon={<LuStore />} text='Inicio' path='/' />
                {isAuthenticated &&
                    <Box display="flex" gap="4">
                        {isAuthenticated && user && user.role === 'ADMIN' &&
                            <>
                                <NavItem icon={<LuChartNoAxesCombined />} text='Panel' path='/dashboard' />
                                <NavItem icon={<TbShirtOff />} text='Deshabilitados' path='/productsDisabled' />
                                <NavItem icon={<LuUsersRound />} text='Usuarios' path='/users' />
                            </>
                        }

                        <NavItem icon={<LuShirt />} text='Productos' path='/products' />
                        <NavItem icon={<LuShoppingBag />} text='Ventas' path='/sales' />
                        <NavItem icon={<LuPackagePlus />} text='Entradas' path='/entries' />
                        <NavItem icon={<GiClothes />} text='Categorias' path='/categories' />
                    </Box>
                }
            </Box>

            {
                isAuthenticated &&
                <Box display="flex" gap="4">
                    <CartDrawer trigger={
                        <Box display="inline-block" pos="relative">
                            <Float zIndex="banner">
                                <Circle size="5" bg="red" color="white">
                                    {cart.length}
                                </Circle>
                            </Float>
                            <Button>
                                <LuShoppingCart />
                            </Button>
                        </Box>
                    } />
                    <NavItem icon={<LuCircleUserRound />} text={user.username} path='/profile' />
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        <Modal trigger={
                            <Button as={'a'} fontSize={'sm'} color={'white'} colorPalette="teal" fontWeight={400}>
                                <LuLogOut />
                                Salir
                            </Button>
                        }>
                            <h2 >Está seguro que desea cerrar sesión</h2>
                            <Button onClick={() => { handleLogout() }}>Cerrar sesión</Button>
                        </Modal>
                    </Stack>
                </Box>
            }

            {
                !isAuthenticated &&
                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <NavItem icon={<LuUserRoundPlus />} text='Registro' path='/register' />
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
                        <LuLogIn />
                        Login
                    </Button>
                </Stack>
            }

        </Box >

    )
}

export default NavBar