import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useState, useEffect} from 'react'
import { updateUserSchema } from '../../../validation/userSchema'
import {useUser} from '../hooks/useUser.js'

function Modal ({user, onClose, fetchUsers}) {
    const {updateUser} = useUser()
    const {register, reset, handleSubmit, formState: {errors}, setError} = useForm({
        mode: 'onChange',
        resolver: zodResolver(updateUserSchema)
    })

    useEffect(() => {
        if (user) reset(user)
    }, [user, reset])

    const handleUpdate = handleSubmit(async(data) => {
        updateUser(data, user.id, setError)
        
        /* onClose() */
    })

    return (
        <>
        <div className= 'flex h-screen w-screen fixed top-0 left-0' style={{backgroundColor: 'rgb(0,0,0,0.6)'}}>
            <div className='flex flex-col justify-center items-center m-auto h-100 w-130 bg-gray-500'>
            <button  className="fixed top-0 right-0 bg-red-600" onClick={onClose}>X</button>
            <form onSubmit={handleUpdate} className='flex flex-col text-center gap-2'>
                <div className='flex justify-between'>
                    <label htmlFor="username">Nombre de usuario</label>
                    <div className='flex gap-4'>
                        {errors.username && <span className='text-start text-red-600'>{errors.username.message}</span>}
                        <input id='username' className='bg-white text-black' autoComplete= "username" type="text" {...register("username")}/>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <label htmlFor="email">Email</label>
                    <div>
                        {errors.email && <span className= 'text-start text-red-600'>{errors.email.message}</span>}
                        <input id='email' className='bg-white text-black' autoComplete= "email" type="text" {...register("email")}/>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <label htmlFor="phoneNumber">Numero de teléfono</label>
                    <div>
                        {errors.phoneNumber && <span className= 'text-start text-red-600'>{errors.phoneNumber.message}</span>}
                        <input id='phoneNumber' className='bg-white text-black' autoComplete= "phoneNumber" type="text" {...register("phoneNumber")}/>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <label htmlFor="name">Nombre</label>
                    <div>
                        {errors.name && <span className= 'text-start text-red-600'>{errors.name.message}</span>}
                        <input id='name' className='bg-white text-black' autoComplete= "name" type="text" {...register("name")}/>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <label htmlFor="lastName">Apellido</label>
                    <div>
                        {errors.lastName && <span className= 'text-start text-red-600'>{errors.lastName.message}</span>}
                        <input id='lastName' className='bg-white text-black' autoComplete= "lastName" type="text" {...register("lastName")}/>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <label htmlFor="age">Edad</label>
                    <div>
                        {errors.age && <span className= 'text-start text-red-600'>{errors.age.message}</span>}
                        <input id='age' className='bg-white text-black' autoComplete= "age" type="text" {...register("age")}/>
                    </div>
                </div>
                
                <button type='submit'>Actualizar usuario</button>
            </form>
            </div>
        </div>
        </>
    )
}

export default Modal;