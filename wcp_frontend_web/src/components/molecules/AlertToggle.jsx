import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const AlertToggle = ({ enabled, onToggle }) => {
    return (
        <div className="flex items-center justify-between bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200">
            <div className="flex items-center">
                <div className={`p-1.5 rounded-full mr-3 ${enabled ? 'bg-wcp-blue-100 text-wcp-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    <Icon name="Bell" size={16} />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">Alerte Nouveautés</span>
                    <span className="text-xs text-gray-500">Soyez notifié des nouveaux biens</span>
                </div>
            </div>

            <button
                onClick={() => onToggle(!enabled)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-wcp-blue-600' : 'bg-gray-200'}`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
                />
            </button>
        </div>
    );
};

AlertToggle.propTypes = {
    enabled: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default AlertToggle;
