import { useState, useEffect, useContext } from 'react'
import UserModal from '../components/UserModal.jsx'
import Swal from 'sweetalert2'
import { useUser } from '../hooks/useUser.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Modal from '../components/Modal.jsx'
import { Button, Card, Stack, Text, HStack, Avatar, Strong } from "@chakra-ui/react"

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
            {users.map(user => (
                <Card.Root width="320px" key={user.id}>
                    <Card.Body>
                        <HStack mb="6" gap="3">
                            <Avatar.Root>
                                <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
                                <Avatar.Fallback name="Nate Foss" />
                            </Avatar.Root>
                            <Stack gap="0">
                                <Text fontWeight="semibold" textStyle="sm">
                                    {user.name} {user.lastName}
                                </Text>
                                <Text color="fg.muted" textStyle="sm">
                                    {user.email}
                                </Text>
                            </Stack>
                        </HStack>
                        <Card.Description>
                            <Strong color="fg">Nate Foss </Strong>
                            has requested to join your team. You can approve or decline their
                            request.
                        </Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        <Modal trigger={
                            <Button variant="subtle" colorPalette="blue" flex="1" onClick={() => { setEditUser(user) }}>
                                Editar
                            </Button>
                        }>
                            <UserModal user={editUser} />
                        </Modal>

                        <Button variant="subtle" colorPalette="red" flex="1" onClick={() => { handleDelete(user.id) }}>
                            Eliminar
                        </Button>
                    </Card.Footer>
                </Card.Root>
            ))}
        </>
    )
}

export default UsersPage;