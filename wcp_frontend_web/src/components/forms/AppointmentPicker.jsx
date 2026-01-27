import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar, Clock, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

/**
 * AppointmentPicker Component
 * Specialized for West Coast Property: Selecting date and time for property visits.
 */
const AppointmentPicker = ({ onSelect, className = '' }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Mock dates (next 7 days starting tomorrow)
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d;
    });

    const timeSlots = [
        "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
    ];

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }).format(date);
    };

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            onSelect({ date: selectedDate, time: selectedTime });
        }
    };

    return (
        <div className={twMerge("bg-white border border-slate-200 rounded-2xl p-6 shadow-sm", className)}>
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="text-primary" size={20} />
                </div>
                <h3 className="font-bold text-slate-800">Prendre rendez-vous</h3>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">Choisir une date</p>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {dates.map((date, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedDate(date)}
                            className={twMerge(
                                "flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border transition-all duration-200",
                                selectedDate?.toDateString() === date.toDateString()
                                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                                    : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300"
                            )}
                        >
                            <span className="text-[10px] uppercase font-bold opacity-70">
                                {new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date)}
                            </span>
                            <span className="text-lg font-bold">
                                {date.getDate()}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
                <div className="animate-in mb-6">
                    <p className="text-sm font-semibold text-slate-700 mb-3 block flex items-center gap-2">
                        <Clock size={14} />
                        Créneaux disponibles
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={twMerge(
                                    "p-2 text-sm font-medium rounded-lg border transition-all",
                                    selectedTime === time
                                        ? "bg-slate-900 border-slate-900 text-white"
                                        : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300"
                                )}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Summary & Confirm */}
            <div className={twMerge(
                "mt-6 pt-6 border-t border-slate-100 flex items-center justify-between transition-opacity",
                (!selectedDate || !selectedTime) && "opacity-50 grayscale pointer-events-none"
            )}>
                <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Récapitulatif</p>
                    <p className="text-sm font-semibold text-slate-800">
                        {selectedDate ? formatDate(selectedDate) : '...'} à {selectedTime || '...'}
                    </p>
                </div>
                <button
                    onClick={handleConfirm}
                    className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                >
                    Confirmer
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

AppointmentPicker.propTypes = {
    onSelect: PropTypes.func,
    className: PropTypes.string
};

export default AppointmentPicker;
