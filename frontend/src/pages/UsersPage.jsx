import { useEffect } from 'react'
import { useUser } from '../hooks/useUser.js'
import Modal from '../components/Modal.jsx'
import { Button, Card, Stack, Text, HStack, Avatar, Strong, Box } from "@chakra-ui/react"
import { Toaster } from "../components/ui/toaster";

function UsersPage() {
    const { users, fetchUsers, deleteUser } = useUser()

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
                        <Modal trigger={<Button variant="subtle" colorPalette="red" flex="1">Eliminar</Button>}>
                            <h2 >Está seguro que desea eliminar este usuario?</h2>
                            <Button onClick={() => { deleteUser(user.id) }}>Eliminar</Button>
                        </Modal>
                    </Card.Footer>
                </Card.Root>
            ))}
            <Toaster />
        </Box>
    )
}

export default UsersPage;