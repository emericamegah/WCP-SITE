import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import SearchBar from '../molecules/SearchBar';
import Icon from '../atoms/Icon';
import { navigateToPropertySubmission, navigateToRequestSubmission } from '../../utils/submissionNavigator';

const HeroHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-wcp-dark text-white py-20 lg:py-32 mb-12">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://placehold.co/1920x600?text=West+Coast+Property')" }}
            ></div>
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                    Trouvez votre propriété idéale <br className="hidden md:block" /> sur la West Coast
                </h1>
                <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto font-light">
                    Expertise immobilière premium. Achat, vente, location et gestion.
                </p>

                <div className="mt-8">
                    <SearchBar />
                </div>

                {/* CTAs */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigateToRequestSubmission(navigate)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                        <Icon name="Search" size={24} />
                        <span>Faire une demande de recherche</span>
                    </button>

                    <button
                        onClick={() => navigateToPropertySubmission(navigate)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
                    >
                        <Building2 size={24} />
                        <span>Estimer mon bien gratuitement</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroHeader;
