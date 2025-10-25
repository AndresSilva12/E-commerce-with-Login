import { useForm } from 'react-hook-form'
import { useUser } from '../hooks/useUser'
import { Button, Field, Input, Stack, Box, Card } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"
import { LuLogIn } from "react-icons/lu";
import ErrorMessage from "../components/ErrorMessage"


function LoginPage() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        mode: 'onSubmit'
    })
    const { userLogin } = useUser()

    const onSubmit = (formLoginData) => {
        userLogin(formLoginData, setError)
    }


    return (
        <Box display="flex" paddingTop="80px" justifyContent="center" height="80vh" alignItems="center">
            <Card.Root >
                <Card.Header>
                    <Card.Title>Login</Card.Title>
                    <Card.Description>
                        Inicie sesión para poder acceder al sistema
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap="4" align="flex-start" maxW="sm" >
                            <Field.Root invalid={!!errors.username}>
                                <Field.Label>Usuario</Field.Label>
                                <Input {...register("username")} />
                                <ErrorMessage error={errors.username} />
                            </Field.Root>

                            <Field.Root invalid={!!errors.password}>
                                <Field.Label>Contraseña</Field.Label>
                                <PasswordInput {...register("password")} />
                                <ErrorMessage error={errors.password} />
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