import React from 'react';
import SectionHeading from '../atoms/SectionHeading';
import MapMarker from '../atoms/MapMarker';

const LocationMap = ({ address }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mt-8">
            <SectionHeading className="mb-6">Localisation</SectionHeading>
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden bg-gray-200 border border-gray-300">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale opacity-60"
                    style={{ backgroundImage: 'url("https://placehold.co/1200x400/e5e7eb/9ca3af?text=Map+Location")' }}
                ></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <MapMarker type="active" className="scale-125" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded shadow text-sm font-medium text-gray-700">
                    {address}
                </div>
            </div>
        </div>
    );
};

export default LocationMap;
