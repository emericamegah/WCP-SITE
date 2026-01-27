import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { User, Calendar, MessageSquare, Info, ShieldCheck } from 'lucide-react';
import FormSection from '../molecules/FormSection';
import FieldGroup from '../molecules/FieldGroup';
import FormLabel from '../atoms/FormLabel';
import FormSelect from '../atoms/FormSelect';
import WCPTextArea from '../atoms/WCPTextArea';
import FormButton from '../atoms/FormButton';
import FormError from '../atoms/FormError';
import AppointmentPicker from '../forms/AppointmentPicker';
import client from '../../api/client';

const CIVILITY_OPTIONS = [
    { value: 'mr', label: 'M.' },
    { value: 'mrs', label: 'Mme' },
    { value: 'other', label: 'Autre' },
];

/**
 * PropertyApplicationForm
 * Specialized form for applying to a specific property.
 */
const PropertyApplicationForm = ({ propertyId, onSubmit, onCancel }) => {
    const [property, setProperty] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    useEffect(() => {
        if (propertyId) {
            setLoading(true);
            client.get(`/properties/${propertyId}`)
                .then(res => {
                    setProperty(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch property context", err);
                    setLoading(false);
                });
        }
    }, [propertyId]);

    const onFormSubmit = handleSubmit((data) => {
        const finalData = {
            ...data,
            propertyId,
            appointment: selectedAppointment,
        };
        onSubmit(finalData);
    });

    if (loading) return <div className="text-center p-12">Chargement du contexte immobilier...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in">
            {/* Property Context Header */}
            {property && (
                <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
                    <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border-2 border-slate-700">
                        <img
                            src={property.images?.[0]?.url || 'https://via.placeholder.com/150'}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                            Candidature pour ce bien
                        </span>
                        <h2 className="text-2xl font-bold">{property.title}</h2>
                        <p className="text-slate-400 text-sm mt-1">{property.address}</p>
                        <p className="text-primary font-bold mt-2">{property.price?.toLocaleString()} FCFA / mois</p>
                    </div>
                </div>
            )}

            <form onSubmit={onFormSubmit} className="space-y-6">
                {/* Section 1: Personal Info */}
                <FormSection
                    title="Vos Informations Personnelles"
                    description="Remplissez vos coordonnées pour être recontacté."
                    icon={User}
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <FormLabel htmlFor="civility" required>Civilité</FormLabel>
                            <FormSelect
                                id="civility"
                                options={CIVILITY_OPTIONS}
                                placeholder="Civilité"
                                error={!!errors.civility}
                                {...register('civility', { required: 'Requis' })}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <FieldGroup
                                label="Nom Complet"
                                name="fullName"
                                required
                                placeholder="ex: Jean Dupont"
                                register={register}
                                error={errors.fullName}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FieldGroup
                            label="Email"
                            name="email"
                            type="email"
                            required
                            placeholder="jean.dupont@email.com"
                            register={register}
                            error={errors.email}
                        />
                        <FieldGroup
                            label="Téléphone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+225 XX XX XX XX"
                            register={register}
                            error={errors.phone}
                        />
                    </div>
                </FormSection>

                {/* Section 2: Preferences & Motivation */}
                <FormSection
                    title="Préférences & Motivations"
                    description="Dites-nous pourquoi ce bien vous intéresse."
                    icon={MessageSquare}
                >
                    <div>
                        <FormLabel htmlFor="motivation" required>Pourquoi ce bien ?</FormLabel>
                        <WCPTextArea
                            id="motivation"
                            placeholder="Emplacement, caractéristiques, budget... Dites-en nous plus."
                            rows={3}
                            error={!!errors.motivation}
                            {...register('motivation', { required: 'Veuillez préciser votre intérêt' })}
                        />
                        <FormError message={errors.motivation?.message} />
                    </div>

                    <div className="mt-4">
                        <FormLabel htmlFor="preferences">Préférences spécifiques</FormLabel>
                        <WCPTextArea
                            id="preferences"
                            placeholder="Parking, étage, orientation, besoins particuliers..."
                            rows={2}
                            {...register('preferences')}
                        />
                    </div>
                </FormSection>

                {/* Section 3: Appointment Picker */}
                <FormSection
                    title="Planifier une Visite"
                    description="Sélectionnez un créneau pour visiter le bien."
                    icon={Calendar}
                >
                    <AppointmentPicker onSelect={setSelectedAppointment} />
                    {!selectedAppointment && (
                        <div className="mt-3 flex items-center gap-2 text-warning text-xs bg-warning/5 p-3 rounded-lg border border-warning/20">
                            <Info size={14} />
                            <span>Veuillez sélectionner une date et une heure pour soumettre votre candidature.</span>
                        </div>
                    )}
                </FormSection>

                {/* Form Footer */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 text-slate-500 text-xs text-center md:text-left">
                        <ShieldCheck size={16} className="text-green-500" />
                        <p>Vos données sont traitées en toute confidentialité conformément à notre politique de protection des données.</p>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        {onCancel && (
                            <FormButton variant="ghost" onClick={onCancel} className="flex-1 md:flex-none">
                                Annuler
                            </FormButton>
                        )}
                        <FormButton
                            type="submit"
                            variant="primary"
                            className="flex-1 md:px-12"
                            disabled={!selectedAppointment}
                        >
                            Postuler maintenant
                        </FormButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

PropertyApplicationForm.propTypes = {
    propertyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default PropertyApplicationForm;
