import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for transition
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const bgClass = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    return (
        <div className={`fixed bottom-8 right-8 ${bgClass} text-white px-6 py-4 rounded-xl shadow-2xl z-[100] flex items-center space-x-3 transform transition-all duration-300 translate-y-0 sm:translate-y-0 opacity-100 animate-in slide-in-from-bottom-5`}>
            {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-medium">{message}</span>
            <button onClick={() => setIsVisible(false)} className="hover:bg-white/20 p-1 rounded-full">
                <X size={16} />
            </button>
        </div>
    );
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']),
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
};

export default Toast;
