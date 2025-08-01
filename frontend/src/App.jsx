import { AuthProvider } from './context/AuthContext'
import './App.css'
import AppRouter from './router/AppRouter'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <AppRouter></AppRouter>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}
export default App
