import { AuthProvider } from './context/AuthContext'
import './App.css'
import AppRouter from './router/AppRouter'
import { ProductProvider } from './context/ProductContext'

function App() {
  return(
    <>
      <AuthProvider>
        <ProductProvider>
          <AppRouter className= "w-full h-full"></AppRouter>
        </ProductProvider>
      </AuthProvider>
    </>
  )
}
export default App
