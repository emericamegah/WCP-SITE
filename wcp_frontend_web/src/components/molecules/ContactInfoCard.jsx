import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const ContactInfoCard = ({ icon, title, content, link }) => {
    const CardContent = () => (
        <div className="flex items-start p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 p-3 bg-wcp-blue-50 text-wcp-blue-600 rounded-lg">
                <Icon name={icon} size={24} />
            </div>
            <div className="ml-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h4>
                <p className="mt-1 text-gray-600 break-words">{content}</p>
            </div>
        </div>
    );

    if (link) {
        return (
            <a href={link} className="block group">
                <CardContent />
            </a>
        );
    }

    return <CardContent />;
};

ContactInfoCard.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
};

export default ContactInfoCard;
