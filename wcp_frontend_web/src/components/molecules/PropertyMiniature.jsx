import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, ArrowRight } from 'lucide-react';
import PropertyStatus from '../atoms/PropertyStatus';
import { twMerge } from 'tailwind-merge';

const PropertyMiniature = ({ property, onManage, layout = 'horizontal', className = '' }) => {
    const formatAmount = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    if (layout === 'vertical') {
        return (
            <div className={twMerge(
                "bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200",
                className
            )}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                        <PropertyStatus status={property.status} />
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-[#111827] text-lg mb-2 line-clamp-1">
                        {property.title}
                    </h3>
                    <div className="flex items-start gap-1.5 text-gray-600 text-sm mb-3">
                        <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{property.address}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                            <p className="text-xs text-gray-500">Loyer mensuel</p>
                            <p className="font-bold text-[#1E3A8A]">
                                {formatAmount(property.monthlyRent)} FCFA
                            </p>
                        </div>
                        <button
                            onClick={() => onManage(property)}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A] hover:text-blue-700 transition-colors"
                        >
                            Gérer
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Horizontal layout
    return (
        <div className={twMerge(
            "bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex",
            className
        )}>
            {/* Image */}
            <div className="relative w-32 h-32 flex-shrink-0">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-[#111827] line-clamp-1">
                            {property.title}
                        </h3>
                        <PropertyStatus status={property.status} />
                    </div>
                    <div className="flex items-start gap-1.5 text-gray-600 text-sm">
                        <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{property.address}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500">Loyer mensuel</p>
                        <p className="font-bold text-[#1E3A8A] text-sm">
                            {formatAmount(property.monthlyRent)} FCFA
                        </p>
                    </div>
                    <button
                        onClick={() => onManage(property)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A] hover:text-blue-700 transition-colors"
                    >
                        Gérer
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

PropertyMiniature.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['loué', 'vacant', 'maintenance']).isRequired,
        monthlyRent: PropTypes.number.isRequired,
    }).isRequired,
    onManage: PropTypes.func.isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']),
    className: PropTypes.string,
};

export default PropertyMiniature;
