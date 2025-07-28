import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { updateUserSchema } from '../../../validation/userSchema.js'
import { useUser } from '../hooks/useUser.js'
import { Button, Field, Fieldset, Input, FileUpload, Box, NumberInput } from "@chakra-ui/react"

function UserModal({ user }) {
    const { updateUser } = useUser()
    const { register, reset, handleSubmit, formState: { errors }, setError } = useForm({
        mode: 'onChange',
        resolver: zodResolver(updateUserSchema)
    })

    useEffect(() => {
        if (user) reset(user)
    }, [user, reset])

    const handleUpdate = handleSubmit(async (data) => {
        updateUser(data, user.id, setError)
        onClose()
    })

    return (
        <form onSubmit={handleUpdate}>
            <Fieldset.Root size="lg" maxW="md">
                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Username</Field.Label>
                        <Input {...register("username")} />
                        {errors.username && <span>{errors.username.message}</span>}
                    </Field.Root>
                    <Field.Root invalid={!!errors.email} >
                        <Field.Label>Email</Field.Label>
                        <Input {...register("email")} size="sm" placeholder="me@example.com" />
                        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.phoneNumber} >
                        <Field.Label>PhoneNumber</Field.Label>
                        <Input {...register("phoneNumber")} size="sm" />
                        <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
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

                    <Field.Root invalid={!!errors.age} >
                        <Field.Label>Age</Field.Label>
                        <NumberInput.Root defaultValue="10" >
                            <NumberInput.Control />
                            <NumberInput.Input  {...register("age")} />
                        </NumberInput.Root>
                        <Field.ErrorText>{errors.age?.message}</Field.ErrorText>
                    </Field.Root>


                </Fieldset.Content>

                <Button type="submit" alignSelf="flex-start" >Actualizar Usuario</Button>

            </Fieldset.Root>
        </form>
    )
}

export default UserModal;