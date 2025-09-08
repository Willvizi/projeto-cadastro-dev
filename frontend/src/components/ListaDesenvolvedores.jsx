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
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDesenvolvedores } from './useDesenvolvedor';
import ConfirmarExclusao from './ConfirmarExclusao';
import ModalEdicaoDesenvolvedor from './ModalEdicaoDesenvolvedor';
import ModalCadastroDesenvolvedor from './ModalCadastroDesenvolvedor';

const formatarData = (data) => {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
};

const ListaDesenvolvedores = () => {
    const { loading, handleExcluir, handleEditar, handleCriar } = useDesenvolvedores();

    const [niveis, setNiveis] = useState([]);
    const [carregandoNiveis, setCarregandoNiveis] = useState(false);
    const [todosDesenvolvedores, setTodosDesenvolvedores] = useState([]);
    const [dialogConfirm, setDialogConfirm] = useState({ open: false, id: null, nome: '' });
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [linhasPorPagina, setLinhasPorPagina] = useState(10);
    const [ordenarPor, setOrdenarPor] = useState('');
    const [direcaoOrdem, setDirecaoOrdem] = useState('asc');
    const [modalEdicao, setModalEdicao] = useState({ open: false, desenvolvedor: null });
    const [modalCadastro, setModalCadastro] = useState({ open: false });

    React.useEffect(() => {
        const carregarTodosDesenvolvedores = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/desenvolvedores?limit=1000');
                setTodosDesenvolvedores(response.data.data || response.data);
            } catch (error) {
                console.error('Erro ao carregar todos os desenvolvedores:', error);
            }
        };
        carregarTodosDesenvolvedores();
    }, []);

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
        setPaginaAtual(0);
    };

    const sortedData = sortData(todosDesenvolvedores, ordenarPor, direcaoOrdem);
    const paginatedData = sortedData.slice(paginaAtual * linhasPorPagina, paginaAtual * linhasPorPagina + linhasPorPagina);

    const handleChangePage = (event, newPage) => {
        setPaginaAtual(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setLinhasPorPagina(newRowsPerPage);
        setPaginaAtual(0);
    };

    const carregarNiveis = async () => {
        try {
            setCarregandoNiveis(true);
            const response = await axios.get('http://localhost:3000/api/niveis?limit=1000');
            setNiveis(response.data.data || response.data);
        } catch {
            toast.error('Erro ao carregar níveis');
        } finally {
            setCarregandoNiveis(false);
        }
    };

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
        await handleExcluir(dialogConfirm.id, paginaAtual + 1, linhasPorPagina);
        try {
            const response = await axios.get('http://localhost:3000/api/desenvolvedores?limit=1000');
            setTodosDesenvolvedores(response.data.data || response.data);
        } catch (error) {
            console.error('Erro ao recarregar desenvolvedores:', error);
        }
        fecharConfirmacao();
    };

    const abrirModalEdicao = (desenvolvedor) => {
        carregarNiveis();
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
        carregarNiveis();
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
        const resultado = await handleEditar(id, dadosAtualizados, paginaAtual + 1, linhasPorPagina);
        if (resultado) {
            try {
                const response = await axios.get('http://localhost:3000/api/desenvolvedores?limit=1000');
                setTodosDesenvolvedores(response.data.data || response.data);
            } catch (error) {
                console.error('Erro ao recarregar desenvolvedores:', error);
            }
            fecharModalEdicao();
        }
        return resultado;
    };

    const handleCadastrarComPaginacao = async (dadosDesenvolvedor) => {
        const resultado = await handleCriar(dadosDesenvolvedor);
        if (resultado) {
            try {
                const response = await axios.get('http://localhost:3000/api/desenvolvedores?limit=1000');
                setTodosDesenvolvedores(response.data.data || response.data);
            } catch (error) {
                console.error('Erro ao recarregar desenvolvedores:', error);
            }
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
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer'
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
                        {paginatedData.map((item) => (
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
                count={sortedData.length}
                rowsPerPage={linhasPorPagina}
                page={paginaAtual}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ListaDesenvolvedores;
