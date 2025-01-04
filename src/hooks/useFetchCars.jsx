import { useState, useEffect } from 'react';
import api from '../axios';

const useFetchCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if(!token)return;
        const response = await api.get('/api/cars');
        setCars(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, setCars, loading, error };
};

export default useFetchCars;
