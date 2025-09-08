import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export const useDesenvolvedores = () => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const carregarDesenvolvedores = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/desenvolvedores');
            setDados(response.data.data || response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const apagarDesenvolvedor = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/desenvolvedores/${id}`);
            setDados(dados.filter(item => item.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleExcluir = async (id) => {
            try {
                await apagarDesenvolvedor(id);
                toast.success('Desenvolvedor deletado com sucesso!');
            } catch {
                toast.error('Erro ao deletar desenvolvedor');
            }
    };

    useEffect(() => {
        carregarDesenvolvedores();
    }, []);

    return { dados, loading, error, apagarDesenvolvedor, handleExcluir };
};