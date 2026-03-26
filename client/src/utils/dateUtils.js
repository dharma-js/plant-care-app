export const calculateDaysUntilWatering = (nextWaterDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(nextWaterDate);
    nextDate.setHours(0, 0, 0, 0);
    
    const diffTime = nextDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
};

export const getWateringStatus = (daysUntil) => {
    if (daysUntil < 0) return { label: 'Overdue', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (daysUntil === 0) return { label: 'Water Today', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    if (daysUntil === 1) return { label: 'Tomorrow', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { label: `In ${daysUntil} days`, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
