import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';

const ModalEdicaoDesenvolvedor = ({ open, onClose, desenvolvedor, onSave, niveis, loadingNiveis }) => {
    const [dadosForm, setDadosForm] = useState({
        nome: '',
        sexo: '',
        data_nascimento: '',
        hobby: '',
        nivel_id: ''
    });
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        if (desenvolvedor) {
            setDadosForm({
                nome: desenvolvedor.nome || '',
                sexo: desenvolvedor.sexo || '',
                data_nascimento: desenvolvedor.data_nascimento ? 
                    new Date(desenvolvedor.data_nascimento).toISOString().split('T')[0] : '',
                hobby: desenvolvedor.hobby || '',
                nivel_id: desenvolvedor.nivel?.id || desenvolvedor.nivel_id || ''
            });
        }
    }, [desenvolvedor]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDadosForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!dadosForm.nome || !dadosForm.sexo || !dadosForm.data_nascimento || !dadosForm.nivel_id) {
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }

        setSalvando(true);
        try {
            const resultado = await onSave(desenvolvedor.id, dadosForm);
            if (resultado) {
                onClose();
            }
        } finally {
            setSalvando(false);
        }
    };

    const handleClose = () => {
        if (!salvando) {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Desenvolvedor</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            name="nome"
                            label="Nome"
                            value={dadosForm.nome}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={salvando}
                        />

                        <FormControl fullWidth required disabled={salvando}>
                            <InputLabel>Sexo</InputLabel>
                            <Select
                                name="sexo"
                                value={dadosForm.sexo}
                                onChange={handleChange}
                                label="Sexo"
                            >
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Feminino</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            name="data_nascimento"
                            label="Data de Nascimento"
                            type="date"
                            value={dadosForm.data_nascimento}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={salvando}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                        />

                        <TextField
                            name="hobby"
                            label="Hobby"
                            value={dadosForm.hobby}
                            onChange={handleChange}
                            fullWidth
                            disabled={salvando}
                        />

                        <FormControl fullWidth required disabled={salvando || loadingNiveis}>
                            <InputLabel>Nível</InputLabel>
                            <Select
                                name="nivel_id"
                                value={dadosForm.nivel_id}
                                onChange={handleChange}
                                label="Nível"
                            >
                                {loadingNiveis ? (
                                    <MenuItem disabled>
                                        <CircularProgress size={20} />
                                    </MenuItem>
                                ) : (
                                    niveis.map((nivel) => (
                                        <MenuItem key={nivel.id} value={nivel.id}>
                                            {nivel.nivel}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose} 
                        disabled={salvando}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        variant="contained"
                        disabled={salvando}
                        startIcon={salvando && <CircularProgress size={20} />}
                    >
                        {salvando ? 'Salvando...' : 'Salvar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ModalEdicaoDesenvolvedor;
