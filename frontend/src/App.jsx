import { AuthProvider } from './context/AuthContext'
import './App.css'
import AppRouter from './router/AppRouter'

function App() {
  return(
    <>
      <AuthProvider>
        <AppRouter className= "w-full h-full"></AppRouter>
      </AuthProvider>
    </>
  )
}
export default App
