import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useNiveis = () => {
    const [niveis, setNiveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

    const carregarNiveis = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/niveis');
            setNiveis(response.data.data || response.data);
        } catch (error) {
            setError(error.message);
            toast.error('Erro ao carregar níveis');
        } finally {
            setLoading(false);
        }
    };

    const deletarNivel = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/niveis/${id}`);
            toast.success('Nível deletado com sucesso');
            carregarNiveis();
        } catch {
            toast.error('Erro ao deletar nível');
        }
    };

    const editarNivel = async (id, dados) => {
        try {
            await axios.put(`http://localhost:3000/api/niveis/${id}`, dados);
            toast.success('Nível editado com sucesso');
            carregarNiveis();
        } catch {
            toast.error('Erro ao editar nível');
        }
    };

    const adicionarNivel = async (dados) => {
        try {
            await axios.post('http://localhost:3000/api/niveis', dados);
            toast.success('Nível adicionado com sucesso');
            carregarNiveis();
        } catch {
            toast.error('Erro ao adicionar nível');
        }
    };

    const handleDeletarNivel = (id) => {
        setConfirmDelete({ open: true, id });
    };

    const confirmarDelecao = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/niveis/${confirmDelete.id}`);
            toast.success('Nível deletado com sucesso');
            carregarNiveis();
        } catch {
            toast.error('Erro ao deletar nível');
        } finally {
            setConfirmDelete({ open: false, id: null });
        }
    };

    const cancelarDelecao = () => {
        setConfirmDelete({ open: false, id: null });
    };

    useEffect(() => {
        carregarNiveis();
    }, []);

    return {
        niveis,
        loading,
        error,
        carregarNiveis,
        deletarNivel,
        handleDeletarNivel,
        confirmDelete,
        confirmarDelecao,
        cancelarDelecao,
        editarNivel,
        adicionarNivel
    };
};
