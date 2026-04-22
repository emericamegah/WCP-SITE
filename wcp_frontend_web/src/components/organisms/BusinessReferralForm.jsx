import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Users, Building, User, AlertCircle } from 'lucide-react';
import FormSection from '../molecules/FormSection';
import FieldGroup from '../molecules/FieldGroup';
import FormLabel from '../atoms/FormLabel';
import FormSelect from '../atoms/FormSelect';
import WCPTextArea from '../atoms/WCPTextArea';
import FormButton from '../atoms/FormButton';
import FormError from '../atoms/FormError';

const REFERRAL_TYPES = [
    { value: 'client_renter', label: 'Nouveau client (locataire)' },
    { value: 'client_buyer', label: 'Nouveau client (acheteur)' },
    { value: 'property', label: 'Nouveau bien à gérer' },
];

const PROPERTY_TYPES = [
    { value: 'apartment', label: 'Appartement' },
    { value: 'villa', label: 'Villa' },
    { value: 'office', label: 'Bureau' },
    { value: 'land', label: 'Terrain' },
    { value: 'commercial', label: 'Commerce' },
];

const BusinessReferralForm = ({ onSubmit, onCancel }) => {
    const [referralType, setReferralType] = useState('');

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'onBlur',
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const selectedReferralType = watch('referralType', referralType);

    const onFormSubmit = handleSubmit((data) => {
        onSubmit(data);
    });

    const isClientReferral = selectedReferralType === 'client_renter' || selectedReferralType === 'client_buyer';
    const isPropertyReferral = selectedReferralType === 'property';

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={onFormSubmit} className="space-y-6">
                {/* Referral Type Selection */}
                <FormSection
                    title="Type d'Apport"
                    description="Que souhaitez-vous nous apporter ?"
                    icon={Building}
                >
                    <div>
                        <FormLabel htmlFor="referralType" required>Type d'apport</FormLabel>
                        <FormSelect
                            id="referralType"
                            options={REFERRAL_TYPES}
                            placeholder="Sélectionnez le type d'apport"
                            error={!!errors.referralType}
                            {...register('referralType', {
                                required: "Le type d'apport est requis",
                                onChange: (e) => setReferralType(e.target.value)
                            })}
                        />
                        <FormError message={errors.referralType?.message} />
                    </div>

                    {/* Info Alert */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-900">
                            <p className="font-semibold mb-1">Information importante</p>
                            <p className="text-blue-700">
                                Votre apport sera soumis à la validation d'un chargé d'affaires.
                                Vous serez contacté dans les 48h pour confirmer la collaboration et discuter de la commission.
                            </p>
                        </div>
                    </div>
                </FormSection>

                {/* Client Referral Fields */}
                {isClientReferral && (
                    <FormSection
                        title="Informations du Prospect Client"
                        description="Détails du client que vous nous apportez"
                        icon={Users}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FieldGroup
                                label="Prénom du prospect"
                                name="prospectFirstName"
                                required
                                placeholder="Prénom"
                                register={register}
                                error={errors.prospectFirstName}
                            />
                            <FieldGroup
                                label="Nom du prospect"
                                name="prospectLastName"
                                required
                                placeholder="Nom"
                                register={register}
                                error={errors.prospectLastName}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FieldGroup
                                label="Email du prospect"
                                name="prospectEmail"
                                type="email"
                                placeholder="email@exemple.com"
                                register={register}
                                error={errors.prospectEmail}
                            />
                            <FieldGroup
                                label="Téléphone du prospect"
                                name="prospectPhone"
                                type="tel"
                                required
                                placeholder="+225 XX XX XX XX XX"
                                register={register}
                                error={errors.prospectPhone}
                            />
                        </div>

                        <FieldGroup
                            label="Budget estimé (FCFA)"
                            name="prospectBudget"
                            type="number"
                            placeholder="Ex: 50000000"
                            register={register}
                            error={errors.prospectBudget}
                        />

                        <div>
                            <FormLabel htmlFor="clientNeeds" required>Besoins du client</FormLabel>
                            <WCPTextArea
                                id="clientNeeds"
                                placeholder="Décrivez les besoins, préférences et contraintes du client..."
                                rows={4}
                                {...register('clientNeeds', {
                                    required: isClientReferral ? 'Les besoins du client sont requis' : false
                                })}
                            />
                            <FormError message={errors.clientNeeds?.message} />
                        </div>
                    </FormSection>
                )}

                {/* Property Referral Fields */}
                {isPropertyReferral && (
                    <FormSection
                        title="Informations du Bien"
                        description="Détails du bien que vous nous apportez"
                        icon={Building}
                    >
                        <div>
                            <FormLabel htmlFor="propertyType" required>Type de bien</FormLabel>
                            <FormSelect
                                id="propertyType"
                                options={PROPERTY_TYPES}
                                placeholder="Sélectionnez le type"
                                error={!!errors.propertyType}
                                {...register('propertyType', {
                                    required: isPropertyReferral ? 'Le type de bien est requis' : false
                                })}
                            />
                            <FormError message={errors.propertyType?.message} />
                        </div>

                        <FieldGroup
                            label="Localisation du bien"
                            name="propertyLocation"
                            required
                            placeholder="Ex: Cocody, Riviera Golf"
                            register={register}
                            error={errors.propertyLocation}
                        />

                        <FieldGroup
                            label="Prix estimé (FCFA)"
                            name="propertyPrice"
                            type="number"
                            placeholder="Ex: 50000000"
                            register={register}
                            error={errors.propertyPrice}
                        />

                        <FieldGroup
                            label="Contact du propriétaire"
                            name="ownerContact"
                            required
                            placeholder="Nom et téléphone du propriétaire"
                            register={register}
                            error={errors.ownerContact}
                        />

                        <div>
                            <FormLabel htmlFor="propertyDescription" required>Description sommaire</FormLabel>
                            <WCPTextArea
                                id="propertyDescription"
                                placeholder="Décrivez le bien, ses caractéristiques principales..."
                                rows={4}
                                {...register('propertyDescription', {
                                    required: isPropertyReferral ? 'La description du bien est requise' : false
                                })}
                            />
                            <FormError message={errors.propertyDescription?.message} />
                        </div>
                    </FormSection>
                )}

                {/* Referrer Information */}
                {selectedReferralType && (
                    <FormSection
                        title="Vos Informations (Apporteur)"
                        description="Pour que nous puissions vous contacter"
                        icon={User}
                    >
                        <FieldGroup
                            label="Nom complet"
                            name="referrerName"
                            required
                            placeholder="Votre nom complet"
                            register={register}
                            error={errors.referrerName}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FieldGroup
                                label="Email"
                                name="referrerEmail"
                                type="email"
                                required
                                placeholder="votre@email.com"
                                register={register}
                                error={errors.referrerEmail}
                            />
                            <FieldGroup
                                label="Téléphone"
                                name="referrerPhone"
                                type="tel"
                                required
                                placeholder="+225 XX XX XX XX XX"
                                register={register}
                                error={errors.referrerPhone}
                            />
                        </div>

                        <div>
                            <FormLabel htmlFor="additionalInfo">Commentaires additionnels</FormLabel>
                            <WCPTextArea
                                id="additionalInfo"
                                placeholder="Informations complémentaires, contexte de l'apport..."
                                rows={3}
                                {...register('additionalInfo')}
                            />
                        </div>
                    </FormSection>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4 pt-4">
                    {onCancel && (
                        <FormButton
                            variant="ghost"
                            onClick={onCancel}
                        >
                            Annuler
                        </FormButton>
                    )}
                    <FormButton
                        type="submit"
                        variant="primary"
                        fullWidth={!onCancel}
                        disabled={!selectedReferralType}
                    >
                        Soumettre l'apport
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

BusinessReferralForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default BusinessReferralForm;
