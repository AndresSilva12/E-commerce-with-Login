import {useForm} from 'react-hook-form'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function LoginPage() {
    const navigate = useNavigate()
    const {setIsAuthenticated} = useContext(AuthContext)
    const {register, handleSubmit, formState: {errors}, setError} = useForm({
        mode: 'onSubmit'
    })
    const {userLogin} = useUser()

    const onSubmit = (formLoginData) => {
        userLogin(formLoginData, setIsAuthenticated, navigate, setError)
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center gap-2">
                <div className="flex justify-between">
                    <label htmlFor="username">Usuario</label>
                    <div className='flex gap-4'>
                        {errors.username && <span className='text-start text-red-600'>{errors.username.message}</span>}
                        <input id='username' className='bg-white text-black' autoComplete= "username" type="text" {...register("username")} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="password">Contraseña</label>
                    <div className='flex gap-4'>
                        {errors.password && <span className='text-start text-red-600'>{errors.password.message}</span>}
                        <input id='password' className='bg-white text-black' autoComplete= "password" type="password" {...register("password")}/>
                    </div>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginPage