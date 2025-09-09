import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useNiveis = () => {
    const [niveis, setNiveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
    const [meta, setMeta] = useState({
        current_page: 1,
        per_page: 10,
        total: 0,
        last_page: 1
    });

    const handleBackendError = (error, defaultMessage) => {
        if (error.response?.data?.details) {
            const errorsByField = {};
            error.response.data.details.forEach(detail => {
                if (!errorsByField[detail.field]) {
                    errorsByField[detail.field] = [];
                }
                errorsByField[detail.field].push(detail.message);
            });
            Object.keys(errorsByField).forEach(field => {
                const messages = errorsByField[field].join('; ');
                toast.error(messages);
            });
        } else if (error.response?.data?.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error(defaultMessage);
        }
    };

    const carregarNiveis = async (page = 1, perPage = 10, nivel = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/niveis?page=${page}&limit=${perPage}&nivel=${nivel}`);
            setNiveis(response.data.data || response.data);
            if (response.data.meta) {
                setMeta(response.data.meta);
            }
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
            carregarNiveis(meta.current_page, meta.per_page);
        } catch (error) {
            handleBackendError(error, 'Erro ao deletar nível');
        }
    };

    const editarNivel = async (id, dados) => {
        try {
            await axios.patch(`http://localhost:3000/api/niveis/${id}`, dados);
            toast.success('Nível editado com sucesso');
            carregarNiveis(meta.current_page, meta.per_page);
        } catch (error) {
            handleBackendError(error, 'Erro ao editar nível');
        }
    };

    const adicionarNivel = async (dados) => {
        try {
            await axios.post('http://localhost:3000/api/niveis', dados);
            toast.success('Nível adicionado com sucesso');
            carregarNiveis(meta.current_page, meta.per_page);
        } catch (error) {
            handleBackendError(error, 'Erro ao adicionar nivel');
        }
    };

    const handleDeletarNivel = (id) => {
        setConfirmDelete({ open: true, id });
    };

    const confirmarDelecao = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/niveis/${confirmDelete.id}`);
            toast.success('Nível deletado com sucesso');
            carregarNiveis(meta.current_page, meta.per_page);
        } catch (error) {
            handleBackendError(error, 'Erro ao deletar nivel');
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
        meta,
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
