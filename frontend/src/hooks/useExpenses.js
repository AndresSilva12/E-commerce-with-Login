export function useExpenses () {
    const createExpense = async (formData) => {
        const res = await fetch('http://localhost:3000/api/expenses',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        console.log(data)
    }

    return {
        createExpense,
    }
}