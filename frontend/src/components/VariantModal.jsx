import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { notify } from '../utils/notifyToast.js'
import { variantSchemaWithOutProductId } from '../../../validation/productVariantsSchema.js'
import { useState, useRef } from 'react'
import { useVariants } from '../hooks/useVariants.js'
import { Button, Field, Fieldset, Input, FileUpload, NumberInput, Box, createListCollection } from "@chakra-ui/react"

function VariantModal({ onSubmitVariant, variants, variantUpdate, productUpdate }) {
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)
    const { getOneVariant } = useVariants()
    const [purchasePrice, setPurchasePrice] = useState(1)
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

        if (productUpdate) {
            data.purchasePrice = Number(purchasePrice)
        }

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
            <form onSubmit={(e) => {
                e.stopPropagation()
                handleSubmit(isValid, isInvalid)(e)
            }}>
                <Fieldset.Root size="lg" maxW="md">
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.code}>
                            <Box display="flex" justifyContent="space-between" width="full">
                                <Field.Label>Code</Field.Label>
                                <Field.ErrorText>{errors.code?.message}</Field.ErrorText>
                            </Box>
                            <Input {...register("code")} />
                        </Field.Root>

                        <Field.Root invalid={!!errors.size}>
                            <Box display="flex" justifyContent="space-between" width="full">
                                <Field.Label>Size</Field.Label>
                                <Field.ErrorText>{errors.size?.message}</Field.ErrorText>
                            </Box>
                            <Input {...register("size")} />
                        </Field.Root>

                        <Field.Root invalid={!!errors.color}>
                            <Box display="flex" justifyContent="space-between" width="full">
                                <Field.Label>Color</Field.Label>
                                <Field.ErrorText>{errors.color?.message}</Field.ErrorText>
                            </Box>
                            <Input {...register("color")} />
                        </Field.Root>


                        <Box display="flex">
                            {!variantUpdate && (
                                <Field.Root invalid={!!errors.stock} >
                                    <Box display="flex" justifyContent="space-between" width="full">
                                        <Field.Label>Stock</Field.Label>
                                        <Field.ErrorText>{errors.stock?.message}</Field.ErrorText>
                                    </Box>
                                    <NumberInput.Root defaultValue="1" >
                                        <NumberInput.Control />
                                        <NumberInput.Input  {...register("stock")} />
                                    </NumberInput.Root>
                                </Field.Root>
                            )}
                            {!variantUpdate && productUpdate && (
                                <Field.Root >
                                    <Box display="flex" justifyContent="space-between" width="full">
                                        <Field.Label>Precio de compra</Field.Label>
                                    </Box>
                                    <NumberInput.Root value={purchasePrice} onValueChange={(e) => { setPurchasePrice(e.value) }}>
                                        <NumberInput.Control />
                                        <NumberInput.Input />
                                    </NumberInput.Root>
                                </Field.Root>
                            )}
                        </Box>

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
                        {variantUpdate ? 'Actualizar variante' : 'Crear variante'}
                    </Button>
                </Fieldset.Root>
            </form >
        </>
    )
}

export default VariantModal;