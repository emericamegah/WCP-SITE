import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../molecules/PropertyCard';
import Pagination from '../atoms/Pagination';
import InteractiveMap from './InteractiveMap';
import Icon from '../atoms/Icon';

const SplitViewContainer = ({ properties }) => {
    const [activeView, setActiveView] = useState('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredProperty, setHoveredProperty] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex-grow flex overflow-hidden relative">

                <div className={`w-full lg:w-[60%] h-full overflow-y-auto px-4 py-6 ${activeView === 'map' ? 'hidden lg:block' : 'block'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">{properties.length} Biens trouvés</h2>
                        <div className="hidden lg:block text-sm text-gray-500">Tri par: Pertinence</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                        {properties.map(prop => (
                            <div
                                key={prop.id}
                                onMouseEnter={() => setHoveredProperty(prop.id)}
                                onMouseLeave={() => setHoveredProperty(null)}
                                className="cursor-pointer"
                                onClick={() => navigate(`/biens/${prop.id}`)}
                            >
                                <PropertyCard
                                    image={prop.image}
                                    title={prop.title}
                                    price={prop.price}
                                    location={prop.location}
                                    status={prop.status}
                                    bedrooms={prop.bedrooms}
                                    area={prop.area}
                                    onDownload={(e) => { e.stopPropagation(); console.log('Download PDF', prop.id); }}
                                />
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={3}
                        onPageChange={setCurrentPage}
                    />
                </div>

                {/* Right: Map View */}
                <div className={`w-full lg:w-[40%] h-full relative ${activeView === 'list' ? 'hidden lg:block' : 'block'}`}>
                    <InteractiveMap properties={properties} activePropertyId={hoveredProperty} />
                </div>

                {/* Mobile View Toggle */}
                <div className="lg:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                    <button
                        onClick={() => setActiveView(activeView === 'list' ? 'map' : 'list')}
                        className="flex items-center gap-2 bg-wcp-dark text-white px-6 py-3 rounded-full shadow-xl font-bold hover:bg-black transition-colors"
                    >
                        {activeView === 'list' ? (
                            <>
                                <Icon name="Map" size={18} /> Voir Carte
                            </>
                        ) : (
                            <>
                                <Icon name="List" size={18} /> Voir Liste
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SplitViewContainer;
