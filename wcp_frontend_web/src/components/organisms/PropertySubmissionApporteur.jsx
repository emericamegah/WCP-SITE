import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Home, MapPin, DollarSign, Upload } from 'lucide-react';
import FormSection from '../molecules/FormSection';
import FieldGroup from '../molecules/FieldGroup';
import FormLabel from '../atoms/FormLabel';
import FormSelect from '../atoms/FormSelect';
import WCPTextArea from '../atoms/WCPTextArea';
import FormButton from '../atoms/FormButton';
import FormError from '../atoms/FormError';
import FileUpload from '../atoms/FileUpload';

const PROPERTY_TYPES = [
    { value: 'apartment', label: 'Appartement' },
    { value: 'villa', label: 'Villa' },
    { value: 'office', label: 'Bureau' },
    { value: 'land', label: 'Terrain' },
    { value: 'commercial', label: 'Commerce' },
];

const PropertySubmissionApporteur = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photos, setPhotos] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        const formData = { ...data, photos };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Property submission:', formData);
        alert('✅ Bien immobilier soumis avec succès ! Validation en cours.');
        navigate('/apporteur');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Apporter un Bien Immobilier</h1>
                <p className="text-slate-600 mt-2">Proposez un bien à gérer et percevez une commission sur le mandat</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Property Type & Location */}
                <FormSection
                    title="Informations Générales"
                    description="Type et localisation du bien"
                    icon={Home}
                >
                    <div>
                        <FormLabel htmlFor="propertyType" required>Type de Bien</FormLabel>
                        <FormSelect
                            id="propertyType"
                            options={PROPERTY_TYPES}
                            placeholder="Sélectionnez le type"
                            error={!!errors.propertyType}
                            {...register('propertyType', { required: 'Le type de bien est requis' })}
                        />
                        <FormError message={errors.propertyType?.message} />
                    </div>

                    <FieldGroup
                        label="Adresse / Localisation"
                        name="location"
                        required
                        placeholder="Ex: Cocody, Riviera Golf, près de..."
                        register={register}
                        error={errors.location}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Superficie (m²)"
                            name="surface"
                            type="number"
                            placeholder="Ex: 150"
                            register={register}
                            error={errors.surface}
                        />
                        <FieldGroup
                            label="Nombre de Pièces"
                            name="rooms"
                            type="number"
                            placeholder="Ex: 5"
                            register={register}
                            error={errors.rooms}
                        />
                    </div>

                    <div>
                        <FormLabel htmlFor="description" required>Description du Bien</FormLabel>
                        <WCPTextArea
                            id="description"
                            placeholder="Décrivez les caractéristiques principales, l'état du bien, les équipements..."
                            rows={5}
                            {...register('description', { required: 'La description est requise' })}
                        />
                        <FormError message={errors.description?.message} />
                    </div>
                </FormSection>

                {/* Pricing */}
                <FormSection
                    title="Informations Financières"
                    description="Prix estimé du bien"
                    icon={DollarSign}
                >
                    <FieldGroup
                        label="Prix Estimé (FCFA)"
                        name="price"
                        type="number"
                        required
                        placeholder="Ex: 50000000"
                        register={register}
                        error={errors.price}
                    />

                    <FieldGroup
                        label="Contact du Propriétaire"
                        name="ownerContact"
                        required
                        placeholder="Nom et téléphone du propriétaire"
                        register={register}
                        error={errors.ownerContact}
                        helpText="Ces informations resteront confidentielles"
                    />
                </FormSection>

                {/* Photos Upload */}
                <FormSection
                    title="Photos du Bien"
                    description="Ajoutez des photos pour valoriser le bien (optionnel)"
                    icon={Upload}
                >
                    <FileUpload
                        accept="image/*"
                        multiple
                        label="Télécharger des photos"
                        onChange={(files) => setPhotos(files)}
                    />
                    <p className="text-sm text-slate-600 mt-2">
                        💡 Les biens avec photos ont 3x plus de chances d'être validés rapidement
                    </p>
                </FormSection>

                {/* Additional Notes */}
                <FormSection
                    title="Informations Complémentaires"
                    description="Contexte de l'apport"
                    icon={MapPin}
                >
                    <div>
                        <FormLabel htmlFor="notes">Commentaires</FormLabel>
                        <WCPTextArea
                            id="notes"
                            placeholder="Quelle est votre relation avec le propriétaire ? Y a-t-il urgence ? Autres informations..."
                            rows={4}
                            {...register('notes')}
                        />
                    </div>
                </FormSection>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-4 pt-4">
                    <FormButton
                        variant="ghost"
                        onClick={() => navigate('/apporteur')}
                        type="button"
                    >
                        Annuler
                    </FormButton>
                    <FormButton
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {isSubmitting ? 'Envoi en cours...' : 'Soumettre le Bien'}
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default PropertySubmissionApporteur;
