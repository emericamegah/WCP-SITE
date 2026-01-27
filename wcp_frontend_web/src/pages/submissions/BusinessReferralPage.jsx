import React, { useState } from 'react';
import Navbar from '../../components/organisms/Navbar';
import Footer from '../../components/organisms/Footer';
import BusinessReferralForm from '../../components/organisms/BusinessReferralForm';
import SubmissionSuccess from '../../components/organisms/SubmissionSuccess';
import { Users } from 'lucide-react';

const BusinessReferralPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');

    const handleSubmit = (data) => {
        console.log('Business Referral:', data);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        setTrackingNumber(`WCP-REF-${new Date().getTime().toString().slice(-6)}-${random}`);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SubmissionSuccess
                        trackingNumber={trackingNumber}
                        submissionType="referral"
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
                        <div className="p-3 bg-purple-100 rounded-2xl">
                            <Users size={32} className="text-purple-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">Apporter des affaires</h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Collaborez avec West Coast Property et bénéficiez de commissions sur vos recommandations.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-in slide-in-bottom">
                    <div className="mb-10 p-6 bg-purple-50 border border-purple-100 rounded-xl">
                        <h3 className="font-bold text-purple-900 mb-2">Espace Apporteurs d'Affaires</h3>
                        <p className="text-sm text-purple-700 leading-relaxed">
                            Vous connaissez une personne souhaitant vendre, louer ou acheter un bien ? Soumettez ses coordonnées (avec son accord) et recevez une commission attractive lors de la finalisation de la transaction.
                        </p>
                    </div>
                    <BusinessReferralForm onSubmit={handleSubmit} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BusinessReferralPage;
