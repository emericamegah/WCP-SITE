import React from 'react';
import WCPInput from '../atoms/WCPInput';
import WCPButton from '../atoms/WCPButton';
import Icon from '../atoms/Icon';

const SearchBar = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <form className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Type de bien</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="House" className="text-gray-400" size={18} />
                        </div>
                        <WCPInput placeholder="Maison, Appartement..." className="pl-10" />
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Localisation</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="MapPin" className="text-gray-400" size={18} />
                        </div>
                        <WCPInput placeholder="Ville ou code postal" className="pl-10" />
                    </div>
                </div>

                <div className="w-full md:w-auto">
                    <WCPButton variant="primary" className="w-full md:w-auto flex items-center gap-2">
                        <Icon name="Search" size={18} /> Rechercher
                    </WCPButton>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
