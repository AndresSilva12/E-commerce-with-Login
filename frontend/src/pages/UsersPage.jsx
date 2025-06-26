import { useState, useEffect, useContext } from 'react'
import Modal from '../components/Modal'
import Swal from 'sweetalert2'
import { useUser } from '../hooks/useUser.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


function UsersPage() {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext)
    const { users, fetchUsers, deleteUser } = useUser()
    const [editUser, setEditUser] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id, setIsAuthenticated, navigate).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your user has been deleted.",
                        icon: "success"
                    })
                })

            }
        })
    }

    return (
        <>
            <h2>Show All the Users</h2>

            {users.map(user => (
                <div key={user.id} className='flex gap-2 justify-between items-center'>
                    <div className='flex justify-between gap-2'>
                        <p>ID: {user.id} |</p>
                        <p>Nombre: {user.name}</p>
                        <p>Apellido: {user.lastName}</p>
                        <p>E-mail: {user.email}</p>
                    </div>
                    <div className='flex gap-1'>
                        <button className='bg-green-500' onClick={() => { setEditUser(user) }}>Editar</button>
                        <button className='bg-red-600' onClick={() => { handleDelete(user.id) }}>Eliminar</button>
                    </div>
                </div>
            ))}

            {editUser && (<Modal user={editUser} fetchUsers={() => { fetchUsers() }} onClose={() => { setEditUser(null) }} />)}
        </>
    )
}

export default UsersPage;