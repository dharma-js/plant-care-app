import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Leaf, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-emerald-600 shadow-md">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex">
                        <Link to="/" className="flex items-center text-white font-bold text-xl drop-shadow-sm">
                            <Leaf className="mr-2" />
                            Plant Care
                        </Link>
                    </div>
                    <div>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-white hidden sm:block">Hello, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-emerald-100 hover:text-white transition-colors p-2 rounded-md hover:bg-emerald-500"
                                >
                                    <LogOut className="w-5 h-5 mr-1" />
                                    <span className="hidden sm:block">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/login" className="text-emerald-50 hover:text-white hover:bg-emerald-500 px-3 py-2 rounded-md font-medium transition-colors">Login</Link>
                                <Link to="/register" className="bg-white text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-md font-medium shadow-sm transition-colors">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
