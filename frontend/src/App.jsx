import { AuthProvider } from './context/AuthContext'
import './App.css'
import AppRouter from './router/AppRouter'
import { ProductProvider } from './context/ProductContext'

function App() {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <AppRouter></AppRouter>
        </ProductProvider>
      </AuthProvider>
    </>
  )
}
export default App
