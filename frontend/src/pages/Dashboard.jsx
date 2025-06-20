import { useState, useEffect } from "react";
import { useVariants } from "../hooks/useVariants";
import { ToastContainer } from "react-toastify";
import VariantFormModal from "../components/VariantFormModal.jsx";

function Dashboard(){
    const [modal, setModal] = useState(false)
    const [variantUpdate, setVariantUpdate] = useState(null)
    const [modalCreateVariant, setModalCreateVariant] = useState(false)
    const {fetchVariants, variants, deleteVariant} = useVariants()

    useEffect(()=> {
        if (variantUpdate === null) {
            fetchVariants()
        }
    },[variantUpdate])

    const handleUpdate = (variant) => {
        setVariantUpdate(variant)
        setModalCreateVariant(false)
        setModal(true)
    }

    const handleCreate = () => {
        setVariantUpdate('')
        setModalCreateVariant(true)
        setModal(true)
    }

    const handleSubmit = () => {
        setVariantUpdate(null)
        setModal(false)
    }

    return (
        <>
            <h1>Dashboard</h1>
            {modal && <VariantFormModal modalCreateVariant={modalCreateVariant} variantUpdate={variantUpdate} onClose={()=> {setModal(false)}} onSubmit={handleSubmit}/>}
            <ToastContainer/>
            <section className="w-full flex flex-col items-center justify-center m-auto gap-4">
                {variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-center gap-4">
                        <p>{variant.code}</p>
                        <p>{variant.size}</p>
                        <p>{variant.color}</p>
                        <button onClick={() => {deleteVariant(variant)}} className="bg-red-700">Delete</button>
                        <button onClick={() => {handleUpdate(variant)}} className="bg-green-700">Edit</button>
                    </div>
                ))}
            </section>
            <button onClick={() => {handleCreate()}} className="bg-blue-400">+</button>
        </>
    )
}
export default Dashboard;