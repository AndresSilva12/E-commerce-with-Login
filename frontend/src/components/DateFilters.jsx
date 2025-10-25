import { Box, Strong, Portal, Button, Select, createListCollection } from "@chakra-ui/react"
import { useState } from "react"
import Calendar from "react-calendar"
import { LuCalendarDays, LuCalendarX2 } from "react-icons/lu";

function DateFilters({ setFilters }) {
    const [dateBy, setDateBy] = useState()

    const dateFilters = createListCollection({
        items: [
            { label: "Este día", value: "day" },
            { label: "Este mes", value: "month" },
            { label: "Este año", value: "year" },
        ],
    })


    const handleChangeDate = (value, selected) => {
        const year = value.getFullYear()
        const month = value.getMonth() + 1
        const minDay = value.getDate()
        selected === "month"
            ? setFilters({ year: year, month: month })
            : selected === "day"
                ? setFilters({ year: year, month: month, minDay: minDay })
                : setFilters({ year: year })
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="full">
                <Box display="flex" justifyContent="initial" alignItems="center">
                    <Strong>Filtrar por fecha</Strong>
                    <LuCalendarDays />
                </Box>
                <Button onClick={() => setFilters({})} width="120px">
                    Borrar Filtros
                    <LuCalendarX2 />
                </Button>
            </Box>
            <Box display="flex" gap="2">
                <Select.Root collection={dateFilters} value={dateBy} defaultValue={"Hoy"} onValueChange={(e) => { handleChangeDate(new Date(), String(e.value)) }} size="sm" width="full">
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Este día" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal color="red">
                        <Select.Positioner>
                            <Select.Content zIndex="9999">
                                {dateFilters.items.map((dateFilter) => (
                                    <Select.Item item={dateFilter} key={dateFilter.value}>
                                        {dateFilter.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Box >
            <Box width="full">
                <Calendar
                    onClickMonth={(value, e) => { handleChangeDate(value, "month") }}
                    onClickYear={(value, e) => { handleChangeDate(value, "year") }}
                    onClickDay={(value, e) => { handleChangeDate(value, "day") }}
                />
            </Box>
        </>
    )
}

export default DateFilters;