// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [notification, setNotification] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/register', { username, password, role })
            .then(response => {
                setNotification({ type: 'success', message: 'User registered successfully!' });
            })
            .catch(error => {
                setNotification({ type: 'error', message: 'Registration failed. Please try again.' });
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-6 max-w-4xl">
                <div className="lg:w-1/2">
                    <img src="/img1.jpg" alt="Registration" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="lg:w-1/2 flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Register</h2>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Role"
                            required
                            className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
            {notification && (
                <div
                    className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg w-80 ${
                        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
}

export default Register;
