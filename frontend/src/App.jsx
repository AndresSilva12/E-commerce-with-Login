import { AuthProvider } from './context/AuthContext'
import './App.css'
import './custom-calendar.css';
import AppRouter from './router/AppRouter'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AppRouter></AppRouter>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  )
}
export default App
