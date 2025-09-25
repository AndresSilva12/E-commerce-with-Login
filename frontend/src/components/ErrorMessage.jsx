import { Field, Box } from "@chakra-ui/react"

function ErrorMessage({ error }) {
    return (
        <Box height="15px">
            {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
        </Box>
    )
}

export default ErrorMessage;