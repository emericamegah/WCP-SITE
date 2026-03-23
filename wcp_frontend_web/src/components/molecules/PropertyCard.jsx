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
        <div className="bg-surface-200/50 rounded-3xl shadow-[0_4px_20px_rgba(25,28,29,0.02)] hover:shadow-[0_20px_40px_rgba(25,28,29,0.08)] transition-all duration-700 overflow-hidden border-none flex flex-col h-full group">
            {/* Image Container */}
            <div className="relative overflow-hidden h-80">
                <img
                    src={image}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1500ms] ease-out will-change-transform"
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
            <div className="p-8 md:p-10 flex flex-col flex-grow">
                <div className="mb-6 flex-grow">
                    <div className="flex flex-col gap-4 mb-6">
                        <h3 className="text-2xl font-display font-semibold text-gray-900 leading-tight" title={title}>{title}</h3>
                        <span className="text-xl font-sans tracking-tight font-light text-wcp-grey-800">{price}</span>
                    </div>

                    <div className="flex items-center text-wcp-grey-600 text-sm mb-8 font-sans uppercase tracking-widest font-semibold flex-grow">
                        <Icon name="MapPin" size={16} className="mr-2 text-wcp-blue-600" />
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
                <div className="mt-8 pt-6 border-t border-gray-100/50 flex gap-4">
                    <button
                        onClick={() => navigateToRequestSubmission(navigate, id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-wcp-blue-600 text-white hover:bg-gradient-to-br hover:from-wcp-blue-600 hover:to-wcp-blue-500 rounded-lg hover:shadow-[0_10px_20px_rgba(34,69,97,0.2)] hover:scale-[1.02] transition-all duration-300 btn-base text-sm"
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
