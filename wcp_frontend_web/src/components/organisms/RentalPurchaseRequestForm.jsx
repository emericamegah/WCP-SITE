import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { User, Search, MapPin, MessageSquare } from 'lucide-react';
import FormSection from '../molecules/FormSection';
import FieldGroup from '../molecules/FieldGroup';
import FormLabel from '../atoms/FormLabel';
import FormSelect from '../atoms/FormSelect';
import WCPTextArea from '../atoms/WCPTextArea';
import CheckboxGroup from '../molecules/CheckboxGroup';
import FormButton from '../atoms/FormButton';
import FormError from '../atoms/FormError';

const CIVILITY_OPTIONS = [
    { value: 'mr', label: 'M.' },
    { value: 'mrs', label: 'Mme' },
    { value: 'other', label: 'Autre' },
];

const SEARCH_TYPES = [
    { value: 'rent', label: 'Location' },
    { value: 'purchase', label: 'Achat' },
];

const PROPERTY_TYPES = [
    { value: 'apartment', label: 'Appartement' },
    { value: 'villa', label: 'Villa' },
    { value: 'office', label: 'Bureau' },
    { value: 'land', label: 'Terrain' },
    { value: 'commercial', label: 'Commerce' },
];

const URGENCY_LEVELS = [
    { value: 'immediate', label: 'Immédiate (< 1 mois)' },
    { value: 'short', label: 'Court terme (1-3 mois)' },
    { value: 'long', label: 'Long terme (> 3 mois)' },
    { value: 'info', label: 'Juste une demande d\'information' },
];

const AMENITIES = [
    { value: 'pool', label: 'Piscine' },
    { value: 'parking', label: 'Parking' },
    { value: 'security', label: 'Gardiennage' },
    { value: 'ac', label: 'Climatisation' },
    { value: 'garden', label: 'Jardin' },
    { value: 'terrace', label: 'Terrasse' },
    { value: 'cellar', label: 'Cave' },
    { value: 'elevator', label: 'Ascenseur' },
];

const RentalPurchaseRequestForm = ({ onSubmit, onCancel }) => {
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onFormSubmit = handleSubmit((data) => {
        const finalData = {
            ...data,
            propertyTypes: selectedPropertyTypes,
            amenities: selectedAmenities,
        };
        onSubmit(finalData);
    });

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={onFormSubmit} className="space-y-6">
                {/* Personal Information */}
                <FormSection
                    title="Vos Informations"
                    description="Pour que nous puissions vous recontacter"
                    icon={User}
                >
                    <div>
                        <FormLabel htmlFor="civility" required>Civilité</FormLabel>
                        <FormSelect
                            id="civility"
                            options={CIVILITY_OPTIONS}
                            placeholder="Sélectionnez"
                            error={!!errors.civility}
                            {...register('civility', { required: 'La civilité est requise' })}
                        />
                        <FormError message={errors.civility?.message} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Prénom"
                            name="firstName"
                            required
                            placeholder="Votre prénom"
                            register={register}
                            error={errors.firstName}
                        />
                        <FieldGroup
                            label="Nom"
                            name="lastName"
                            required
                            placeholder="Votre nom"
                            register={register}
                            error={errors.lastName}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Email"
                            name="email"
                            type="email"
                            required
                            placeholder="exemple@email.com"
                            register={register}
                            error={errors.email}
                        />
                        <FieldGroup
                            label="Téléphone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+225 XX XX XX XX XX"
                            register={register}
                            error={errors.phone}
                        />
                    </div>
                </FormSection>

                {/* Search Criteria */}
                <FormSection
                    title="Votre Recherche"
                    description="Décrivez le bien que vous recherchez"
                    icon={Search}
                >
                    <div>
                        <FormLabel htmlFor="searchType" required>Type de recherche</FormLabel>
                        <FormSelect
                            id="searchType"
                            options={SEARCH_TYPES}
                            placeholder="Location ou Achat"
                            error={!!errors.searchType}
                            {...register('searchType', { required: 'Le type de recherche est requis' })}
                        />
                        <FormError message={errors.searchType?.message} />
                    </div>

                    <CheckboxGroup
                        label="Type(s) de bien recherché(s)"
                        options={PROPERTY_TYPES}
                        selectedValues={selectedPropertyTypes}
                        onChange={setSelectedPropertyTypes}
                        columns={3}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Budget minimum (FCFA)"
                            name="minBudget"
                            type="number"
                            placeholder="Ex: 10000000"
                            register={register}
                            error={errors.minBudget}
                        />
                        <FieldGroup
                            label="Budget maximum (FCFA)"
                            name="maxBudget"
                            type="number"
                            required
                            placeholder="Ex: 50000000"
                            register={register}
                            error={errors.maxBudget}
                        />
                    </div>
                </FormSection>

                {/* Location Preferences */}
                <FormSection
                    title="Localisation & Préférences"
                    description="Où souhaitez-vous trouver votre bien ?"
                    icon={MapPin}
                >
                    <FieldGroup
                        label="Zone(s) géographique(s)"
                        name="location"
                        required
                        placeholder="Ex: Cocody, Plateau, Marcory"
                        register={register}
                        error={errors.location}
                        tooltip="Séparez par des virgules si plusieurs zones"
                    />

                    <FieldGroup
                        label="Nombre de pièces minimum"
                        name="minRooms"
                        type="number"
                        placeholder="Ex: 3"
                        register={register}
                        error={errors.minRooms}
                    />

                    <CheckboxGroup
                        label="Caractéristiques souhaitées"
                        options={AMENITIES}
                        selectedValues={selectedAmenities}
                        onChange={setSelectedAmenities}
                        columns={3}
                    />
                </FormSection>

                {/* Additional Information */}
                <FormSection
                    title="Informations Complémentaires"
                    icon={MessageSquare}
                >
                    <div>
                        <FormLabel htmlFor="urgency" required>Urgence de la recherche</FormLabel>
                        <FormSelect
                            id="urgency"
                            options={URGENCY_LEVELS}
                            placeholder="Sélectionnez"
                            error={!!errors.urgency}
                            {...register('urgency', { required: "Le niveau d'urgence est requis" })}
                        />
                        <FormError message={errors.urgency?.message} />
                    </div>

                    <div>
                        <FormLabel htmlFor="comments">Commentaires et précisions</FormLabel>
                        <WCPTextArea
                            id="comments"
                            placeholder="Décrivez vos besoins spécifiques, vos contraintes, vos préférences..."
                            rows={4}
                            {...register('comments')}
                        />
                    </div>
                </FormSection>

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
                    >
                        Envoyer ma demande
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

RentalPurchaseRequestForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default RentalPurchaseRequestForm;
