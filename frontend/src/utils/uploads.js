export const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    return data.url
}