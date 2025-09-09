import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useDesenvolvedores = () => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState({
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1
    });

    const extrairMensagensErro = (error) => {
        if (error.response?.data?.details && Array.isArray(error.response.data.details)) {
            return error.response.data.details.map(detail => detail.message).join(', ');
        }
        return error.response?.data?.error || error.message || 'Erro desconhecido';
    };

    const carregarDesenvolvedores = async (page = 1, limit = 10, nome = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/desenvolvedores?page=${page}&limit=${limit}&nome=${nome}`);
            setDados(response.data.data || response.data);
            if (response.data.meta) {
                setMeta(response.data.meta);
            }
        } catch (error) {
            const mensagemErro = extrairMensagensErro(error);
            setError(mensagemErro);
        } finally {
            setLoading(false);
        }
    };

    const apagarDesenvolvedor = async (id, currentPage, rowsPerPage) => {
        try {
            await axios.delete(`http://localhost:3000/api/desenvolvedores/${id}`);
            await carregarDesenvolvedores(currentPage, rowsPerPage, true);
        } catch (error) {
            const mensagemErro = extrairMensagensErro(error);
            setError(mensagemErro);
            throw new Error(mensagemErro);
        }
    };

    const editarDesenvolvedor = async (id, dadosAtualizados) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/desenvolvedores/${id}`, dadosAtualizados);
            setDados(dados.map(item =>
                item.id === id ? { ...item, ...response.data.data } : item
            ));
            return response.data;
        } catch (error) {
            const mensagemErro = extrairMensagensErro(error);
            setError(mensagemErro);
            throw new Error(mensagemErro);
        }
    };

    const criarDesenvolvedor = async (dadosDesenvolvedor) => {
        try {
            const response = await axios.post('http://localhost:3000/api/desenvolvedores', dadosDesenvolvedor);
            setDados(prevDados => [...prevDados, response.data.data]);
            return response.data;
        } catch (error) {
            const mensagemErro = extrairMensagensErro(error);
            setError(mensagemErro);
            throw new Error(mensagemErro);
        }
    };

    const handleExcluir = async (id, currentPage, rowsPerPage) => {
        try {
            await apagarDesenvolvedor(id, currentPage, rowsPerPage);
            toast.success('Desenvolvedor deletado com sucesso!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleEditar = async (id, dadosAtualizados, currentPage, rowsPerPage) => {
        try {
            await editarDesenvolvedor(id, dadosAtualizados);
            toast.success('Desenvolvedor editado com sucesso!');
            await carregarDesenvolvedores(currentPage, rowsPerPage);
            return true;
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    const handleCriar = async (dadosDesenvolvedor) => {
        try {
            await criarDesenvolvedor(dadosDesenvolvedor);
            toast.success('Desenvolvedor cadastrado com sucesso!');
            return true;
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    useEffect(() => {
        const inicializar = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/api/desenvolvedores?page=1&limit=10');
                setDados(response.data.data || response.data);
                if (response.data.meta) {
                    setMeta(response.data.meta);
                }
            } catch (error) {
                const mensagemErro = extrairMensagensErro(error);
                setError(mensagemErro);
            } finally {
                setLoading(false);
            }
        };
        inicializar();
    }, []);

    return {
        dados,
        loading,
        error,
        meta,
        carregarDesenvolvedores,
        apagarDesenvolvedor,
        handleExcluir,
        editarDesenvolvedor,
        handleEditar,
        criarDesenvolvedor,
        handleCriar
    };
};