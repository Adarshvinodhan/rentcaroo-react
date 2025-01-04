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
                rent: ''
            });
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Failed to add car. Please try again.');
        }
    };

    return (
        <div className="flex">
            <div className="min-h-screen w-[calc(100%-16rem)] ml-64 mt-16 bg-white text-black flex justify-center">
                <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Add a New Car</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['make', 'model', 'year', 'seat', 'color', 'rentPerHour'].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700" htmlFor={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    type={field === 'year' || field === 'seat' || field === 'rentPerHour' ? 'number' : 'text'}
                                    id={field}
                                    name={field}
                                    value={carData[field]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={carData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="image">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={carData.image}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                            <label className="ml-2 text-sm font-medium text-gray-700" htmlFor="availability">
                                Available
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Car
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCar;
