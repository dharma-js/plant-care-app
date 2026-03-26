import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
// We will create these pages next
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddPlant from './pages/AddPlant';
import EditPlant from './pages/EditPlant';
import PlantDetails from './pages/PlantDetails';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/add-plant" 
                        element={
                            <PrivateRoute>
                                <AddPlant />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/edit-plant/:id" 
                        element={
                            <PrivateRoute>
                                <EditPlant />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/plant/:id" 
                        element={
                            <PrivateRoute>
                                <PlantDetails />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </main>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
