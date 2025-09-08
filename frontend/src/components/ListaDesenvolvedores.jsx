import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useDesenvolvedores } from './useDesenvolvedor';

const formatarData = (data) => {
    if (!data) return 'Data não informada';

    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
};

const ListaDesenvolvedores = () => {

    const { 
        dados, 
        loading,
        error,
        handleExcluir
    } = useDesenvolvedores();

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        toast.error(`Erro ao carregar desenvolvedores: ${error}`);
    }

    return (
        <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h5" component="h2" align='center' gutterBottom>
                Desenvolvedores
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Tabela de desenvolvedores">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Data de Nascimento</TableCell>
                            <TableCell>Nível</TableCell>
                            <TableCell>Hobby</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dados.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.nome}
                                </TableCell>
                                <TableCell>{item.sexo}</TableCell>
                                <TableCell>{formatarData(item.data_nascimento)}</TableCell>
                                <TableCell>{item.nivel?.nivel || 'Não informado'}</TableCell>
                                <TableCell>{item.hobby || 'Não informado'}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleExcluir(item.id, item.nome)}
                                    >
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ListaDesenvolvedores;
