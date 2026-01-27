import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * PropertyMap Component
 * Interactive map to display property locations.
 */
const PropertyMap = ({
    properties = [],
    center = [5.36, -4.008], // Default to Abidjan coordinates
    zoom = 13,
    className = "h-[400px] w-full rounded-xl overflow-hidden border border-slate-200"
}) => {
    return (
        <div className={className}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.lat, property.lng]}
                    >
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-slate-900">{property.title}</h3>
                                <p className="text-sm text-slate-600">{property.price} FCFA</p>
                                <a
                                    href={`/biens/${property.id}`}
                                    className="text-primary text-xs font-semibold hover:underline mt-1 block"
                                >
                                    Voir les détails
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

PropertyMap.propTypes = {
    properties: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number
    })),
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    className: PropTypes.string
};

export default PropertyMap;
