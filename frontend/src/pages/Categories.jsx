import { Button, Box, Input, Fieldset, Field } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { categorySchema } from "../../../validation/categorySchema.js"

function Categories() {
    const [categories, setCategories] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(categorySchema)
    })
    useEffect(() => {
        getCategories()
    }, [categories])

    const getCategories = async () => {
        const res = await fetch('http://localhost:3000/api/category')
        const data = await res.json()
        setCategories(data)
    }

    const createCategory = async (formData) => {
        const res = await fetch('http://localhost:3000/api/category', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
    }

    const onValid = async (data) => {
        createCategory(data)
    }
    const onInvalid = async (data) => {
        console.log("error", data)
    }
    return (
        <Box paddingTop="60px">
            {categories && categories.map(category => (
                <div key={category.id}>{category.name}</div>
            ))}
            <form onSubmit={handleSubmit(onValid, onInvalid)}>
                <Fieldset.Root>
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.name}>
                            <Field.Label>Name</Field.Label>
                            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                            <Input {...register("name")} width="200px" />
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
                <Button type="submit">Crear categoria</Button>
            </form>
        </Box>
    )
}

export default Categories;