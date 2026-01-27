import React, { useState } from 'react';
import { User, Bell, Lock, Mail, Phone } from 'lucide-react';
import WCPInput from '../atoms/WCPInput';
import FormButton from '../atoms/FormButton';
import { ownerProfile } from '../../api/ownerMockData';

const OwnerSettings = () => {
    const [formData, setFormData] = useState({
        name: ownerProfile.name,
        email: ownerProfile.email,
        phone: ownerProfile.phone,
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        leaseExpiry: true,
        paymentReminders: true,
        maintenanceAlerts: true,
    });

    const handleSaveProfile = (e) => {
        e.preventDefault();
        alert('Profil mis à jour avec succès !');
    };

    const handleSaveNotifications = (e) => {
        e.preventDefault();
        alert('Préférences de notifications mises à jour !');
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-[#111827] mb-2">
                    Paramètres
                </h2>
                <p className="text-gray-600">
                    Gérez vos informations personnelles et préférences
                </p>
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User size={20} className="text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827]">
                        Informations du Profil
                    </h3>
                </div>

                <form on Submit={handleSaveProfile} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nom complet
                        </label>
                        <WCPInput
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Votre nom"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <WCPInput
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="votre@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Téléphone
                            </label>
                            <WCPInput
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+225 XX XX XX XX XX"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <FormButton type="submit" variant="primary">
                            Enregistrer les modifications
                        </FormButton>
                    </div>
                </form>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bell size={20} className="text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827]">
                        Notifications
                    </h3>
                </div>

                <form onSubmit={handleSaveNotifications} className="space-y-4">
                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <span className="text-sm text-gray-700">Notifications par email</span>
                            <input
                                type="checkbox"
                                checked={notifications.emailNotifications}
                                onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                                className="w-5 h-5 text-[#1E3A8A] rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <span className="text-sm text-gray-700">Notifications par SMS</span>
                            <input
                                type="checkbox"
                                checked={notifications.smsNotifications}
                                onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                                className="w-5 h-5 text-[#1E3A8A] rounded focus:ring-2 focus:ring-blue-500"
                            />
                        </label>

                        <div className="border-t border-gray-200 pt-3 mt-3">
                            <p className="text-xs font-semibold text-gray-600 mb-2">ALERTES</p>

                            <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <span className="text-sm text-gray-700">Expiration des baux</span>
                                <input
                                    type="checkbox"
                                    checked={notifications.leaseExpiry}
                                    onChange={(e) => setNotifications({ ...notifications, leaseExpiry: e.target.checked })}
                                    className="w-5 h-5 text-[#1E3A8A] rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <span className="text-sm text-gray-700">Rappels de paiement</span>
                                <input
                                    type="checkbox"
                                    checked={notifications.paymentReminders}
                                    onChange={(e) => setNotifications({ ...notifications, paymentReminders: e.target.checked })}
                                    className="w-5 h-5 text-[#1E3A8A] rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <span className="text-sm text-gray-700">Alertes de maintenance</span>
                                <input
                                    type="checkbox"
                                    checked={notifications.maintenanceAlerts}
                                    onChange={(e) => setNotifications({ ...notifications, maintenanceAlerts: e.target.checked })}
                                    className="w-5 h-5 text-[#1E3A8A] rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <FormButton type="submit" variant="primary">
                            Enregistrer les préférences
                        </FormButton>
                    </div>
                </form>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Lock size={20} className="text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#111827]">
                        Sécurité
                    </h3>
                </div>

                <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <p className="font-semibold text-[#111827] mb-1">Changer le mot de passe</p>
                        <p className="text-sm text-gray-600">Dernière modification il y a 3 mois</p>
                    </button>

                    <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <p className="font-semibold text-[#111827] mb-1">Authentification à deux facteurs</p>
                        <p className="text-sm text-gray-600">Ajouter une couche de sécurité supplémentaire</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerSettings;
