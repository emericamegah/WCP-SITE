import React from 'react';
import PropTypes from 'prop-types';
import WCPButton from '../atoms/WCPButton';
import Icon from '../atoms/Icon';

const FilterSidebar = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Sidebar Panel */}
            <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Filtres</h2>
                    <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-500">
                        <Icon name="X" size={24} />
                    </button>
                </div>

                <div className="p-4 flex-grow overflow-y-auto">
                    {children}
                </div>

                <div className="p-4 border-t border-gray-200">
                    <WCPButton variant="primary" className="w-full" onClick={onClose}>
                        Afficher les résultats
                    </WCPButton>
                </div>
            </div>
        </div>
    );
};

FilterSidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default FilterSidebar;
