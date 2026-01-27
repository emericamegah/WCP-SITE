import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import WCPButton from '../atoms/WCPButton';
import BadgeStatus from '../atoms/BadgeStatus';
import Icon from '../atoms/Icon';
import { navigateToRequestSubmission } from '../../utils/submissionNavigator';

const PropertyCard = ({
    id,
    image,
    title,
    price,
    location,
    status,
    bedrooms,
    area,
    onDownload
}) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
            {/* Image Container */}
            <div className="relative overflow-hidden h-64">
                <img
                    src={image}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    alt={title}
                />
                <div className="absolute top-4 left-4">
                    <BadgeStatus type={status} />
                </div>
                <div className="absolute top-4 right-4">
                    <button className="bg-white/90 p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm backdrop-blur-sm">
                        <Icon name="Heart" size={18} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={title}>{title}</h3>
                        <span className="text-lg font-bold text-wcp-blue-600 whitespace-nowrap ml-2">{price}</span>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                        <Icon name="MapPin" size={14} className="mr-1 text-wcp-blue-500" />
                        {location}
                    </div>

                    {/* Features Grid */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1.5" title={`${bedrooms} Chambres`}>
                            <Icon name="Bed" size={16} className="text-gray-400" />
                            <span>{bedrooms} ch.</span>
                        </div>
                        <div className="h-4 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-1.5" title={`Surface ${area}`}>
                            <Icon name="Maximize" size={16} className="text-gray-400" />
                            <span>{area}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
                    <button
                        onClick={() => navigateToRequestSubmission(navigate, id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                        <Send size={16} />
                        Postuler
                    </button>
                    <WCPButton variant="outline" className="flex-1 text-sm py-2">
                        Voir détails
                    </WCPButton>
                    <button
                        onClick={onDownload}
                        className="inline-flex items-center justify-center px-3 py-2 border border-gray-200 rounded-md text-gray-500 hover:text-wcp-blue-600 hover:bg-gray-50 transition-colors"
                        title="Télécharger la fiche PDF"
                    >
                        <Icon name="FileDown" size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

PropertyCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['rent', 'sale', 'sold']).isRequired,
    bedrooms: PropTypes.number,
    area: PropTypes.string,
    onDownload: PropTypes.func,
};

export default PropertyCard;
