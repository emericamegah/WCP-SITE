import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, Mail, Phone, FileText, AlertCircle } from 'lucide-react';
import FormSection from '../molecules/FormSection';
import FieldGroup from '../molecules/FieldGroup';
import FormLabel from '../atoms/FormLabel';
import FormSelect from '../atoms/FormSelect';
import WCPTextArea from '../atoms/WCPTextArea';
import FormButton from '../atoms/FormButton';
import FormError from '../atoms/FormError';
import Icon from '../atoms/Icon';

const CLIENT_TYPES = [
    { value: 'renter', label: 'Client Locataire' },
    { value: 'buyer', label: 'Client Acheteur' },
];

const ClientSubmissionForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Client submission:', data);
        alert('✅ Client soumis avec succès ! Vous serez contacté sous 48h.');
        navigate('/apporteur');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Apporter un Client</h1>
                <p className="text-slate-600 mt-2">Partagez les coordonnées d'un prospect et gagnez une commission sur la transaction</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Type Selection */}
                <FormSection
                    title="Type de Client"
                    description="Précisez le besoin du prospect"
                    icon={UserPlus}
                >
                    <div>
                        <FormLabel htmlFor="clientType" required>Type de demande</FormLabel>
                        <FormSelect
                            id="clientType"
                            options={CLIENT_TYPES}
                            placeholder="Sélectionnez le type"
                            error={!!errors.clientType}
                            {...register('clientType', { required: 'Le type de client est requis' })}
                        />
                        <FormError message={errors.clientType?.message} />
                    </div>

                    {/* Info Alert */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-900">
                            <p className="font-semibold mb-1">💰 Commission Garantie</p>
                            <p className="text-blue-700">
                                Après validation du prospect par nos équipes, vous recevrez une commission
                                lors de la signature du contrat (Location ou Vente).
                            </p>
                        </div>
                    </div>
                </FormSection>

                {/* Client Information */}
                <FormSection
                    title="Informations du Prospect"
                    description="Coordonnées complètes du client"
                    icon={FileText}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Prénom"
                            name="firstName"
                            required
                            placeholder="Ex: Jean"
                            register={register}
                            error={errors.firstName}
                        />
                        <FieldGroup
                            label="Nom"
                            name="lastName"
                            required
                            placeholder="Ex: Kouassi"
                            register={register}
                            error={errors.lastName}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Email"
                            name="email"
                            type="email"
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

                    <FieldGroup
                        label="Budget Estimé (FCFA)"
                        name="budget"
                        type="number"
                        placeholder="Ex: 5000000"
                        register={register}
                        error={errors.budget}
                    />

                    <div>
                        <FormLabel htmlFor="needs" required>Description des Besoins</FormLabel>
                        <WCPTextArea
                            id="needs"
                            placeholder="Décrivez le type de bien recherché, la localisation souhaitée, les contraintes particulières..."
                            rows={5}
                            {...register('needs', { required: 'La description des besoins est requise' })}
                        />
                        <FormError message={errors.needs?.message} />
                    </div>
                </FormSection>

                {/* Referrer Notes */}
                <FormSection
                    title="Informations Complémentaires"
                    description="Contexte de l'apport (optionnel)"
                    icon={Mail}
                >
                    <div>
                        <FormLabel htmlFor="notes">Commentaires / Contexte</FormLabel>
                        <WCPTextArea
                            id="notes"
                            placeholder="Comment avez-vous rencontré ce prospect ? Y a-t-il urgence ? Informations importantes..."
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
                        {isSubmitting ? 'Envoi en cours...' : 'Soumettre le Client'}
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default ClientSubmissionForm;
