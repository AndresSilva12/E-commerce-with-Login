import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {handleAuth} from "../utils/auth.js"

export function useMetrics () {
    const { setIsAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()
    const [metrics, setMetrics] = useState()
    const [filters, setFilters] = useState()
    const [topProductosCantidad, setTopProductosCantidad] = useState([])
    const [topProductosVentas, setTopProductosVentas] = useState([])
    const [ingresosBrutos, setIngresosBrutos] = useState()
    const [topCategorias, setTopCategorias] = useState([])
    const [ventasTotales, setVentasTotales] = useState()
    const [gananciaNeta, setGananciaNeta] = useState()
    const [totalGastos, setTotalGastos] = useState()
    const [expenses, setExpenses] = useState([])
    const [costos, setCostos] = useState()

    const fetchMetrics = async() => {
        const query = new URLSearchParams(filters).toString()
        const res = await fetch(`http://localhost:3000/api/dashboard/metrics?${query}`, {
            credentials: "include"
        })
        const data = await res.json()

        if (!res.ok) {
            handleAuth(res, data, setIsAuthenticated, navigate)
            return
        }

        setMetrics({metrics: data})
        setIngresosBrutos(data.ingresos)
        setGananciaNeta(data.gananciaNeta)
        setVentasTotales(data.ventasTotales)
        setTotalGastos(data.totalExpenses)
        setExpenses(data.expenses)
        setCostos(data.costos)
        setTopProductosCantidad(data.topProductosCantidad)
        setTopProductosVentas(data.topProductosVentas)
        setTopCategorias(data.topCategorias)
    }

    return {
        metrics,
        fetchMetrics,
        filters,
        setFilters,
        topProductosCantidad,
        topProductosVentas,
        ingresosBrutos,
        topCategorias,
        ventasTotales,
        gananciaNeta,
        totalGastos,
        expenses,
        setExpenses,
        costos
    }
}