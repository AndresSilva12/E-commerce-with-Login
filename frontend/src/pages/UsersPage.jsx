import { useEffect } from 'react'
import { useUser } from '../hooks/useUser.js'
import Modal from '../components/Modal.jsx'
import { Button, Card, Stack, Text, HStack, Strong, Box, Avatar } from "@chakra-ui/react"
import { Toaster } from "../components/ui/toaster";
import { LuUserRoundX } from "react-icons/lu";
import { FaUserTie, FaUserLarge } from "react-icons/fa6";


function UsersPage() {
    const { users, fetchUsers, deleteUser, changeRol } = useUser()

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <Box paddingTop="60px">
            {users.map(user => (
                <Card.Root width="320px" key={user.id}>
                    <Card.Body>
                        <HStack mb="6" gap="3">
                            <Avatar.Root>
                                {user.role === 'ADMIN' ? <FaUserTie /> : <FaUserLarge />}
                            </Avatar.Root>
                            <Stack gap="0">
                                <Text fontWeight="semibold" textStyle="sm">
                                    {user.username}
                                </Text>
                                <Text color="fg.muted" textStyle="sm">
                                    {user.name} {user.lastName}
                                </Text>
                            </Stack>
                        </HStack>
                        <Card.Description>
                            <Strong color="fg">{user.email}</Strong>
                        </Card.Description>
                    </Card.Body>
                    <Card.Footer>
                        <Modal trigger={
                            <Button variant="subtle" colorPalette="red" flex="1">
                                <LuUserRoundX />
                            </Button>
                        }>
                            {({ closeModal }) => (
                                <>
                                    <h2 >Está seguro que desea eliminar este usuario?</h2>
                                    <Button onClick={() => { deleteUser(user.id, closeModal) }}>Eliminar</Button>
                                </>
                            )}
                        </Modal>
                        <Modal trigger={<Button variant="subtle" colorPalette="blue" flex="1">{user.role}</Button>}>
                            {({ closeModal }) => (
                                <>
                                    <h2 >Está seguro que desea cambiar el rol de este usuario?</h2>
                                    <Button onClick={() => { changeRol(user.id, closeModal) }}>Cambiar</Button>
                                </>
                            )}
                        </Modal>
                    </Card.Footer>
                </Card.Root>
            ))}
            <Toaster />
        </Box>
    )
}

export default UsersPage;