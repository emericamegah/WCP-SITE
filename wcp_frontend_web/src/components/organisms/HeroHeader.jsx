import React from 'react';
import SearchBar from '../molecules/SearchBar';
import Icon from '../atoms/Icon';

const HeroHeader = () => {
    return (
        <div className="relative bg-wcp-dark text-white min-h-screen flex flex-col justify-center mb-0 overflow-hidden pt-20">
            {/* Background Image Overlay with Parallax */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed transform scale-105"
                style={{ backgroundImage: "url('/hero-villa.png')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col justify-center h-full pb-32">
                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 text-white font-display drop-shadow-2xl font-semibold leading-tight text-left">
                        Votre vie de rêve <br className="hidden md:block" /> sur la Riviera.
                    </h1>
                    <p className="text-xl md:text-2xl mb-12 text-gray-200 font-light tracking-wide opacity-90 font-sans text-left max-w-2xl">
                        L'excellence immobilière à portée de main. Villas contemporaines, penthouses de luxe et domaines d'exception.
                    </p>
                </div>
            </div>

            {/* Floating Search Widget in lower third */}
            <div className="absolute bottom-12 left-0 w-full z-20 px-4 sm:px-6 lg:px-12">
                <div className="container mx-auto">
                    <div className="glass p-6 sm:p-8 rounded-2xl w-full max-w-5xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroHeader;
