import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useNiveis = () => {
    const [niveis, setNiveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        carregarNiveis();
    }, []);

    return {
        niveis,
        loading,
        error,
        carregarNiveis
    };
};
