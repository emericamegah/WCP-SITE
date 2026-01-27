import React, { useState, useEffect } from 'react';
import client from '../api/client';
import Navbar from '../components/organisms/Navbar';
import ServiceHero from '../components/organisms/ServiceHero';
import CoreServicesGrid from '../components/organisms/CoreServicesGrid';
import PartnerSection from '../components/organisms/PartnerSection';
import GlobalCTA from '../components/organisms/GlobalCTA';
import Footer from '../components/organisms/Footer';

const ServicesPage = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        client.get('/services')
            .then(res => setServices(res.data))
            .catch(err => console.error("Failed to fetch services", err));
    }, []);

    return (
        <>
            <Navbar />
            <main className="bg-gray-50 min-h-screen">
                <ServiceHero />
                <CoreServicesGrid services={services} />
                <PartnerSection />
                <GlobalCTA />
            </main>
            <Footer />
        </>
    );
};

export default ServicesPage;
