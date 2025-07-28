import { useState, useEffect, useContext } from 'react'
import UserModal from '../components/UserModal.jsx'
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
            title: "Está seguro que desea eliminar su cuenta?",
            text: "Esta acción no puede revertirse!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, elimínalo!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id, setIsAuthenticated, navigate).then(() => {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Tu cuenta a sido eliminada.",
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
                <div key={user.id}>
                    <div>
                        <p>ID: {user.id} |</p>
                        <p>Nombre: {user.name}</p>
                        <p>Apellido: {user.lastName}</p>
                        <p>E-mail: {user.email}</p>
                    </div>
                    <div>
                        <button onClick={() => { setEditUser(user) }}>Editar</button>
                        <button onClick={() => { handleDelete(user.id) }}>Eliminar</button>
                    </div>
                </div>
            ))}

            {editUser && (<UserModal user={editUser} onClose={() => { setEditUser(null) }} />)}
        </>
    )
}

export default UsersPage;