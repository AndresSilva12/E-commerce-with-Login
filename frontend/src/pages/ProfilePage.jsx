import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '../../../validation/userSchema'
import { useUser } from '../hooks/useUser.js'
import Modal from "../components/Modal"
import { toast } from "../utils/notifyToast.js";
import { Button, Card, Field, Input, Stack, Box, NumberInput } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"
import { Toaster } from "../components/ui/toaster";

function ProfilePage() {
    const { user, setUser } = useContext(AuthContext)
    const { updateMyUser, deleteMyUser } = useUser()
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
        mode: 'onChange',
        resolver: zodResolver(userSchema)
    })

    const onValid = (data) => {
        updateMyUser(data, setError)
    }

    const onInvalid = () => {
        toast("Por favor complete los campos", "error")
    }

    useEffect(() => {
        reset(user)

    }, [user, reset])

    return (
        <Box paddingTop="60px">
            {user && (
                <Card.Root width="1/3" margin="auto">
                    <Card.Body >
                        <form onSubmit={handleSubmit(onValid, onInvalid)} >
                            <Stack align="flex-start" maxW="sm" >
                                <Field.Root invalid={!!errors.username} >
                                    <Field.Label>Username</Field.Label>
                                    <Input {...register("username")} size="sm" />
                                    <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                                </Field.Root>

                                <Box display="flex" width="full" gap="4">
                                    <Field.Root invalid={!!errors.password} >
                                        <Field.Label>Contraseña Actual</Field.Label>
                                        <PasswordInput {...register("password")} size="sm" />
                                        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Nueva Contraseña</Field.Label>
                                        <PasswordInput size="sm" />
                                        <Field.ErrorText></Field.ErrorText>
                                    </Field.Root>
                                </Box>

                                <Field.Root invalid={!!errors.email} >
                                    <Field.Label>Email</Field.Label>
                                    <Input {...register("email")} size="sm" placeholder="me@example.com" />
                                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                                </Field.Root>

                                <Box display="flex" width="full" gap="4">
                                    <Field.Root invalid={!!errors.name} >
                                        <Field.Label>Name</Field.Label>
                                        <Input {...register("name")} size="sm" />
                                        <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.lastName} >
                                        <Field.Label>LastName</Field.Label>
                                        <Input {...register("lastName")} size="sm" />
                                        <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
                                    </Field.Root>
                                </Box>

                                <Box display="flex" width="full" gap="4">
                                    <Field.Root invalid={!!errors.age} >
                                        <Field.Label>Age</Field.Label>
                                        <NumberInput.Root defaultValue="10" >
                                            <NumberInput.Control />
                                            <NumberInput.Input  {...register("age")} />
                                        </NumberInput.Root>
                                        <Field.ErrorText>{errors.age?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.phoneNumber} >
                                        <Field.Label>PhoneNumber</Field.Label>
                                        <Input {...register("phoneNumber")} size="sm" />
                                        <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
                                    </Field.Root>
                                </Box>


                                <Button type="submit">Actualizar datos</Button>
                                <Modal trigger={<Button type="button" backgroundColor={"red.700"}>Eliminar cuenta</Button>}>
                                    <h2 >Está seguro que desea eliminar su cuenta?</h2>
                                    <Button onClick={() => { deleteMyUser() }}>Eliminar</Button>
                                </Modal>
                            </Stack>
                        </form>
                    </Card.Body>
                </Card.Root>
            )}
            <Toaster />
        </Box>
    )
}

export default ProfilePage;