import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/organisms/Navbar';
import Footer from '../../components/organisms/Footer';
import RentalPurchaseRequestForm from '../../components/organisms/RentalPurchaseRequestForm';
import PropertyApplicationForm from '../../components/organisms/PropertyApplicationForm';
import SubmissionSuccess from '../../components/organisms/SubmissionSuccess';
import { Search } from 'lucide-react';

const PropertyRequestPage = () => {
    const [searchParams] = useSearchParams();
    const propertyId = searchParams.get('propertyId');
    const [submitted, setSubmitted] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');

    const handleSubmit = (data, type) => {
        console.log(`Property ${type}:`, data);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        setTrackingNumber(`WCP-REQ-${new Date().getTime().toString().slice(-6)}-${random}`);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SubmissionSuccess
                        trackingNumber={trackingNumber}
                        submissionType={propertyId ? 'application' : 'request'}
                        onNewSubmission={() => setSubmitted(false)}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12 animate-in">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-green-100 rounded-2xl">
                            <Search size={32} className="text-green-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            {propertyId ? 'Postuler pour ce bien' : 'Rechercher un bien'}
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Trouvons ensemble le bien immobilier qui correspond à vos rêves et vos besoins.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-in slide-in-bottom">
                    {propertyId ? (
                        <PropertyApplicationForm
                            propertyId={propertyId}
                            onSubmit={(data) => handleSubmit(data, 'application')}
                        />
                    ) : (
                        <>
                            <div className="mb-10 p-6 bg-green-50 border border-green-100 rounded-xl">
                                <h3 className="font-bold text-green-900 mb-2">Espace Visiteurs</h3>
                                <p className="text-sm text-green-700 leading-relaxed">
                                    Décrivez-nous vos critères de recherche (zone, budget, type de bien). Notre équipe effectuera une recherche personnalisée parmi nos biens en catalogue et nos partenaires pour vous proposer une sélection sur-mesure.
                                </p>
                            </div>
                            <RentalPurchaseRequestForm onSubmit={(data) => handleSubmit(data, 'request')} />
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PropertyRequestPage;
