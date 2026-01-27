import React from 'react';
import PropTypes from 'prop-types';
import { User, Phone, Mail, Calendar, MessageCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const TenantCard = ({ tenant, propertyAddress, onContact, className = '' }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className={twMerge(
            "bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm",
            className
        )}>
            <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 text-[#1E3A8A] rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#111827] text-lg mb-1">
                        {tenant.name}
                    </h3>
                    {propertyAddress && (
                        <p className="text-sm text-gray-600 line-clamp-1">
                            {propertyAddress}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-3 mb-4">
                {/* Phone */}
                <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">{tenant.phone}</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700 truncate">{tenant.email}</span>
                </div>

                {/* Lease period */}
                <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700">
                        Bail: {formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}
                    </span>
                </div>

                {/* Payment status */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Paiement</span>
                    <span className={twMerge(
                        "text-sm font-semibold px-2 py-1 rounded-full",
                        tenant.paymentStatus === 'À jour'
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    )}>
                        {tenant.paymentStatus}
                    </span>
                </div>
            </div>

            {onContact && (
                <button
                    onClick={onContact}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                    <MessageCircle size={18} />
                    Contacter le locataire
                </button>
            )}
        </div>
    );
};

TenantCard.propTypes = {
    tenant: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        leaseStart: PropTypes.string.isRequired,
        leaseEnd: PropTypes.string.isRequired,
        paymentStatus: PropTypes.string.isRequired,
    }).isRequired,
    propertyAddress: PropTypes.string,
    onContact: PropTypes.func,
    className: PropTypes.string,
};

export default TenantCard;
