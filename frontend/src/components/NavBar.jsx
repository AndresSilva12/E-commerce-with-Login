import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useUser } from '../hooks/useUser.js'
import { logoutAlert } from '../utils/alerts.js'

function NavBar() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const { userLogout } = useUser()

    const handleLogout = () => { logoutAlert({ logoutFunction: () => userLogout({ setIsAuthenticated }) }) }

    return (
        <div className='w-full h-20 bg-slate-800 flex fixed top-0 items-center justify-around shadow-lg shadow-black '>
            <Link className='text-white' to='/' >Home</Link>
            {isAuthenticated &&
                <>
                    <Link className='text-white' to='/dashboard' >Dashboard</Link>
                    <Link className='text-white' to='/users' >Users</Link>
                    <Link className='text-white' to='/products' >Products</Link>
                    <button onClick={() => { handleLogout() }}>Logout</button>
                </>
            }
            {!isAuthenticated &&
                <>
                    <Link className='text-white' to='/register' >Register</Link>
                    <Link className='text-white' to='/login' >Login</Link>
                </>
            }
        </div>
    )
}

export default NavBar