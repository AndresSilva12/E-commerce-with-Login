import { Button, Box, Input, Fieldset, Field, Table, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { categorySchema } from "../../../validation/categorySchema.js"
import { useCategories } from "../hooks/useCategories.js";
import Modal from "../components/Modal.jsx"

export function CategoryForm({ categoryUpdate, closeModal }) {
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
    const onInvalid = async (data) => {
        console.log("error", data)
    }

    return (
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <Box display="flex" flexDirection="column" justifyContent="center" gap="4">
                <Fieldset.Root>
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.name}>
                            <Box display="flex" gap="4">
                                <Field.Label>Nombre de la categoría</Field.Label>
                                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                <Input {...register("name")} width="200px" />
                            </Box>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
                <Button type="submit">{categoryUpdate ? 'Actualizar' : 'Crear'} categoria</Button>
            </Box>
        </form>
    )
}

function Categories() {
    const { categories, getCategories } = useCategories()
    const [categoryUpdate, setCategoryUpdate] = useState()
    useEffect(() => {
        getCategories()
    }, [categories])

    const handleUpdate = (category) => {
        setCategoryUpdate(category)
    }
    return (
        <Box paddingTop="60px">
            <Table.Root marginLeft="60px" size="sm" striped width="90%">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Categoria</Table.ColumnHeader>
                        <Table.ColumnHeader>Editar</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {categories && categories.map((category) => (
                        <Table.Row key={category.id}>
                            <Table.Cell>{category.name}</Table.Cell>
                            <Table.Cell>
                                <Modal size={"md"} trigger={<Button onClick={() => { handleUpdate(category) }}>Editar</Button>}>
                                    {({ closeModal }) => (
                                        <CategoryForm closeModal={closeModal} categoryUpdate={categoryUpdate} />
                                    )}
                                </Modal>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Modal size={"sm"} trigger={<Button onClick={() => { setCategoryUpdate(null) }} position="fixed" right="0" bottom="0" size="lg" margin="1rem" colorPalette="teal">+</Button>}>
                {({ closeModal }) => (
                    <CategoryForm closeModal={closeModal} categoryUpdate={categoryUpdate} />
                )}
            </Modal>
        </Box>
    )
}

export default Categories;