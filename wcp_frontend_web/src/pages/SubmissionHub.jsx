import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building2, Search, Users, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import PropertySubmissionForm from '../components/organisms/PropertySubmissionForm';
import RentalPurchaseRequestForm from '../components/organisms/RentalPurchaseRequestForm';
import BusinessReferralForm from '../components/organisms/BusinessReferralForm';
import SubmissionSuccess from '../components/organisms/SubmissionSuccess';

import PropertyApplicationForm from '../components/organisms/PropertyApplicationForm';

const SubmissionHub = () => {
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') || 'property';
    const propertyId = searchParams.get('propertyId');

    const [submitted, setSubmitted] = useState(false);
    const [submissionData, setSubmissionData] = useState(null);
    const [activeTab, setActiveTab] = useState(initialTab);

    // Update active tab when URL parameter changes
    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && ['property', 'request', 'referral'].includes(tabParam)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    // Force tab to 'request' if propertyId is provided to ensure user sees the right flow
    useEffect(() => {
        if (propertyId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveTab('request');
        }
    }, [propertyId]);

    // Generate tracking number: WCP-YYYYMMDD-XXXX
    const generateTrackingNumber = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `WCP-${year}${month}${day}-${random}`;
    };

    const handleSubmit = (data, type) => {
        // Mock API call - replace with actual API endpoint later
        console.log('Submitting data:', { type, data });

        // Simulate API response
        const trackingNumber = generateTrackingNumber();

        setSubmissionData({
            trackingNumber,
            type,
            data,
        });
        setSubmitted(true);

        // In real implementation, you would make an API call like:
        // await api.post('/api/submissions', { type, data });
    };

    const handleNewSubmission = () => {
        setSubmitted(false);
        setSubmissionData(null);
    };

    if (submitted && submissionData) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SubmissionSuccess
                        trackingNumber={submissionData.trackingNumber}
                        submissionType={submissionData.type}
                        onNewSubmission={handleNewSubmission}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Send size={40} className="text-blue-600" />
                        <h1 className="text-4xl font-bold text-gray-900">
                            Soumettez votre demande
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Que vous soyez propriétaire, visiteur ou apporteur d'affaires,
                        nous sommes là pour vous accompagner dans votre projet immobilier.
                    </p>
                </div>

                {/* Tabs Container */}
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 mb-8 bg-gray-100 p-2 rounded-lg">
                            <TabsTrigger
                                value="property"
                                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                            >
                                <Building2 size={20} />
                                <span className="font-semibold">Ajouter un bien</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="request"
                                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                            >
                                <Search size={20} />
                                <span className="font-semibold">Rechercher un bien</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="referral"
                                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                            >
                                <Users size={20} />
                                <span className="font-semibold">Apporter des affaires</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="property" className="mt-0">
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    Pour les propriétaires
                                </h3>
                                <p className="text-sm text-blue-700">
                                    Vous souhaitez vendre ou louer votre bien ? Remplissez ce formulaire
                                    et notre équipe vous contactera pour une estimation gratuite et une mise en ligne optimisée.
                                </p>
                            </div>
                            <PropertySubmissionForm
                                onSubmit={(data) => handleSubmit(data, 'property')}
                            />
                        </TabsContent>

                        <TabsContent value="request" className="mt-0">
                            {propertyId ? (
                                <>
                                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h3 className="font-semibold text-blue-900 mb-2">
                                            Postuler pour ce bien précis
                                        </h3>
                                        <p className="text-sm text-blue-700">
                                            Vous avez trouvé le bien qui vous correspond. Complétez ce formulaire pour
                                            envoyer votre dossier et planifier une visite.
                                        </p>
                                    </div>
                                    <PropertyApplicationForm
                                        propertyId={propertyId}
                                        onSubmit={(data) => handleSubmit(data, 'application')}
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <h3 className="font-semibold text-green-900 mb-2">
                                            Recherche générale (Visiteurs)
                                        </h3>
                                        <p className="text-sm text-green-700">
                                            Vous cherchez un bien à louer ou à acheter ? Décrivez-nous vos critères
                                            et nous vous proposerons une sélection personnalisée de biens disponibles.
                                        </p>
                                    </div>
                                    <RentalPurchaseRequestForm
                                        onSubmit={(data) => handleSubmit(data, 'request')}
                                    />
                                </>
                            )}
                        </TabsContent>

                        <TabsContent value="referral" className="mt-0">
                            <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                <h3 className="font-semibold text-purple-900 mb-2">
                                    Pour les apporteurs d'affaires
                                </h3>
                                <p className="text-sm text-purple-700">
                                    Vous connaissez quelqu'un qui cherche un bien ou qui souhaite en vendre/louer un ?
                                    Apportez-nous le contact et bénéficiez d'une commission sur la transaction.
                                </p>
                            </div>
                            <BusinessReferralForm
                                onSubmit={(data) => handleSubmit(data, 'referral')}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
                        <h3 className="font-semibold text-gray-900 mb-3">
                            Besoin d'aide ?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Notre équipe est disponible pour répondre à toutes vos questions
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                            <a href="tel:+225XXXXXXXXX" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                                📞 +225 XX XX XX XX XX
                            </a>
                            <span className="hidden sm:inline text-gray-400">•</span>
                            <a href="mailto:contact@westcoastproperty.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                                ✉️ contact@westcoastproperty.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionHub;
