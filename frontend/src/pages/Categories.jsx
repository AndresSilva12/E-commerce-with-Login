import { Button, Box, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories.js";
import Modal from "../components/Modal"
import CategoriesModal from "../components/CategoriesModal"
import { Toaster } from "../components/ui/toaster";
import { TbCategoryPlus } from "react-icons/tb";
import { LuSquarePen } from "react-icons/lu";

function Categories() {
    const { categories, getCategories } = useCategories()
    const [categoryUpdate, setCategoryUpdate] = useState()
    useEffect(() => {
        getCategories()
    }, [])

    const handleUpdate = (category) => {
        setCategoryUpdate(category)
    }
    return (
        <Box paddingTop="70px">
            <Table.Root size="sm" striped width="full">
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
                                <Modal size={"md"} trigger={<Button onClick={() => { handleUpdate(category) }}>
                                    <LuSquarePen />
                                </Button>}>
                                    {({ closeModal }) => (
                                        <CategoriesModal closeModal={closeModal} categoryUpdate={categoryUpdate} />
                                    )}
                                </Modal>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Modal size={"md"} trigger={<Button onClick={() => { setCategoryUpdate(null) }} position="fixed" right="0" bottom="0" size="lg" margin="1rem" colorPalette="teal">
                <TbCategoryPlus />
            </Button>}>
                {({ closeModal }) => (
                    <CategoriesModal closeModal={closeModal} categoryUpdate={categoryUpdate} />
                )}
            </Modal>
            <Toaster />
        </Box >
    )
}

export default Categories;