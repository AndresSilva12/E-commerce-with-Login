import { Button, Box, Input, Fieldset, Field, Table, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { categorySchema } from "../../../validation/categorySchema.js"
import Modal from "../components/Modal.jsx"

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
            {/* Tabla de categorias */}
            <Table.Root marginLeft="60px" size="sm" striped width="90%">
                <Table.Caption>Categories inventory and pricing information</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Categoria</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {categories && categories.map((categorie) => (
                        <Table.Row key={categorie.id}>
                            <Table.Cell>{categorie.name}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Modal size={"sm"} trigger={<Button position="fixed" right="0" bottom="0" size="lg" margin="1rem" colorPalette="teal">+</Button>}>
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
                        <Button type="submit">Crear categoria</Button>
                    </Box>
                </form>
            </Modal>
        </Box>
    )
}

export default Categories;