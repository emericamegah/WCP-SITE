import React from 'react';
import PropTypes from 'prop-types';
import WCPInput from '../atoms/WCPInput';
import WCPSelect from '../atoms/WCPSelect';
import WCPButton from '../atoms/WCPButton';
import Icon from '../atoms/Icon';

const SearchFilterBar = ({ filters, onFilterChange, onSearch }) => {
    const typeOptions = [
        { value: 'all', label: 'Tous les biens' },
        { value: 'house', label: 'Maison / Villa' },
        { value: 'apartment', label: 'Appartement' },
        { value: 'land', label: 'Terrain' },
        { value: 'commercial', label: 'Local Commercial' }
    ];

    const budgetOptions = [
        { value: 'all', label: 'Tout budget' },
        { value: 'under-100m', label: '< 100M FCFA' },
        { value: '100m-300m', label: '100M - 300M FCFA' },
        { value: '300m-500m', label: '300M - 500M FCFA' },
        { value: 'over-500m', label: '> 500M FCFA' }
    ];

    return (
        <div className="bg-white p-4 shadow-sm border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Text Search */}
                <div className="flex-grow lg:flex-grow-[2]">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="Search" className="text-gray-400" size={18} />
                        </div>
                        <WCPInput
                            placeholder="Ville, quartier, référence..."
                            className="pl-10 h-full"
                            value={filters.query || ''}
                            onChange={(e) => onFilterChange('query', e.target.value)}
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex-grow lg:w-48">
                    <WCPSelect
                        options={typeOptions}
                        placeholder="Type de bien"
                        value={filters.type}
                        onChange={(e) => onFilterChange('type', e.target.value)}
                        iconName="Home"
                    />
                </div>

                <div className="flex-grow lg:w-48">
                    <WCPSelect
                        options={budgetOptions}
                        placeholder="Budget"
                        value={filters.budget}
                        onChange={(e) => onFilterChange('budget', e.target.value)}
                        iconName="Banknote"
                    />
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                    <WCPButton variant="primary" onClick={onSearch} className="w-full lg:w-auto h-full">
                        Rechercher
                    </WCPButton>
                </div>
            </div>
        </div>
    );
};

SearchFilterBar.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchFilterBar;
