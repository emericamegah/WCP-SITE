import React, { useEffect } from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import ContactHero from '../components/organisms/ContactHero';
import DynamicRequestForm from '../components/organisms/DynamicRequestForm';
import OfficeLocationMap from '../components/organisms/OfficeLocationMap';
import ContactInfoCard from '../components/molecules/ContactInfoCard';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Navbar />
            <ContactHero />

            <main className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-20 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Info & Map (4 cols) */}
                    <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
                        <div className="space-y-4">
                            <ContactInfoCard
                                icon="Phone"
                                title="Téléphone"
                                content="+33 5 59 00 00 00"
                                link="tel:+33559000000"
                            />
                            <ContactInfoCard
                                icon="Mail"
                                title="Email"
                                content="contact@westcoastproperty.fr"
                                link="mailto:contact@westcoastproperty.fr"
                            />
                            <ContactInfoCard
                                icon="MapPin"
                                title="Agence"
                                content="15 Avenue de l'Océan, 64200 Biarritz"
                                link="https://maps.google.com"
                            />
                        </div>

                        <OfficeLocationMap />
                    </div>

                    {/* Right Column: Form (8 cols) */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <DynamicRequestForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
