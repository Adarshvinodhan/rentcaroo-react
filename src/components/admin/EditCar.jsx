import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../axios';

const EditCar = () => {
    const { id } = useParams(); // Get car ID from route parameters
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

    // Fetch car details on component load
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await api.get(`/api/car/${id}`);
                setCarData(response.data); // Populate form with car details
            } catch (error) {
                console.error('Error fetching car details:', error);
                alert('Failed to load car details. Please try again.');
            }
        };
        fetchCarDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/car/${id}`, carData);
            alert('Car updated successfully!');
            window.location.href = '/cars';
        } catch (error) {
            console.error('Error updating car:', error);
            alert('Failed to update car. Please try again.');
        }
    };

    return (
        <div className="flex justify-center p-4 sm:p-8 bg-gray-100 min-h-screen">
            <div className="w-full max-w-[90%] sm:max-w-lg lg:max-w-4xl bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Edit Car Details</h1>
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
                        Update Car
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCar;
