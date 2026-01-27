import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WCPBadge from '../atoms/WCPBadge';

const PhotoGallery = ({ images, status, price }) => {
    const [activeImage, setActiveImage] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-md group">
                <img
                    src={images[activeImage]}
                    alt="Vue principale"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    <WCPBadge variant={status === 'sale' ? 'primary' : 'exclusive'}>
                        {status === 'sale' ? 'À VENDRE' : 'À LOUER'}
                    </WCPBadge>
                    {status === 'exclusive' && <WCPBadge variant="exclusive">EXCLUSIVITÉ</WCPBadge>}
                </div>
                <div className="absolute bottom-4 right-4">
                    <WCPBadge variant="price" className="text-xl px-4 py-2">
                        {price}
                    </WCPBadge>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 md:gap-4">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer rounded-lg overflow-hidden h-20 md:h-28 border-2 transition-all duration-200 ${activeImage === index ? 'border-wcp-blue-600 ring-2 ring-wcp-blue-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                        onClick={() => setActiveImage(index)}
                    >
                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

PhotoGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string,
    price: PropTypes.string.isRequired,
};

export default PhotoGallery;
