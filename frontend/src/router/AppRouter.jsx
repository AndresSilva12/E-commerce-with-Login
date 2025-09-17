import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard'
import UsersPage from '../pages/UsersPage';
import LoginPage from '../pages/LoginPage';
import SalesPage from '../pages/SalesPage';
import NavBar from '../components/NavBar';
import ProtectedRoutes from '../components/ProtectedRoutes';
import GuestOnlyRoute from '../components/GuestOnlyRoute';
import ProductsPage from '../pages/ProductsPage';
import ProductsDisabledPage from '../pages/ProductsDisabledPage';
import StockEntriesPage from '../pages/StockEntries';
import Categories from '../pages/Categories';
import ProfilePage from '../pages/ProfilePage';

function AppRouter() {
    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/register' element={
                    <GuestOnlyRoute>
                        <RegisterPage />
                    </GuestOnlyRoute>
                } />
                <Route path='/dashboard' element={
                    <ProtectedRoutes roles={['ADMIN']}>
                        <Dashboard />
                    </ProtectedRoutes>
                } />
                <Route path='/products' element={
                    <ProtectedRoutes>
                        <ProductsPage />
                    </ProtectedRoutes>
                } />
                <Route path='/productsDisabled' element={
                    <ProtectedRoutes roles={['ADMIN']}>
                        <ProductsDisabledPage />
                    </ProtectedRoutes>
                } />
                <Route path='/users' element={
                    <ProtectedRoutes roles={['ADMIN']}>
                        <UsersPage />
                    </ProtectedRoutes>
                } />
                <Route path='/sales' element={
                    <ProtectedRoutes>
                        <SalesPage />
                    </ProtectedRoutes>
                } />
                <Route path='/entries' element={
                    <ProtectedRoutes>
                        <StockEntriesPage />
                    </ProtectedRoutes>
                } />
                <Route path='/categories' element={
                    <ProtectedRoutes>
                        <Categories />
                    </ProtectedRoutes>
                } />
                <Route path='/profile' element={
                    <ProtectedRoutes>
                        <ProfilePage />
                    </ProtectedRoutes>
                } />
                <Route path='/login' element={
                    <GuestOnlyRoute>
                        <LoginPage />
                    </GuestOnlyRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;