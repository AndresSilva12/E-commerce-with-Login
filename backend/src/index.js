import express from 'express'
import user from './routes/user.route.js'
import product from './routes/product.route.js'
import variants from './routes/productVariants.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const App = express()

App.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

App.use(express.json())

App.use(cookieParser())

App.use('/api', user)

App.use('/api', product)

App.use('/api', variants)

App.listen(3000, ()=> {
    console.log('Servidor Iniciado en "http://localhost:3000" ...')
})