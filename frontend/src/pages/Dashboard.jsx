import { useEffect } from "react";
import {zodResolver} from '@hookform/resolvers/zod'
import { useVariants } from "../hooks/useVariants";
import {useForm} from 'react-hook-form'
import { notify } from "../utils/notifyToast";
import { ToastContainer } from "react-toastify";
import {variantSchema} from "../../../validation/productVariantsSchema.js"

function Dashboard(){
    const {fetchVariants, variants, createVariant, deleteVariant, updateVariant} = useVariants()
    const {register, handleSubmit} = useForm({
        resolver: zodResolver(variantSchema),
        mode: 'onSubmit'
    })

    useEffect(()=> {
        fetchVariants()
    },[])

    const isValid = (data) => {
        createVariant(data)
    }

    const isInvalid = (data) => {
        notify('error', 'complete todos los campos del formulario')
    }

    const handleDelete = (variant) => {
        deleteVariant(variant)
    }

    const handleUpdate = (variant) => {
        updateVariant(variant)
    }

    return (
        <>
            <h1>Dashboard</h1>
            <form onSubmit={handleSubmit(isValid, isInvalid)}>
                <label htmlFor="code">Code</label>
                <input id="code" name="code" {...register("code")}/>
                <label htmlFor="size">Size</label>
                <input id="size" name="size" autoComplete="size" {...register("size")}/>
                <label htmlFor="color">Color</label>
                <input id="color" name="color" autoComplete="color" {...register("color")}/>
                <label htmlFor="stock">Stock</label>
                <input id="stock" name="stock" autoComplete="stock" type="number" {...register("stock")}/>
                <label htmlFor="productId">ProductId</label>
                <input id="productId" name="productId" autoComplete="productId" {...register("productId")}/>
                <button type="submit">Send!</button>
            </form>
            <ToastContainer/>
            <section className="w-full flex flex-col items-center justify-content-center m-auto gap-4">
                {variants.map((variant) => (
                    <div key={variant.id} className="flex items-center gap-4">
                        <p>{variant.code}</p>
                        <p>{variant.size}</p>
                        <p>{variant.color}</p>
                        <button onClick={() => {handleDelete(variant)}} className="bg-red-700">Delete</button>
                        <button onClick={() => {handleUpdate(variant)}} className="bg-green-700">Edit</button>
                    </div>
                ))}
            </section>
        </>
    )
}
export default Dashboard;