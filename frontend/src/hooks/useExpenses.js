export function useExpenses () {
    const createExpense = async (formData) => {
        const res = await fetch('http://localhost:3000/api/expenses',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
            credentials: "include"
        })
        const data = await res.json()
        console.log(data)
    }

    const updateExpense = async (formData, id) => {
        const res = await fetch(`http://localhost:3000/api/expenses/${id}`,{
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
            credentials: "include"
        })
        const data = await res.json()
        console.log(data)
    }

    const deleteExpense = async (id) => {
        const res = await fetch(`http://localhost:3000/api/expenses/${id}`,{
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })
        const data = await res.json()
        console.log(data)
    }

    return {
        createExpense,
        updateExpense,
        deleteExpense
    }
}