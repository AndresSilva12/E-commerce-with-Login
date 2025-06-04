import '../App.css'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {zodResolver} from '@hookform/resolvers/zod'
import {userSchema} from '../../../validation/userSchema'
import {useUser} from '../hooks/useUser.js'
import {ToastContainer, toast} from 'react-toastify'

function RegisterPage() {
  const {createUser} = useUser()
  const navigate = useNavigate()
  const notify = (type,message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    })

  }
  
  const {register, handleSubmit, formState : {errors}, setError} = useForm({
    mode: 'onChange',
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
      <h1>API REST AUTH CRUD JWT Project's</h1>

      <h2>Create a New User</h2>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className='flex flex-col text-center gap-2'>
        <div className='flex justify-between'>
          <label htmlFor="username">Nombre de usuario</label>
          <div className='flex gap-4'>
            {errors.username && <span className='text-start text-red-600'>{errors.username.message}</span>}
            <input id='username' className='bg-white text-black' autoComplete= "username" type="text" {...register("username")}/>
          </div>
        </div>

        <div className='flex justify-between'>
          <label htmlFor="password">Contraseña</label>
          <div className='flex gap-4'>
            {errors.password && <span className='text-start text-red-600'>{errors.password.message}</span>}
            <input id='password' className='bg-white text-black' autoComplete= "new-password" type="password" {...register("password")}
            />
          </div>
        </div>

        <div className='flex justify-between'>
          <label htmlFor="email">Email</label>
          <div className='flex gap-4'>
            {errors.email && <span className='text-start text-red-600'>{errors.email.message}</span>}
            <input id='email' className='bg-white text-black' autoComplete= "email" type="text" {...register("email")}
            />
          </div>
        </div>

        <div className='flex justify-between'>
          <label htmlFor="phoneNumber">Numero de teléfono</label>
          <div className='flex gap-4'>
            {errors.phoneNumber && <span className='text-start text-red-600'>{errors.phoneNumber.message}</span>}
            <input id='phoneNumber' className={`bg-white text-black rounded px-2 py-1 outline-none ${errors.phoneNumber ? 'border border-red-600 focus:border focus:border-red-600': ''}`} autoComplete= "tel" type="number" {...register("phoneNumber")}
            />
          </div>
        </div>

        <div className='flex justify-between'>
          <label htmlFor="name">Nombre</label>
          <div className='flex gap-4'>
            {errors.name && <span className='text-start text-red-600'>{errors.name.message}</span>}
            <input id='name' className='bg-white text-black' autoComplete= "name" type="text" {...register("name")}
            />
          </div>
        </div>

        <div className='flex justify-between'>
          <label htmlFor="lastName">Apellido</label>
          <div className='flex gap-4'>
            {errors.lastName && <span className='text-start text-red-600'>{errors.lastName.message}</span>}
            <input id='lastName' className='bg-white text-black' autoComplete= "lastName" type="text" {...register("lastName")}
            />
          </div>
        </div>

        <div className='flex justify-between'>
          <label htmlFor="age">Edad</label>
          <div className='flex gap-4'>
            {errors.age && <span className='text-start text-red-600'>{errors.age.message}</span>}
            <input id='age' className='bg-white text-black' autoComplete= "age" type="number" {...register("age")}
            />
          </div>
        </div>

        <button type='submit'>Crear Usuario</button>
      </form>
      <ToastContainer/>
    </>
  )
}

export default RegisterPage
