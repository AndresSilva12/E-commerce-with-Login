import { Button, Card, Field, Input, Stack, Box, NumberInput } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"
import { userSchema } from "../../../validation/userSchema"
import ErrorMessage from "../components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { Toaster } from "../components/ui/toaster"
import { toast } from "../utils/notifyToast.js";
import { useUser } from "../hooks/useUser.js"
import { useForm } from "react-hook-form"

function RegisterPage() {
  const { createUser } = useUser()
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(userSchema)
  })

  const onValid = (data) => {
    createUser(data, setError)
  }

  const onInvalid = () => {
    toast("Por favor complete los campos", "error")
  }

  return (
    <Box display="flex" justifyContent="center" height="90vh" paddingTop="80px" alignItems="center">
      <Card.Root maxWidth="1/3" height="550px" maxHeight="550px" margin="auto">
        <Card.Body >
          <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <Stack align="flex-start" maxW="sm">
              <Field.Root invalid={!!errors.username} >
                <Field.Label>Usuario</Field.Label>
                <Input {...register("username")} size="sm" />
                <ErrorMessage error={errors.username} />
              </Field.Root>

              <Field.Root invalid={!!errors.password} >
                <Field.Label>Contraseña</Field.Label>
                <PasswordInput {...register("password")} size="sm" />
                <ErrorMessage error={errors.password} />
              </Field.Root>

              <Field.Root invalid={!!errors.email} >
                <Field.Label>Email</Field.Label>
                <Input {...register("email")} size="sm" placeholder="me@example.com" />
                <ErrorMessage error={errors.email} />
              </Field.Root>

              <Box display="flex" width="full" gap="4">
                <Field.Root invalid={!!errors.phoneNumber} >
                  <Field.Label>Teléfono</Field.Label>
                  <Input {...register("phoneNumber")} size="sm" />
                  <ErrorMessage error={errors.phoneNumber} />
                </Field.Root>

                <Field.Root invalid={!!errors.age} >
                  <Field.Label>Edad</Field.Label>
                  <NumberInput.Root defaultValue="10" >
                    <NumberInput.Control />
                    <NumberInput.Input  {...register("age")} />
                  </NumberInput.Root>
                  <ErrorMessage error={errors.age} />
                </Field.Root>
              </Box>

              <Box display="flex" width="full" gap="4">
                <Field.Root invalid={!!errors.name} >
                  <Field.Label>Nombre</Field.Label>
                  <Input {...register("name")} size="sm" />
                  <ErrorMessage error={errors.name} />
                </Field.Root>

                <Field.Root invalid={!!errors.lastName} >
                  <Field.Label>Apellido</Field.Label>
                  <Input {...register("lastName")} size="sm" />
                  <ErrorMessage error={errors.lastName} />
                </Field.Root>
              </Box>

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
      <Toaster />
    </Box>
  )
}

export default RegisterPage
