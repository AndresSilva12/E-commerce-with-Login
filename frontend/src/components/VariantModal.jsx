import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'
import { variantSchemaWithOutProductId } from '../../../validation/productVariantsSchema.js'

function VariantModal({onSubmitVariant, variantUpdate, closeModal}){
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange',
        resolver: zodResolver(variantUpdate ? variantSchemaWithOutProductId.partial() : variantSchemaWithOutProductId),
        defaultValues: variantUpdate
    })

    const isValid = (data) => {
        variantUpdate ? data.id = variantUpdate.id : null
        onSubmitVariant(data)
        notify('success', 'Variante creada bien!')
    }

    const isInvalid = () => {
        notify('error','Por favor ingrese todos los datos')
    }

    return (
            <form onSubmit={handleSubmit(isValid, isInvalid)} className="bg-gray-600 text-black m-auto flex flex-col justify-center items-center w-2/3 gap-2 px-100 py-5">
                <button className="bg-red-600" onClick={closeModal}>X</button>
                <div className= "justify-center flex gap-2">
                    <div className="flex flex-col justify-between">
                        <div className="flex gap-4">
                            <label htmlFor="code">Code</label>
                            <input className="w-20" id="code" name="code" {...register("code")}/>
                        </div>
                        {errors.code && <span className="text-red-500 h-auto w-30">{errors.code.message}</span>}
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex gap-4">
                            <label htmlFor="size">Size</label>
                            <input className="w-10 h-6" id="size" name="size" autoComplete="size" {...register("size")}/>    
                        </div>
                        {errors.size && <span className="text-red-500">{errors.size.message}</span>}
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="flex gap-4">
                            <label htmlFor="color">Color</label>
                            <input className="w-20 h-6" id="color" name="color" autoComplete="color" {...register("color")}/>
                        </div>
                        {errors.color && <span className="text-red-500">{errors.color.message}</span>}
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex gap-4">
                            <label htmlFor="stock">Stock</label>
                            <input className="w-14 h-6" id="stock" name="stock" autoComplete="stock" type="number" {...register("stock")}/>
                        </div>
                        {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
                    </div> 
                </div>
                <button className="m-0 flex justify-center items-center w-20 bg-gray-700" type="submit">{variantUpdate ? 'Actualizar' : 'Crear'}</button>
            </form>
    )
}

export default VariantModal;