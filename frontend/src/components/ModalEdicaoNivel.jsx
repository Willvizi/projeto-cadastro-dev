import React, { useState, useEffect } from 'react';
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

const ModalEdicaoNivel = ({ open, onClose, nivel, onSave }) => {
    const [nomeNivel, setNomeNivel] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (nivel) {
            setNomeNivel(nivel.nivel || '');
        }
    }, [nivel]);

    const handleClose = () => {
        setNomeNivel('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nomeNivel.trim()) {
            return;
        }

        setLoading(true);
        try {
            await onSave(nivel.id, { nivel: nomeNivel.trim() });
            handleClose();
        } catch (error) {
            console.error('Erro ao editar nível:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!nivel) {
        return null;
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6">Editar Nível</Typography>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Nome do Nível"
                            value={nomeNivel}
                            onChange={(e) => setNomeNivel(e.target.value)}
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

export default ModalEdicaoNivel;
