import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentSummaryCard from '../components/payment/PaymentSummaryCard';
import PaymentMethodCard from '../components/payment/PaymentMethodCard';
import MobileMoneyForm from '../components/payment/MobileMoneyForm';
import CreditCardForm from '../components/payment/CreditCardForm';
import PaymentLoadingModal from '../components/payment/PaymentLoadingModal';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('mobile_money');
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock data for the checkout
    const paymentDetails = {
        title: "Loyer - Janvier 2026",
        amount: 150000,
        date: "05 Janvier 2026",
        propertyName: "Villa Moderna, Cocody Riviera"
    };

    const handlePaymentSubmit = (data) => {
        setIsProcessing(true);

        // Simulate API/Transaction delay
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/payment/success');
        }, 3500);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-500 hover:text-wcp-blue-600 transition-colors font-medium"
                    >
                        <ArrowLeft className="mr-2" size={20} />
                        Retour
                    </button>
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                        <ShieldCheck size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">Paiement Sécurisé SSL</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column - Payment Methods */}
                    <div className="lg:col-span-7 space-y-8">
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Paiement</h2>
                            <p className="text-gray-500">Choisissez votre mode de paiement préféré ci-dessous.</p>
                        </section>

                        <div className="space-y-4">
                            <PaymentMethodCard
                                id="mobile_money"
                                title="Mobile Money"
                                description="MTN Money, Moov Money"
                                icon="mobile"
                                isSelected={selectedMethod === 'mobile_money'}
                                onClick={setSelectedMethod}
                            />
                            <PaymentMethodCard
                                id="credit_card"
                                title="Carte Bancaire"
                                description="Visa, Mastercard, etc."
                                icon="card"
                                isSelected={selectedMethod === 'credit_card'}
                                onClick={setSelectedMethod}
                            />
                        </div>

                        {/* Dynamic Form Rendering */}
                        <div className="mt-12 p-8 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-100/50">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 border-l-4 border-wcp-blue-600 pl-4">
                                Informations de {selectedMethod === 'mobile_money' ? 'Mobile Money' : 'Carte'}
                            </h3>

                            {selectedMethod === 'mobile_money' ? (
                                <MobileMoneyForm onSubmit={handlePaymentSubmit} />
                            ) : (
                                <CreditCardForm onSubmit={handlePaymentSubmit} />
                            )}
                        </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-8">
                        <PaymentSummaryCard
                            title={paymentDetails.title}
                            amount={paymentDetails.amount}
                            date={paymentDetails.date}
                        />

                        <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                Détails du bien
                            </h4>
                            <p className="text-sm text-gray-500 mb-2">Bien concerné :</p>
                            <p className="font-semibold text-gray-800">{paymentDetails.propertyName}</p>
                        </div>

                        <div className="px-4">
                            <p className="text-[10px] text-gray-400 text-center leading-relaxed italic">
                                En procédant au paiement, vous acceptez nos <span className="underline cursor-pointer">Conditions Générales de Vente</span> et notre <span className="underline cursor-pointer">Politique de Confidentialité</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Simulation Modal */}
            <PaymentLoadingModal
                isOpen={isProcessing}
                message={selectedMethod === 'mobile_money'
                    ? "Veuillez valider la transaction sur votre smartphone..."
                    : "Vérification de vos informations bancaires..."}
            />
        </div>
    );
};

export default CheckoutPage;
