import { useState } from "react"

export function useStockEntries () {
    const [stockEntries, setStockEntries] = useState([])

    const getAllStockEntries = async() => {
        const res = await fetch('http://localhost:3000/api/entries', {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        setStockEntries(data)
    }

    const createEntry = async(entryData) => {
        const res = await fetch('http://localhost:3000/api/entries', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(entryData)
        })
        const data = await res.json()
        if (!res.ok){
                console.log("Hubo un error durante la creación", res)
            }
        setStockEntries((prev) => ([...prev, data]))
    }

    return {
        stockEntries,
        getAllStockEntries,
        createEntry
    }
}