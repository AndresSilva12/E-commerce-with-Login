import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import {useUser} from '../hooks/useUser.js'

function NavBar() {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    const {userLogout} = useUser()

    const handleLogout = () => {
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!"
        }).then((result) => {
        if (result.isConfirmed) {
            userLogout({setIsAuthenticated})
        }
        });
    }

    return(
        <div className='w-full h-20 bg-slate-800 flex fixed top-0 items-center justify-around shadow-lg shadow-black '>
            <Link className='text-white' to='/' >Home</Link>
            {isAuthenticated && 
                <>
                    <Link className='text-white' to='/dashboard' >Dashboard</Link>
                    <Link className='text-white' to='/users' >Users</Link>
                    <button onClick={() => {handleLogout()}}>Logout</button>
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