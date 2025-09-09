import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const ConfirmarExclusao = ({ open, message, onConfirm, onCancel }) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={onCancel}>
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmarExclusao;
