import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Home, FileText, Image as ImageIcon, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import ProgressStepper from '../molecules/ProgressStepper';
import FormSection from '../molecules/FormSection';
import FieldGroup from '../molecules/FieldGroup';
import FormLabel from '../atoms/FormLabel';
import FormSelect from '../atoms/FormSelect';
import WCPTextArea from '../atoms/WCPTextArea';
import CheckboxGroup from '../molecules/CheckboxGroup';
import FileUpload from '../atoms/FileUpload';
import FormButton from '../atoms/FormButton';
import FormError from '../atoms/FormError';

const PROPERTY_TYPES = [
    { value: 'apartment', label: 'Appartement' },
    { value: 'villa', label: 'Villa' },
    { value: 'office', label: 'Bureau' },
    { value: 'land', label: 'Terrain' },
    { value: 'commercial', label: 'Commerce' },
];

const PROPERTY_CONDITIONS = [
    { value: 'new', label: 'Neuf' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Bon' },
    { value: 'renovation', label: 'À rénover' },
];

const TRANSACTION_TYPES = [
    { value: 'sale', label: 'Vente' },
    { value: 'rent', label: 'Location' },
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

const STEPS = [
    { id: 'general', label: 'Informations' },
    { id: 'technical', label: 'Caractéristiques' },
    { id: 'media', label: 'Médias' },
    { id: 'pricing', label: 'Prix' },
];

const PropertySubmissionForm = ({ onSubmit, onCancel }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        amenities: [],
        photos: [],
        videos: [],
        requestEstimation: false,
    });

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        mode: 'onBlur',
    });

    const requestEstimation = watch('requestEstimation', false);

    const handleStepData = (data) => {
        setFormData({ ...formData, ...data });
    };

    const nextStep = () => {
        handleSubmit((data) => {
            handleStepData(data);
            setCurrentStep(currentStep + 1);
        })();
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const onFormSubmit = handleSubmit((data) => {
        const finalData = { ...formData, ...data };
        onSubmit(finalData);
    });

    const renderStep1 = () => (
        <FormSection
            title="Informations Générales"
            description="Décrivez les informations de base de votre bien"
            icon={Home}
        >
            <FieldGroup
                label="Titre du bien"
                name="title"
                required
                placeholder="Ex: Belle villa moderne avec piscine"
                register={register}
                error={errors.title}
            />

            <div>
                <FormLabel htmlFor="propertyType" required>Type de bien</FormLabel>
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
                label="Adresse complète"
                name="address"
                required
                placeholder="Ex: Boulevard Latrille"
                register={register}
                error={errors.address}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldGroup
                    label="Ville"
                    name="city"
                    required
                    placeholder="Ex: Abidjan"
                    register={register}
                    error={errors.city}
                />
                <FieldGroup
                    label="Code postal"
                    name="postalCode"
                    placeholder="Ex: 00225"
                    register={register}
                    error={errors.postalCode}
                />
            </div>

            <div>
                <FormLabel htmlFor="description">Description</FormLabel>
                <WCPTextArea
                    id="description"
                    placeholder="Décrivez votre bien..."
                    rows={4}
                    {...register('description')}
                />
            </div>
        </FormSection>
    );

    const renderStep2 = () => (
        <FormSection
            title="Caractéristiques Techniques"
            description="Précisez les détails de votre bien"
            icon={FileText}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldGroup
                    label="Surface (m²)"
                    name="surface"
                    type="number"
                    required
                    placeholder="Ex: 150"
                    register={register}
                    error={errors.surface}
                />
                <FieldGroup
                    label="Nombre de pièces"
                    name="rooms"
                    type="number"
                    required
                    placeholder="Ex: 5"
                    register={register}
                    error={errors.rooms}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldGroup
                    label="Nombre de chambres"
                    name="bedrooms"
                    type="number"
                    placeholder="Ex: 3"
                    register={register}
                    error={errors.bedrooms}
                />
                <FieldGroup
                    label="Nombre de salles de bain"
                    name="bathrooms"
                    type="number"
                    placeholder="Ex: 2"
                    register={register}
                    error={errors.bathrooms}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <FormLabel htmlFor="condition" required>État du bien</FormLabel>
                    <FormSelect
                        id="condition"
                        options={PROPERTY_CONDITIONS}
                        placeholder="Sélectionnez l'état"
                        error={!!errors.condition}
                        {...register('condition', { required: "L'état du bien est requis" })}
                    />
                    <FormError message={errors.condition?.message} />
                </div>
                <FieldGroup
                    label="Année de construction"
                    name="yearBuilt"
                    type="number"
                    placeholder="Ex: 2020"
                    register={register}
                    error={errors.yearBuilt}
                />
            </div>

            <CheckboxGroup
                label="Options et équipements"
                options={AMENITIES}
                selectedValues={formData.amenities}
                onChange={(values) => setFormData({ ...formData, amenities: values })}
                columns={3}
            />
        </FormSection>
    );

    const renderStep3 = () => (
        <FormSection
            title="Médias"
            description="Ajoutez des photos et vidéos de votre bien"
            icon={ImageIcon}
        >
            <FileUpload
                accept="image/*"
                multiple
                label="Photos du bien"
                onChange={(files) => setFormData({ ...formData, photos: files })}
            />
            <p className="text-sm text-gray-600">
                Nous recommandons au moins 3 photos de qualité pour valoriser votre bien.
            </p>

            <FileUpload
                accept="video/*"
                multiple={false}
                label="Vidéo du bien (optionnel)"
                onChange={(files) => setFormData({ ...formData, videos: files })}
            />

            <div>
                <FormLabel htmlFor="mediaDescription">Description des médias (optionnel)</FormLabel>
                <WCPTextArea
                    id="mediaDescription"
                    placeholder="Précisez des détails sur les photos/vidéos..."
                    rows={3}
                    {...register('mediaDescription')}
                />
            </div>
        </FormSection>
    );

    const renderStep4 = () => (
        <FormSection
            title="Prix & Estimation"
            description="Indiquez vos attentes financières"
            icon={DollarSign}
        >
            <div>
                <FormLabel htmlFor="transactionType" required>Type de transaction</FormLabel>
                <FormSelect
                    id="transactionType"
                    options={TRANSACTION_TYPES}
                    placeholder="Vente ou Location"
                    error={!!errors.transactionType}
                    {...register('transactionType', { required: 'Le type de transaction est requis' })}
                />
                <FormError message={errors.transactionType?.message} />
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <input
                    type="checkbox"
                    id="requestEstimation"
                    className="mt-1"
                    {...register('requestEstimation')}
                    onChange={(e) => {
                        setValue('requestEstimation', e.target.checked);
                        if (e.target.checked) {
                            setValue('price', '');
                        }
                    }}
                />
                <label htmlFor="requestEstimation" className="text-sm">
                    <span className="font-semibold text-blue-900">Demander une estimation commerciale</span>
                    <p className="text-blue-700 mt-1">
                        Nos experts évalueront votre bien et vous proposeront un prix de marché adapté.
                    </p>
                </label>
            </div>

            {!requestEstimation && (
                <FieldGroup
                    label="Prix souhaité (FCFA)"
                    name="price"
                    type="number"
                    placeholder="Ex: 50000000"
                    register={register}
                    error={errors.price}
                />
            )}

            <div>
                <FormLabel htmlFor="additionalComments">Commentaires additionnels</FormLabel>
                <WCPTextArea
                    id="additionalComments"
                    placeholder="Informations supplémentaires, disponibilités, etc."
                    rows={4}
                    {...register('additionalComments')}
                />
            </div>
        </FormSection>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <ProgressStepper
                steps={STEPS}
                currentStep={currentStep}
                className="mb-8"
            />

            <form onSubmit={onFormSubmit}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}

                <div className="flex items-center justify-between mt-8 gap-4">
                    <div className="flex gap-3">
                        {currentStep > 1 && (
                            <FormButton
                                variant="outline"
                                onClick={prevStep}
                                icon={ChevronLeft}
                            >
                                Précédent
                            </FormButton>
                        )}
                        {onCancel && currentStep === 1 && (
                            <FormButton
                                variant="ghost"
                                onClick={onCancel}
                            >
                                Annuler
                            </FormButton>
                        )}
                    </div>

                    {currentStep < 4 ? (
                        <FormButton
                            variant="primary"
                            onClick={nextStep}
                            icon={ChevronRight}
                        >
                            Suivant
                        </FormButton>
                    ) : (
                        <FormButton
                            type="submit"
                            variant="primary"
                        >
                            Soumettre le bien
                        </FormButton>
                    )}
                </div>
            </form>
        </div>
    );
};

PropertySubmissionForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default PropertySubmissionForm;
