import { useForm } from 'react-hook-form'
import { useUser } from '../hooks/useUser'
import { Button, Field, Input, Stack, Box, Card } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"
import { LuLogIn } from "react-icons/lu";


function LoginPage() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        mode: 'onSubmit'
    })
    const { userLogin } = useUser()

    const onSubmit = (formLoginData) => {
        userLogin(formLoginData, setError)
    }

    return (
        <Box display="flex" justifyContent="center" height="80vh" alignItems="center">
            <Card.Root >
                <Card.Header>
                    <Card.Title>Sign up</Card.Title>
                    <Card.Description>
                        Fill in the form below to create an account
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap="4" align="flex-start" maxW="sm" >
                            <Field.Root invalid={!!errors.username}>
                                <Field.Label>Usuario</Field.Label>
                                <Input {...register("username")} />
                                <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!errors.password}>
                                <Field.Label>Contraseña</Field.Label>
                                <PasswordInput {...register("password")} />
                                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                            </Field.Root>

                            <Button type="submit">
                                <LuLogIn />
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Card.Body>
            </Card.Root>
        </Box>
    )
}

export default LoginPage