// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/home" className="text-xl font-bold">MyApp</Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/home" className="hover:underline">Home</Link>
                        <Link to="/Dash" className="hover:underline">Dashboard</Link>
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center focus:outline-none"
                            >
                                <FaUserCircle size={24} />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/Dash"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                        onClick={() => {
                                            // Handle logout
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
                    <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
                    <p className="text-gray-700">You have successfully logged in!</p>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 MyApp. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
