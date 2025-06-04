import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard'
import UsersPage from '../pages/UsersPage';
import LoginPage from '../pages/LoginPage';
import NavBar from '../components/NavBar';
import ProtectedRoutes from '../components/ProtectedRoutes';
import GuestOnlyRoute from '../components/GuestOnlyRoute';

function AppRouter () {
    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/register' element={
                    <GuestOnlyRoute>
                        <RegisterPage/>
                    </GuestOnlyRoute>
                }/>
                <Route path='/dashboard' element={
                    <ProtectedRoutes>
                        <Dashboard/>
                    </ProtectedRoutes>
                }/>
                <Route path='/users' element={
                    <ProtectedRoutes>
                        <UsersPage/>
                    </ProtectedRoutes>
                }/>
                <Route path='/login' element={
                    <GuestOnlyRoute>
                        <LoginPage/>
                    </GuestOnlyRoute>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;