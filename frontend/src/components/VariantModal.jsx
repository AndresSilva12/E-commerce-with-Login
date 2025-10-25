import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from "../utils/notifyToast.js";
import { variantSchemaWithOutProductId } from '../../../validation/productVariantsSchema.js'
import { useState, useRef, useEffect } from 'react'
import { useVariants } from '../hooks/useVariants.js'
import { Button, Field, Fieldset, Input, FileUpload, NumberInput, Box, Stack } from "@chakra-ui/react"
import { LuImageUp } from "react-icons/lu";
import ErrorMessage from './ErrorMessage.jsx';


function VariantModal({ onSubmitVariant, variants, variantUpdate, productUpdate }) {
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)
    const { getOneVariant } = useVariants()
    const [purchasePrice, setPurchasePrice] = useState(1)
    const { register, handleSubmit, reset, formState: { errors }, setError, control } = useForm({
        mode: 'onChange',
        resolver: zodResolver(variantUpdate ? variantSchemaWithOutProductId.partial() : variantSchemaWithOutProductId),
        defaultValues: variantUpdate
    })

    useEffect(() => {
        if (variantUpdate === null) {
            reset({
                code: "",
                size: "",
                color: "",
                stock: 0,
                purchasePrice: 0,
                image: ""
            })
        } else {
            reset(variantUpdate)
        }
    }, [variantUpdate, reset])

    const isValid = async (data) => {
        for (const variant of variants) {
            if (data.code === variant.code && variantUpdate?.localId !== variant.localId) {
                const message = "Este código ya está en uso"
                setError("code", {
                    type: "server",
                    message: message
                })
                return toast(message, "error")
            }
        }
        data.localId = variantUpdate?.localId || crypto.randomUUID()

        const result = await getOneVariant(data, setError)
        if (!result.success) {
            return { success: false, error: result.error || "Error validando variante" }
        }

        data.image = image || variantUpdate?.image

        if (productUpdate) {
            data.purchasePrice = Number(purchasePrice)
        }

        setImage(null)
        onSubmitVariant(data)
    }

    const isInvalid = () => {
        toast("Por favor ingrese todos los datos", "error")
    }

    const handleImageChange = (e, field) => {
        const file = e.target.files[0]

        if (!file) {
            field.onChange("")
            return
        }

        if (!e.target.files[0].type.startsWith("image/")) {
            toast("Por favor ingrese un archivo con formato imagen", "error")
            field.onChange("")
            return
        }
        setImage(file)
        field.onChange(file)
    }

    return (
        <form onSubmit={(e) => {
            e.stopPropagation()
            handleSubmit(isValid, isInvalid)(e)
        }}>
            <Fieldset.Root size="lg" maxW="md">
                <Stack>
                    <Fieldset.Legend>Crear/Editar variantes</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Por favor al terminar de {variantUpdate ? 'editar' : 'crear'} su variante dar click en '{variantUpdate ? 'Actualizar' : 'Crear'} variante'
                    </Fieldset.HelperText>
                </Stack>
                <Fieldset.Content>
                    <Field.Root invalid={!!errors.code}>
                        <Box display="flex" justifyContent="space-between" width="full">
                            <Field.Label>Código</Field.Label>
                            <Field.ErrorText>{errors.code?.message}</Field.ErrorText>
                        </Box>
                        <Input {...register("code")} />
                    </Field.Root>

                    <Field.Root invalid={!!errors.size}>
                        <Box display="flex" justifyContent="space-between" width="full">
                            <Field.Label>Talle</Field.Label>
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
                                </Box>
                                <NumberInput.Root defaultValue="1" >
                                    <NumberInput.Control />
                                    <NumberInput.Input  {...register("stock")} />
                                </NumberInput.Root>
                                <ErrorMessage error={errors.stock} />
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

                    <Field.Root invalid={!!errors.image}>
                        <Controller
                            control={control}
                            name="image"
                            render={({ field }) => (
                                <FileUpload.Root accept='image/*' value={field.value ? [field.value] : []} onChange={(e) => {
                                    const file = e.target.files[0]

                                    if (!file) {
                                        field.onChange("")
                                        return
                                    }

                                    if (!e.target.files[0].type.startsWith("image/")) {
                                        toast("Por favor ingrese un archivo con formato imagen", "error")
                                        field.onChange("")
                                        return
                                    }
                                    setImage(file)
                                    field.onChange(file)
                                }} ref={fileInputRef}>
                                    <FileUpload.HiddenInput />
                                    <FileUpload.Trigger asChild>
                                        <Button variant="outline" size="sm">
                                            <LuImageUp />
                                            Subir Imagen
                                        </Button>
                                    </FileUpload.Trigger>
                                    <FileUpload.List />
                                </FileUpload.Root>
                            )}
                        />
                        <ErrorMessage error={errors.image} />
                    </Field.Root>
                </Fieldset.Content>

                <Button type="submit" alignSelf="flex-start" backgroundColor="teal" color="white" >
                    {variantUpdate ? 'Actualizar variante' : 'Crear variante'}
                </Button>
            </Fieldset.Root>
        </form >
    )
}

export default VariantModal;