import React from 'react';
import MapMarker from '../atoms/MapMarker';

const OfficeLocationMap = () => {
    return (
        <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative bg-gray-100">
            {/* Placeholder for real map (Leaflet/Google) to avoid API keys requirement for this demo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://placehold.co/1200x800/d1d5db/374151?text=Map+Si%C3%A8ge+WCP")' }}
            ></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wcp-blue-400 opacity-75"></div>
                    <MapMarker startPrice="Siège" className="relative" />
                </div>
            </div>

            <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                <h5 className="font-bold text-gray-900">West Coast Property</h5>
                <p className="text-sm text-gray-600 mt-1">15 Avenue de l'Océan, Biarritz</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-xs text-wcp-blue-600 font-semibold mt-2 inline-block hover:underline">
                    M'y rendre &rarr;
                </a>
            </div>
        </div>
    );
};

export default OfficeLocationMap;
