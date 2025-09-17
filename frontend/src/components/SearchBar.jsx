import { Input, InputGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

function SearchBar({ onChangeSearch }) {
    return (
        <>
            <InputGroup flex="1" startElement={<LuSearch />}>
                <Input placeholder="Search product" onChange={onChangeSearch} />
            </InputGroup>
        </>
    )
}

export default SearchBar;