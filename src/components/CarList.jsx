import React from 'react';
import useFetchCars from '../hooks/useFetchCars';
import CarCard from './CarCard';

const CarList = () => {
  const { cars, setCars, loading, error } = useFetchCars();

  const removeCarFromList = (deletedCarId) => {
    setCars((prevCars) => prevCars.filter((car) => car._id !== deletedCarId));
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
<div className="ml-0 sm:ml-64 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:pt-16">
  {cars.map((car) => (
    <CarCard key={car._id} car={car} onDelete={removeCarFromList} />
  ))}
</div>

  );
};

export default CarList;
