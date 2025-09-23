import { Box, Fieldset, Field, Input, NumberInput, Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useExpenses } from "../hooks/useExpenses.js"
import { zodResolver } from "@hookform/resolvers/zod"
import { expensesSchema, updateExpensesSchema } from "../../../validation/expensesSchema.js"

function ExpenseModal({ expenseUpdate, onSubmitExpense }) {
    const { createExpense, updateExpense } = useExpenses()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: zodResolver(expenseUpdate ? updateExpensesSchema : expensesSchema)
    })

    useEffect(() => {
        if (expenseUpdate === null) {
            reset({ name: "", amount: 0 })
        } else {
            reset(expenseUpdate)
        }
    }, [expenseUpdate, reset])

    const onValid = async (data) => {
        expenseUpdate ? await updateExpense(data, expenseUpdate.id) : await createExpense(data)
        onSubmitExpense()
    }

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <Box display="flex" flexDirection="column" justifyContent="center" gap="4">
                <Fieldset.Root>
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.name}>
                            <Box display="flex" gap="4" width="100%" justifyContent="space-between">
                                <Field.Label width="50%">Nombre del gasto</Field.Label>
                                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                <Box width="50%">
                                    <Input {...register("name")} />
                                </Box>
                            </Box>
                        </Field.Root>
                        <Field.Root invalid={!!errors.amount}>
                            <Box display="flex" gap="4" width="100%" justifyContent="space-between">
                                <Field.Label width="50%">Total</Field.Label>
                                <Field.ErrorText>{errors.amount?.message}</Field.ErrorText>
                                <Box width="50%">
                                    <NumberInput.Root defaultValue="1">
                                        <NumberInput.Control />
                                        <NumberInput.Input  {...register("amount")} />
                                    </NumberInput.Root>
                                </Box>
                            </Box>
                        </Field.Root>
                    </Fieldset.Content>
                </Fieldset.Root>
                <Button type="submit">{expenseUpdate ? "Actualizar" : "Crear"} Gasto</Button>
            </Box>
        </form>
    )
}

export default ExpenseModal