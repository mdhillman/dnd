import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";
import styles from './code-modal.module.css';
import { addCodeToCookie } from "../../utilties";

export interface CodeModalProps {
    open: boolean;
}

export const CodeModal: FC<CodeModalProps> = ({open}) => {
    const [isOpen, setIsOpen] = useState<boolean>(open);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());

        const code = formJson.code;
        addCodeToCookie(code);
        window.location.reload();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Unlock Hidden Content</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The gods have has blessed you with a vision! Enter the prophecy they've
                    given you to unlock more content somewhere within the site.
                </DialogContentText>
                <form onSubmit={handleSubmit} id="code-form">
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="code"
                        name="code"
                        label="Enter your code here"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="code-form">
                    Add Code
                </Button>
            </DialogActions>
        </Dialog>
    );
}