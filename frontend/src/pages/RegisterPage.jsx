import '../App.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '../../../validation/userSchema'
import { useUser } from '../hooks/useUser.js'
import { ToastContainer } from 'react-toastify'
import { notify } from '../utils/notifyToast.js'
import { Button, Card, Field, Input, Stack, Box, NumberInput } from "@chakra-ui/react"
import { PasswordInput } from "../components/ui/password-input"

function RegisterPage() {
  const { createUser } = useUser()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(userSchema)
  })

  const onValid = (data) => {
    createUser(data, setError, notify, navigate)
  }

  const onInvalid = () => {
    notify('error', 'Porfavor complete todos los campos')
  }

  return (
    <>
      <Box display="flex" justifyContent="center" height="90vh" alignItems="center">
        <Card.Root width="1/3" margin="auto">
          <Card.Body >
            <form onSubmit={handleSubmit(onValid, onInvalid)} >
              <Stack align="flex-start" maxW="sm" >
                <Field.Root invalid={!!errors.username} >
                  <Field.Label>Username</Field.Label>
                  <Input {...register("username")} size="sm" />
                  <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password} >
                  <Field.Label>Password</Field.Label>
                  <PasswordInput {...register("password")} size="sm" />
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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

                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Card.Body>
        </Card.Root>
      </Box>
      <ToastContainer />
    </>
  )
}

export default RegisterPage
