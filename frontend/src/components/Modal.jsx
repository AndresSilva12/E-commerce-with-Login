import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react"


function Modal({ trigger, children, size }) {
    const [open, setOpen] = useState()

    const closeModal = () => {
        setOpen(false)
    }
    return (
        <>
            <div onClick={() => { setOpen(true) }}>
                {trigger}
            </div>
            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} size={size}>
                <Portal >
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Body >
                                {typeof children === 'function' ? children({ closeModal }) : children}
                            </Dialog.Body>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}
export default Modal;