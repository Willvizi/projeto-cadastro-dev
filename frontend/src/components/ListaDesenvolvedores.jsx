import React, { useState } from 'react';
import { 
    CircularProgress, 
    Paper, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Button, 
    Box,
    TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDesenvolvedores } from './useDesenvolvedor';
import { useNiveis } from './useNiveis';
import ConfirmarExclusao from './ConfirmarExclusao';
import ModalEdicaoDesenvolvedor from './ModalEdicaoDesenvolvedor';
import ModalCadastroDesenvolvedor from './ModalCadastroDesenvolvedor';

const formatarData = (data) => {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
};

const ListaDesenvolvedores = () => {
    const { dados, loading, meta, handleExcluir, handleEditar, handleCriar, carregarDesenvolvedores } = useDesenvolvedores();
    const { niveis, loading: carregandoNiveis } = useNiveis();

    const [dialogConfirm, setDialogConfirm] = useState({ open: false, id: null, nome: '' });
    const [modalEdicao, setModalEdicao] = useState({ open: false, desenvolvedor: null });
    const [modalCadastro, setModalCadastro] = useState({ open: false });
    const [ordenarPor, setOrdenarPor] = useState('');
    const [direcaoOrdem, setDirecaoOrdem] = useState('asc');

    const sortData = (data, orderBy, order) => {
        if (!orderBy) return data;

        return [...data].sort((a, b) => {
            let aValue, bValue;

            switch (orderBy) {
                case 'nome':
                    aValue = a.nome?.toLowerCase() || '';
                    bValue = b.nome?.toLowerCase() || '';
                    break;
                case 'nivel':
                    aValue = a.nivel?.nivel?.toLowerCase() || '';
                    bValue = b.nivel?.nivel?.toLowerCase() || '';
                    break;
                case 'data_nascimento':
                    aValue = new Date(a.data_nascimento);
                    bValue = new Date(b.data_nascimento);
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const handleRequestSort = (property) => {
        const isAsc = ordenarPor === property && direcaoOrdem === 'asc';
        setDirecaoOrdem(isAsc ? 'desc' : 'asc');
        setOrdenarPor(property);
    };

    const dadosOrdenados = sortData(dados, ordenarPor, direcaoOrdem);

    const abrirConfirmacao = (id, nome) => {
        setDialogConfirm({
            open: true,
            id: id,
            nome: nome
        });
    };

    const fecharConfirmacao = () => {
        setDialogConfirm({
            open: false,
            id: null,
            nome: ''
        });
    };

    const confirmarExclusao = async () => {
        await handleExcluir(dialogConfirm.id, meta.current_page, meta.per_page);
        fecharConfirmacao();
    };

    const abrirModalEdicao = (desenvolvedor) => {
        setModalEdicao({
            open: true,
            desenvolvedor: desenvolvedor
        });
    };

    const fecharModalEdicao = () => {
        setModalEdicao({
            open: false,
            desenvolvedor: null
        });
    };

    const abrirModalCadastro = () => {
        setModalCadastro({
            open: true
        });
    };

    const fecharModalCadastro = () => {
        setModalCadastro({
            open: false
        });
    };

    const handleEditarComPaginacao = async (id, dadosAtualizados) => {
        const resultado = await handleEditar(id, dadosAtualizados, meta.current_page, meta.per_page);
        if (resultado) {
            fecharModalEdicao();
        }
        return resultado;
    };

    const handleCadastrarComPaginacao = async (dadosDesenvolvedor) => {
        const resultado = await handleCriar(dadosDesenvolvedor);
        if (resultado) {
            fecharModalCadastro();
        }
        return resultado;
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h5" component="h2" align='center' gutterBottom>
                Desenvolvedores
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={abrirModalCadastro}
                >
                    Novo Desenvolvedor
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                    }}
                                    onClick={() => handleRequestSort('nome')}
                                >
                                    Nome
                                    {ordenarPor === 'nome' && (
                                        direcaoOrdem === 'desc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                    }}
                                    onClick={() => handleRequestSort('data_nascimento')}
                                >
                                    Data de Nascimento
                                    {ordenarPor === 'data_nascimento' && (
                                        direcaoOrdem === 'desc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                    }}
                                    onClick={() => handleRequestSort('nivel')}
                                >
                                    Nível
                                    {ordenarPor === 'nivel' && (
                                        direcaoOrdem === 'desc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell>Hobby</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dadosOrdenados.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                    {item.nome}
                                </TableCell>
                                <TableCell>{item.sexo}</TableCell>
                                <TableCell>{formatarData(item.data_nascimento)}</TableCell>
                                <TableCell>{item.nivel?.nivel || 'Não informado'}</TableCell>
                                <TableCell>{item.hobby || 'Não informado'}</TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            startIcon={<EditIcon />}
                                            onClick={() => abrirModalEdicao(item)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => abrirConfirmacao(item.id, item.nome)}
                                        >
                                            Excluir
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ConfirmarExclusao
                open={dialogConfirm.open}
                message={`Tem certeza que deseja excluir o desenvolvedor "${dialogConfirm.nome}"?`}
                onCancel={fecharConfirmacao}
                onConfirm={confirmarExclusao}
            />

            <ModalEdicaoDesenvolvedor
                open={modalEdicao.open}
                onClose={fecharModalEdicao}
                desenvolvedor={modalEdicao.desenvolvedor}
                onSave={handleEditarComPaginacao}
                niveis={niveis}
                loadingNiveis={carregandoNiveis}
            />

            <ModalCadastroDesenvolvedor
                open={modalCadastro.open}
                onClose={fecharModalCadastro}
                onSave={handleCadastrarComPaginacao}
                niveis={niveis}
                loadingNiveis={carregandoNiveis}
            />

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={meta.total}
                rowsPerPage={meta.per_page}
                page={meta.current_page - 1}
                onPageChange={(event, newPage) => carregarDesenvolvedores(newPage + 1, meta.per_page)}
                onRowsPerPageChange={(event) => {
                    const newRowsPerPage = parseInt(event.target.value, 10);
                    carregarDesenvolvedores(1, newRowsPerPage);
                }}
            />
        </Paper>
    );
};

export default ListaDesenvolvedores;
