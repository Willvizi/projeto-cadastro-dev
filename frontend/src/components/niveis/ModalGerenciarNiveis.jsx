import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    CircularProgress,
    IconButton,
    Tooltip,
    TablePagination,
    TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmarExclusao from '../util/ConfirmarExclusao';
import ModalCadastroNivel from './ModalCadastroNivel';
import ModalEdicaoNivel from './ModalEdicaoNivel';

const ModalGerenciarNiveis = ({ 
    open, 
    onClose,
    niveis,
    loading,
    meta,
    carregarNiveis,
    handleDeletarNivel,
    confirmDelete,
    confirmarDelecao,
    cancelarDelecao,
    editarNivel,
    adicionarNivel
}) => {
    const [modalCadastro, setModalCadastro] = useState({ open: false });
    const [modalEdicao, setModalEdicao] = useState({ open: false, nivel: null });
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const abrirModalCadastro = () => {
        setModalCadastro({ open: true });
    };

    const fecharModalCadastro = () => {
        setModalCadastro({ open: false });
    };

    const abrirModalEdicao = (nivel) => {
        setModalEdicao({ open: true, nivel });
    };

    const fecharModalEdicao = () => {
        setModalEdicao({ open: false, nivel: null });
    };

    const handlePesquisar = () => {
        carregarNiveis(1, meta.per_page, termoPesquisa);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handlePesquisar();
        }
    };

    const handleAdicionarNivel = async (dados) => {
        await adicionarNivel(dados);
        fecharModalCadastro();
        carregarNiveis(meta.current_page, meta.per_page, termoPesquisa);
    };

    const handleEditarNivel = async (id, dados) => {
        await editarNivel(id, dados);
        fecharModalEdicao();
        carregarNiveis(meta.current_page, meta.per_page, termoPesquisa);
    };

    return (
        <>
            <Dialog 
                open={open} 
                onClose={onClose} 
                maxWidth="md" 
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        overflow: 'auto',
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none'
                    },
                    '& .MuiDialogContent-root': {
                        overflow: 'auto',
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none'
                    }
                }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Gerenciar Níveis</Typography>
                        <IconButton onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={abrirModalCadastro}
                        >
                            Novo Nível
                        </Button>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Pesquisar por nível"
                            placeholder="Digite o nome do nível"
                            value={termoPesquisa}
                            onChange={(e) => setTermoPesquisa(e.target.value)}
                            onKeyDown={handleKeyDown}
                            sx={{ mb: 2 }}
                        />
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer 
                            component={Paper} 
                            variant="outlined"
                            sx={{ 
                                overflow: 'auto',
                                '&::-webkit-scrollbar': { display: 'none' }, 
                                scrollbarWidth: 'none',
                                maxHeight: '400px'
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Nível</TableCell>
                                        <TableCell align="center">Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {niveis.length > 0 ? (
                                        niveis.map((nivel) => (
                                            <TableRow key={nivel.id}>
                                                <TableCell>{nivel.id}</TableCell>
                                                <TableCell>{nivel.nivel}</TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                        <Tooltip title="Editar">
                                                            <IconButton
                                                                color="primary"
                                                                size="small"
                                                                onClick={() => abrirModalEdicao(nivel)}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Excluir">
                                                            <IconButton
                                                                color="error"
                                                                size="small"
                                                                onClick={() => handleDeletarNivel(nivel.id)}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                <Typography color="textSecondary">
                                                    Nenhum nível encontrado
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>

                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        {!loading && (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={meta.total}
                                rowsPerPage={meta.per_page}
                                page={meta.current_page - 1}
                                onPageChange={(event, newPage) => carregarNiveis(newPage + 1, meta.per_page, termoPesquisa)}
                                onRowsPerPageChange={(event) => {
                                    const newRowsPerPage = parseInt(event.target.value, 10);
                                    carregarNiveis(1, newRowsPerPage, termoPesquisa);
                                }}
                                sx={{ flex: 1 }}
                            />
                        )}
                        <Button onClick={onClose}>Fechar</Button>
                    </Box>
                </DialogActions>
            </Dialog>

            <ConfirmarExclusao
                open={confirmDelete.open}
                message="Tem certeza que deseja deletar este nível?"
                onCancel={cancelarDelecao}
                onConfirm={confirmarDelecao}
            />

            <ModalCadastroNivel
                open={modalCadastro.open}
                onClose={fecharModalCadastro}
                onSave={handleAdicionarNivel}
            />

            <ModalEdicaoNivel
                open={modalEdicao.open}
                onClose={fecharModalEdicao}
                nivel={modalEdicao.nivel}
                onSave={handleEditarNivel}
            />
        </>
    );
};

export default ModalGerenciarNiveis;
