import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { updateUserSchema } from '../../../validation/userSchema.js'
import { useUser } from '../hooks/useUser.js'

function UserModal({ user, onClose }) {
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
        <>
            <div style={{ backgroundColor: 'rgb(0,0,0,0.6)' }}>
                <div >
                    <button onClick={onClose}>X</button>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label htmlFor="username">Nombre de usuario</label>
                            <div>
                                {errors.username && <span>{errors.username.message}</span>}
                                <input id='username' autoComplete="username" type="text" {...register("username")} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <div>
                                {errors.email && <span>{errors.email.message}</span>}
                                <input id='email' autoComplete="email" type="text" {...register("email")} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phoneNumber">Numero de teléfono</label>
                            <div>
                                {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                                <input id='phoneNumber' autoComplete="phoneNumber" type="text" {...register("phoneNumber")} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name">Nombre</label>
                            <div>
                                {errors.name && <span >{errors.name.message}</span>}
                                <input id='name' autoComplete="name" type="text" {...register("name")} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastName">Apellido</label>
                            <div>
                                {errors.lastName && <span>{errors.lastName.message}</span>}
                                <input id='lastName' autoComplete="lastName" type="text" {...register("lastName")} />
                            </div>
                        </div>

                        <div >
                            <label htmlFor="age">Edad</label>
                            <div>
                                {errors.age && <span>{errors.age.message}</span>}
                                <input id='age' autoComplete="age" type="text" {...register("age")} />
                            </div>
                        </div>

                        <button type='submit'>Actualizar usuario</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserModal;