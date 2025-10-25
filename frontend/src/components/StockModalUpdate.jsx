import { Button, createListCollection, Field, Box, NumberInput, Select, Portal } from "@chakra-ui/react"
import { useStockEntries } from "../hooks/useStockEntries";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "../utils/notifyToast";
import ErrorMessage from "./ErrorMessage"
import { newStockEntrySchema } from '../../../validation/stockEntriesSchema.js'


export function StockModalUpdate({ variantUpdate, closeModal }) {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(newStockEntrySchema),
        mode: "onChange"
    })
    const { createEntry } = useStockEntries()

    const motives = createListCollection({
        items: [
            { label: "Stock Inicial", value: "Stock Inicial" },
            { label: "Reingreso", value: "Reingreso" },
        ],
    })

    const onValid = async (data) => {
        const entryData = {
            items: [{
                variantId: variantUpdate.id,
                quantity: Number(data.quantity),
                purchasePrice: Number(data.purchasePrice)
            }],
            motive: String(data.motive),
            total: Number(data.quantity) * Number(data.purchasePrice)
        }
        const result = await createEntry(entryData)
        if (!result.success) {
            console.log("error")
        }
        toast("Entrada generada con éxito!")
        closeModal()
    }


    return (
        <form onSubmit={handleSubmit(onValid)}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="2">
                <Field.Root invalid={!!errors.quantity}>
                    <Field.Label>Cantidad Ingreso</Field.Label>
                    <NumberInput.Root {...register("quantity")} width="full">
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                    <ErrorMessage error={errors.quantity} />
                </Field.Root>
                <Field.Root invalid={!!errors.purchasePrice}>
                    <Field.Label>Precio de compra (Por Unidad)</Field.Label>
                    <NumberInput.Root {...register("purchasePrice")} width="full">
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                    <ErrorMessage error={errors.purchasePrice} />
                </Field.Root>

                <Field.Root invalid={!!errors.motive}>
                    <Controller
                        control={control}
                        name="motive"
                        render={({ field }) => (
                            <Select.Root
                                collection={motives}
                                name={field.name}
                                value={field.value ? [field.value] : []}
                                onValueChange={({ value }) => { field.onChange(value[0]) }}
                                onInteractOutside={field.onBlur}
                                size="sm"
                                width="full"
                            >
                                <Select.HiddenSelect />
                                <Select.Label>Motivo</Select.Label>
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Seleccione el motivo de ingreso" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal color="red">
                                    <Select.Positioner>
                                        <Select.Content zIndex="9999">
                                            {motives.items.map((motive) => (
                                                <Select.Item item={motive} key={motive.value}>
                                                    {motive.label}
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                        )}
                    />
                    <ErrorMessage error={errors.motive} />
                </Field.Root>
                <Button type="submit" >Generar entrada de stock</Button>
            </Box>
        </form>
    )
}

export default StockModalUpdate;