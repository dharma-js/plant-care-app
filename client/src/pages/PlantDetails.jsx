import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { calculateDaysUntilWatering, getWateringStatus, formatDate } from '../utils/dateUtils';
import { Leaf, ArrowLeft, Edit3, Droplets, CalendarDays, History, Info } from 'lucide-react';

const PlantDetails = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPlant = async () => {
        try {
            const res = await api.get(`/plants/${id}`);
            setPlant(res.data);
        } catch (err) {
            setError('Failed to fetch plant details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlant();
    }, [id]);

    const handleWaterToday = async () => {
        try {
            const today = new Date().toISOString();
            await api.put(`/plants/${id}`, { lastWateredDate: today });
            fetchPlant(); // refresh
        } catch (error) {
            console.error('Error updating plant', error);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    );

    if (error) return <div className="text-center text-red-500 py-10 font-medium">{error}</div>;
    if (!plant) return <div className="text-center text-slate-500 py-10 font-medium">Plant not found</div>;

    const daysUntil = calculateDaysUntilWatering(plant.nextWaterDate);
    const status = getWateringStatus(daysUntil);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Nav */}
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="inline-flex items-center text-slate-500 hover:text-emerald-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>
                <Link to={`/edit-plant/${plant._id}`} className="inline-flex items-center text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl transition-colors font-medium shadow-sm">
                    <Edit3 className="w-4 h-4 mr-2" /> Edit Plant
                </Link>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Image Section */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 h-full flex flex-col">
                        <div className="flex-grow w-full h-64 md:h-auto rounded-2xl bg-emerald-50 flex items-center justify-center overflow-hidden">
                            {plant.image ? (
                                <img src={plant.image} alt={plant.plantName} className="object-cover w-full h-full" />
                            ) : (
                                <Leaf className="w-32 h-32 text-emerald-200" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="mb-6 flex justify-between items-start">
                            <div>
                                <h1 className="text-4xl font-bold text-slate-800 mb-2">{plant.plantName}</h1>
                                <p className="text-xl text-emerald-600 font-medium">{plant.plantType}</p>
                            </div>
                            <div className={`px-4 py-2 rounded-full font-bold border ${status.bg} ${status.color} ${status.border} shadow-sm`}>
                                {status.label}
                            </div>
                        </div>

                        {/* Status Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center">
                                <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Frequency</span>
                                <span className="font-bold text-slate-700">{plant.wateringFrequency} Days</span>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center text-center">
                                <History className="w-6 h-6 text-indigo-500 mb-2" />
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Last Watered</span>
                                <span className="font-bold text-slate-700">{formatDate(plant.lastWateredDate)}</span>
                            </div>
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex flex-col items-center justify-center text-center col-span-2 lg:col-span-2">
                                <CalendarDays className="w-6 h-6 text-amber-500 mb-2" />
                                <span className="text-xs text-amber-700 font-semibold uppercase tracking-wider mb-1">Next Watering</span>
                                <span className="font-bold text-amber-800">{formatDate(plant.nextWaterDate)}</span>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-emerald-800">Did you water it today?</h3>
                                <p className="text-sm text-emerald-600 mt-1">Update the schedule automatically.</p>
                            </div>
                            <button 
                                onClick={handleWaterToday}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md flex items-center"
                            >
                                <Droplets className="w-5 h-5 mr-2" /> Water Now
                            </button>
                        </div>
                    </div>

                    {/* Notes Section */}
                    {plant.notes && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center mb-4">
                                <Info className="w-5 h-5 mr-2 text-emerald-500" /> Care Notes
                            </h3>
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-slate-600 whitespace-pre-line leading-relaxed">
                                {plant.notes}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlantDetails;
