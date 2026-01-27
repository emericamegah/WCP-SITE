import React from 'react';
import MapMarker from '../atoms/MapMarker';

const InteractiveMap = ({ properties, activePropertyId }) => {
    // Placeholder logic for map visualization
    // In a real app, integrate Leaflet or Google Maps here

    return (
        <div className="w-full h-full bg-gray-200 relative overflow-hidden rounded-xl border border-gray-300">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: 'url("https://placehold.co/1200x800/e5e7eb/9ca3af?text=Map+Placeholder")' }}
            ></div>

            {/* Mock Markers positioned via percentage for demo */}
            {properties.map((prop, index) => {
                // Mock random positions
                const top = 20 + (index * 15) % 60;
                const left = 20 + (index * 25) % 60;
                const isActive = prop.id === activePropertyId;

                return (
                    <div
                        key={prop.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top: `${top}%`, left: `${left}%` }}
                    >
                        <MapMarker type={isActive ? 'active' : 'default'} />
                        {isActive && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded shadow-lg text-xs font-bold whitespace-nowrap z-10">
                                {prop.price}
                            </div>
                        )}
                    </div>
                );
            })}

            <div className="absolute bottom-4 right-4 bg-white/90 p-2 text-xs rounded shadow text-gray-500">
                Map Interactive Placeholder
            </div>
        </div>
    );
};

export default InteractiveMap;
