import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Calendar, ChevronRight } from 'lucide-react';
import { calculateDaysUntilWatering, getWateringStatus, formatDate } from '../utils/dateUtils';

const PlantCard = ({ plant, onWaterToday }) => {
    const daysUntil = calculateDaysUntilWatering(plant.nextWaterDate);
    const status = getWateringStatus(daysUntil);

    return (
        <div className={`relative bg-white rounded-2xl p-5 shadow-sm border transition-shadow hover:shadow-md flex flex-col ${status.border}`}>
            {/* Status Badge */}
            <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold border ${status.bg} ${status.color} ${status.border} shadow-sm`}>
                {status.label}
            </div>

            <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-emerald-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {plant.image ? (
                        <img src={plant.image} alt={plant.plantName} className="object-cover w-full h-full" />
                    ) : (
                        <span className="text-3xl">🪴</span>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{plant.plantName}</h3>
                    <p className="text-sm text-slate-500 font-medium">{plant.plantType}</p>
                </div>
            </div>

            <div className="space-y-2 mb-6 flex-grow text-sm text-slate-600">
                <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-emerald-500" />
                    <span>Every {plant.wateringFrequency} days</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>Last: {formatDate(plant.lastWateredDate)}</span>
                </div>
            </div>

            <div className="flex gap-2 mt-auto">
                <button 
                    onClick={() => onWaterToday(plant._id)}
                    className="flex-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-2 rounded-xl font-medium transition-colors text-sm flex items-center justify-center"
                >
                    <Droplets className="w-4 h-4 mr-1" /> Water Now
                </button>
                <Link 
                    to={`/plant/${plant._id}`}
                    className="flex-1 border border-slate-200 text-slate-700 hover:bg-slate-50 py-2 rounded-xl font-medium transition-colors text-sm flex items-center justify-center"
                >
                    Details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
    );
};

export default PlantCard;
