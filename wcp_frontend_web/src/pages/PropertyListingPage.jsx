import React, { useState, useEffect } from 'react';
import Navbar from '../components/organisms/Navbar';
import SearchFilterBar from '../components/molecules/SearchFilterBar';
import SplitViewContainer from '../components/organisms/SplitViewContainer';
import AlertToggle from '../components/molecules/AlertToggle';
import FilterSidebar from '../components/organisms/FilterSidebar';
import Icon from '../components/atoms/Icon';

import client from '../api/client';

const PropertyListingPage = () => {
    const [filters, setFilters] = useState({ query: '', type: '', budget: '' });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [alertEnabled, setAlertEnabled] = useState(false);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.get('/properties')
            .then(res => {
                setProperties(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Simple client-side filtering for demonstration
    const filteredProperties = properties.filter(p => {
        if (filters.query && !p.title.toLowerCase().includes(filters.query.toLowerCase()) && !p.location.toLowerCase().includes(filters.query.toLowerCase())) return false;
        // add other filters if needed
        return true;
    });

    const handleSearch = () => {
        console.log('Searching with filters:', filters);
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
            <Navbar />

            {/* Top Filter Bar (Desktop) */}
            <div className="hidden lg:block z-20 relative">
                <SearchFilterBar
                    filters={filters}
                    onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                    onSearch={handleSearch}
                />
            </div>

            {/* Mobile Filter Trigger */}
            <div className="lg:hidden p-4 bg-white shadow-sm flex items-center justify-between z-20">
                <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="flex items-center gap-2 text-gray-700 font-medium"
                >
                    <Icon name="SlidersHorizontal" size={20} /> Filtres
                </button>
                <AlertToggle enabled={alertEnabled} onToggle={setAlertEnabled} />
            </div>

            {/* Main Content */}
            {loading ? (
                <div className="flex h-full items-center justify-center">Chargement...</div>
            ) : (
                <SplitViewContainer properties={filteredProperties} />
            )}

            {/* Mobile Sidebar */}
            <FilterSidebar isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)}>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                            placeholder="Ville, référence..."
                            value={filters.query || ''}
                            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                        />
                    </div>
                    {/* Reuse Select Logic or components here for full mobile form */}
                    <div className="text-sm text-gray-500 italic">Options de filtres complètes...</div>
                </div>
            </FilterSidebar>
        </div>
    );
};

export default PropertyListingPage;
