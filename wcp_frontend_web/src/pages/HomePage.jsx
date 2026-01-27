import { useState, useEffect } from 'react';
import client from '../api/client';
import Navigation from '../components/organisms/Navbar';
import HeroHeader from '../components/organisms/HeroHeader';
import ServicesSection from '../components/organisms/ServicesSection';
import FeaturedSection from '../components/organisms/FeaturedSection';
import Footer from '../components/organisms/Footer';

const HomePage = () => {
    const [properties, setProperties] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propsRes, servicesRes] = await Promise.all([
                    client.get('/properties'),
                    client.get('/services')
                ]);
                // Take first 3 for featured section
                setProperties(propsRes.data.slice(0, 3));
                setServices(servicesRes.data);
            } catch (error) {
                console.error("Failed to fetch homepage data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wcp-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <Navigation />
            <HeroHeader />
            <ServicesSection services={services} />
            <FeaturedSection properties={properties} />
            <Footer />
        </>
    );
};

export default HomePage;
