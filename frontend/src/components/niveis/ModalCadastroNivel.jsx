import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography
} from '@mui/material';

const ModalCadastroNivel = ({ open, onClose, onSave }) => {
    const [nivel, setNivel] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setNivel('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nivel.trim()) {
            return;
        }

        setLoading(true);
        try {
            await onSave({ nivel: nivel.trim() });
            handleClose();
        } catch (error) {
            console.error('Erro ao salvar nível:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6">Novo Nível</Typography>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Nome do Nível"
                            value={nivel}
                            onChange={(e) => setNivel(e.target.value)}
                            placeholder="Ex: Júnior, Pleno, Sênior"
                            variant="outlined"
                            autoFocus
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={loading}
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ModalCadastroNivel;
