import {zodResolver} from "@hookform/resolvers/zod"
import {useVariants} from "../hooks/useVariants.js"
import {useForm} from "react-hook-form"
import { notify } from "../utils/notifyToast.js"
import { useEffect } from "react"
import { updateVariantSchema, variantSchema } from "../../../validation/productVariantsSchema.js"

function VariantFormModal ({modalCreateVariant, variantUpdate, onClose, onSubmit}) {
    const {createVariant, updateVariant} = useVariants()

    const {register, reset, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(modalCreateVariant ? variantSchema : updateVariantSchema),
        mode: 'onChange',
        defaultValues: variantUpdate
    })

    useEffect(()=> {
        if (variantUpdate) {
            reset(variantUpdate)
        }
    }, [variantUpdate, reset])

    const isValid = (data) => {
        if (modalCreateVariant){
            createVariant(data)
        } else {
            updateVariant(data, variantUpdate)
        }
        onSubmit()
    }

    const isInvalid = () => {
        notify('error', 'complete todos los campos del formulario')
    }

    return(
        <div className='flex flex-col h-screen w-screen fixed top-0 left-0' style={{backgroundColor: 'rgb(0,0,0,0.6)'}}>
            <button onClick={onClose} className="text-red-900">X</button>
            <form onSubmit={handleSubmit(isValid, isInvalid)} className="flex flex-col w-full gap-2 p-10">
                <div className="flex justify-between">
                    <label htmlFor="code">Code</label>
                    <div className="flex gap-4">
                        {errors.code && <span className="text-red-500">{errors.code.message}</span>}
                        <input id="code" name="code" {...register("code")}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="size">Size</label>
                    <div className="flex gap-4">
                        {errors.size && <span className="text-red-500">{errors.size.message}</span>}
                        <input id="size" name="size" autoComplete="size" {...register("size")}/>    
                    </div>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="color">Color</label>
                    <div className="flex gap-4">
                        {errors.color && <span className="text-red-500">{errors.color.message}</span>}
                        <input id="color" name="color" autoComplete="color" {...register("color")}/>
                    </div>
                </div>
                <div className="flex justify-between">
                <label htmlFor="stock">Stock</label>
                    <div className="flex gap-4">
                        {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
                        <input id="stock" name="stock" autoComplete="stock" type="number" {...register("stock")}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <label htmlFor="productId">ProductId</label>
                    <div className="flex gap-4">
                        {errors.productId && <span className="text-red-500">{errors.productId.message}</span>}
                        <input id="productId" name="productId" autoComplete="productId" {...register("productId")}/>
                    </div>
                </div>                
                <button type="submit">{modalCreateVariant ? 'Crear' : 'Actualizar'}</button>
            </form>
        </div>
    )   
}

export default VariantFormModal;