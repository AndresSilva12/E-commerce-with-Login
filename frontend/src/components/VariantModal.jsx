import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'
import { variantSchemaWithOutProductId } from '../../../validation/productVariantsSchema.js'
import { useState, useRef } from 'react'
import { useVariants } from '../hooks/useVariants.js'
import { Button, Field, Fieldset, Input, FileUpload } from "@chakra-ui/react"

function VariantModal({ onSubmitVariant, variants, variantUpdate }) {
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)
    const { getOneVariant } = useVariants()

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        mode: 'onChange',
        resolver: zodResolver(variantUpdate ? variantSchemaWithOutProductId.partial() : variantSchemaWithOutProductId),
        defaultValues: variantUpdate
    })

    const isValid = async (data) => {
        for (const variant of variants) {
            if (data.code === variant.code && variantUpdate?.localId !== variant.localId) {
                const message = "Este código ya está en uso"
                setError("code", {
                    type: "server",
                    message: message
                })
                return notify('error', message)
            }
        }
        data.localId = variantUpdate?.localId || crypto.randomUUID()

        const result = await getOneVariant(data, setError)
        if (!result.success) {
            notify('error', 'Este código ya está en uso')
            return
        }

        data.image = image || variantUpdate?.image

        setImage(null)
        onSubmitVariant(data)
    }

    const isInvalid = () => {
        notify('error', 'Por favor ingrese todos los datos')
    }

    const handleImageChange = (e) => {
        if (!e.target.files[0].type.startsWith("image/")) {
            notify('error', 'Por favor ingrese un archivo con formato imagen')
            fileInputRef.current.value = null
            return
        }
        const file = e.target.files[0]
        setImage(file)
    }

    return (
        <>

            <form onSubmit={handleSubmit(isValid, isInvalid)}>
                <Fieldset.Root size="lg" maxW="md">
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Code</Field.Label>
                            <Input {...register("code")} />
                            {errors.code && <span>{errors.code.message}</span>}
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Size</Field.Label>
                            <Input {...register("size")} />
                            {errors.size && <span>{errors.size.message}</span>}
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Color</Field.Label>
                            <Input {...register("color")} />
                            {errors.color && <span>{errors.color.message}</span>}
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Stock</Field.Label>
                            <Input {...register("stock")} />
                            {errors.stock && <span>{errors.stock.message}</span>}
                        </Field.Root>

                        <FileUpload.Root accept='image/*' onChange={handleImageChange} ref={fileInputRef}>
                            <FileUpload.HiddenInput />
                            <FileUpload.Trigger asChild>
                                <Button variant="outline" size="sm">
                                    Subir Imagen
                                </Button>
                            </FileUpload.Trigger>
                            <FileUpload.List />
                        </FileUpload.Root>
                    </Fieldset.Content>

                    <Button type="submit" alignSelf="flex-start" >
                        {variantUpdate ? 'Actualizar' : 'Crear'}
                    </Button>
                </Fieldset.Root>
            </form >
        </>
    )
}

export default VariantModal;