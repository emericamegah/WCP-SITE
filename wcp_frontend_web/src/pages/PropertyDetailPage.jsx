import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import PhotoGallery from '../components/molecules/PhotoGallery';
import InfoSummary from '../components/molecules/InfoSummary';
import PDFDownloader from '../components/molecules/PDFDownloader';
import PropertyDescription from '../components/organisms/PropertyDescription';
import BookingWidget from '../components/organisms/BookingWidget';
import LocationMap from '../components/organisms/LocationMap';
import RelatedProperties from '../components/organisms/RelatedProperties';
import Breadcrumb from '../components/molecules/Breadcrumb';

import client from '../api/client';

const PropertyDetailPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedProps, setRelatedProps] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Property Detail
                const propRes = await client.get(`/properties/${id}`);
                setProperty(propRes.data);

                // Fetch Related (Simulated by fetching specific IDs or category)
                // For now, let's just fetch all and take 3 random ones excluding current
                const allPropsRes = await client.get('/properties');
                const filtered = allPropsRes.data
                    .filter(p => p.id !== parseInt(id))
                    .slice(0, 3);
                setRelatedProps(filtered);
            } catch (err) {
                console.error("Failed to fetch property", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (loading) return <div className="flex h-screen items-center justify-center">Chargement...</div>;
    if (error || !property) return <div className="flex h-screen items-center justify-center">Propriété non trouvée</div>;

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={[
                        { label: 'Biens', link: '/biens' },
                        { label: property.title }
                    ]} />
                </div>

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-wcp-dark mb-2 leading-tight">
                                {property.title}
                            </h1>
                            <p className="text-lg text-gray-500 flex items-center gap-2">
                                {property.address}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mb-12">
                    <PhotoGallery
                        images={property.images}
                        status={property.status}
                        price={property.price}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
                    {/* Main Content (Left) */}
                    <div className="w-full lg:w-2/3">
                        <InfoSummary features={property.features} />

                        <div className="space-y-8">
                            <PropertyDescription
                                description={property.description}
                                amenities={property.amenities}
                            />

                            <LocationMap address={property.address} />

                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <PDFDownloader onDownload={() => alert('Téléchargement du PDF...')} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Model (Right) - Sticky for Desktop, Bottom for Mobile */}
                    <div className="w-full lg:w-1/3 order-first lg:order-last">
                        <BookingWidget />
                    </div>
                </div>

                {/* Related Properties */}
                <div className="mt-16">
                    <RelatedProperties properties={relatedProps} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PropertyDetailPage;
