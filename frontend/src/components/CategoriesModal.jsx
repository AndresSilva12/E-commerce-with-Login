import { Button, Box, Input, Fieldset, Field } from "@chakra-ui/react";
import { useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { categorySchema } from "../../../validation/categorySchema.js"
import { toast } from "../utils/notifyToast.js";
import { useCategories } from "../hooks/useCategories.js";
import ErrorMessage from "./ErrorMessage";

function CategoriesModal({ categoryUpdate, closeModal }) {
    const { createCategory, updateCategory } = useCategories()
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm({
        resolver: zodResolver(categorySchema)
    })

    useEffect(() => {
        if (categoryUpdate === null) {
            reset({ name: "" })
        } else {
            reset(categoryUpdate)
        }
    }, [categoryUpdate, reset])

    const onValid = async (data) => {
        categoryUpdate ? updateCategory(categoryUpdate.id, data, setError, closeModal) : createCategory(data, setError, closeModal)
    }
    const onInvalid = async () => {
        toast("Por favor complete los campos", "error")
    }

    return (
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <Box display="flex" flexDirection="column" justifyContent="center" gap="4" padding="20px">
                <Fieldset.Root>
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.name}>
                            <Box width="full" display="flex" justifyContent="space-between">
                                <Field.Label>Nombre de la categoría</Field.Label>
                                <Input {...register("name")} width="1/2" />
                            </Box>
                            <Box width="full" textAlign="end">
                                <ErrorMessage error={errors.name} />
                            </Box>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
                <Button type="submit">{categoryUpdate ? 'Actualizar' : 'Crear'} categoria</Button>
            </Box>
        </form>
    )
}

export default CategoriesModal;