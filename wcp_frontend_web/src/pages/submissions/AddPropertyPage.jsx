import React, { useState } from 'react';
import Navbar from '../../components/organisms/Navbar';
import Footer from '../../components/organisms/Footer';
import PropertySubmissionForm from '../../components/organisms/PropertySubmissionForm';
import SubmissionSuccess from '../../components/organisms/SubmissionSuccess';
import { Building2 } from 'lucide-react';

const AddPropertyPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');

    const handleSubmit = (data) => {
        console.log('Adding Property:', data);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        setTrackingNumber(`WCP-PROP-${new Date().getTime().toString().slice(-6)}-${random}`);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SubmissionSuccess
                        trackingNumber={trackingNumber}
                        submissionType="property"
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
                        <div className="p-3 bg-blue-100 rounded-2xl">
                            <Building2 size={32} className="text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">Ajouter un bien</h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Confiez-nous la gestion, la vente ou la location de votre bien immobilier.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-in slide-in-bottom">
                    <div className="mb-10 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                        <h3 className="font-bold text-blue-900 mb-2">Espace Propriétaires</h3>
                        <p className="text-sm text-blue-700 leading-relaxed">
                            Remplissez les détails de votre propriété ci-dessous. Notre équipe d'experts analysera votre soumission et vous contactera sous 24h pour finaliser l'estimation et la mise en ligne.
                        </p>
                    </div>
                    <PropertySubmissionForm onSubmit={handleSubmit} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AddPropertyPage;
