import React, { useState } from 'react';
import api from '../../axios';

const AddCar = () => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        seat: '',
        color: '',
        description: '',
        image: '',
        availability: true,
        rentPerHour: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/car', carData);
            alert('Car added successfully!');
            window.location.href = '/';
            setCarData({
                make: '',
                model: '',
                year: '',
                seat: '',
                color: '',
                description: '',
                image: '',
                availability: true,
                rentPerHour: ''
            });
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Failed to add car. Please try again.');
        }
    };

    return (
        <div className="flex justify-center bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Add a New Car</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {['make', 'model', 'year', 'seat', 'color', 'rentPerHour'].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label htmlFor={field} className="text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={field === 'year' || field === 'seat' || field === 'rentPerHour' ? 'number' : 'text'}
                                id={field}
                                name={field}
                                value={carData[field]}
                                onChange={handleChange}
                                className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    ))}

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={carData.description}
                            onChange={handleChange}
                            className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="image" className="text-sm font-medium text-gray-700">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={carData.image}
                            onChange={handleChange}
                            className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="availability"
                            name="availability"
                            checked={carData.availability}
                            onChange={(e) => setCarData({ ...carData, availability: e.target.checked })}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="availability" className="ml-2 text-sm font-medium text-gray-700">
                            Available
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Car
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
