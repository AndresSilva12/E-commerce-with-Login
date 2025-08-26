import { Box, Input, InputGroup, Portal } from "@chakra-ui/react"

function SearchBar({ onChangeSearch }) {
    return (
        <>
            <InputGroup flex="1" startElement="Q">
                <Input placeholder="Search product" onChange={onChangeSearch} />
            </InputGroup>
        </>
    )
}

export default SearchBar;