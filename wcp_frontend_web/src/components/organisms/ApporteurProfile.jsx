import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, CreditCard, Upload, ShieldCheck, Save } from 'lucide-react';
import { apporteurProfile } from '../../api/apporteurMockData';
import FormSection from '../molecules/FormSection';
import FieldGroup from '../molecules/FieldGroup';
import FormLabel from '../atoms/FormLabel';
import FormButton from '../atoms/FormButton';
import FormError from '../atoms/FormError';
import FileUpload from '../atoms/FileUpload';

const ApporteurProfile = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ribDocument, setRibDocument] = useState(null);
    const [idDocument, setIdDocument] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: apporteurProfile.name,
            email: apporteurProfile.email,
            phone: apporteurProfile.phone,
            bankName: apporteurProfile.bankInfo.bankName,
            iban: apporteurProfile.bankInfo.iban,
            accountName: apporteurProfile.bankInfo.accountName
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        const formData = { ...data, ribDocument, idDocument };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Profile update:', formData);
        alert('✅ Profil mis à jour avec succès !');
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Mon Compte</h1>
                <p className="text-slate-600 mt-2">Gérez vos informations personnelles et bancaires</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <FormSection
                    title="Informations Personnelles"
                    description="Coordonnées de contact"
                    icon={User}
                >
                    <FieldGroup
                        label="Nom Complet"
                        name="name"
                        required
                        placeholder="Votre nom complet"
                        register={register}
                        error={errors.name}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Email"
                            name="email"
                            type="email"
                            required
                            placeholder="email@exemple.com"
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

                {/* Bank Information */}
                <FormSection
                    title="Informations Bancaires (RIB)"
                    description="Pour le versement de vos commissions"
                    icon={CreditCard}
                >
                    <div className={`p-4 rounded-lg border-2 ${apporteurProfile.bankInfo.verified
                            ? 'bg-green-50 border-green-200'
                            : 'bg-yellow-50 border-yellow-200'
                        }`}>
                        <div className="flex items-center gap-2">
                            <ShieldCheck
                                size={20}
                                className={apporteurProfile.bankInfo.verified ? 'text-green-600' : 'text-yellow-600'}
                            />
                            <p className={`text-sm font-semibold ${apporteurProfile.bankInfo.verified ? 'text-green-900' : 'text-yellow-900'
                                }`}>
                                {apporteurProfile.bankInfo.verified
                                    ? '✓ Compte Vérifié - Paiements Activés'
                                    : '⚠️ Vérification en Attente'}
                            </p>
                        </div>
                    </div>

                    <FieldGroup
                        label="Nom de la Banque"
                        name="bankName"
                        required
                        placeholder="Ex: NSIA Banque CI"
                        register={register}
                        error={errors.bankName}
                    />

                    <FieldGroup
                        label="IBAN / Numéro de Compte"
                        name="iban"
                        required
                        placeholder="CI00 0000 0000 0000 0000 00"
                        register={register}
                        error={errors.iban}
                    />

                    <FieldGroup
                        label="Titulaire du Compte"
                        name="accountName"
                        required
                        placeholder="Nom sur le relevé bancaire"
                        register={register}
                        error={errors.accountName}
                    />
                </FormSection>

                {/* Document Upload */}
                <FormSection
                    title="Justificatifs"
                    description="Documents requis pour la vérification"
                    icon={Upload}
                >
                    <div>
                        <FormLabel htmlFor="ribUpload" required>RIB (Relevé d'Identité Bancaire)</FormLabel>
                        <FileUpload
                            accept="application/pdf,image/*"
                            multiple={false}
                            label="Télécharger votre RIB"
                            onChange={(files) => setRibDocument(files[0])}
                        />
                        <p className="text-xs text-slate-600 mt-2">
                            Formats acceptés : PDF, JPG, PNG (max 5 MB)
                        </p>
                    </div>

                    <div>
                        <FormLabel htmlFor="idUpload" required>Pièce d'Identité</FormLabel>
                        <FileUpload
                            accept="application/pdf,image/*"
                            multiple={false}
                            label="CNI, Passeport ou Attestation"
                            onChange={(files) => setIdDocument(files[0])}
                        />
                        <p className="text-xs text-slate-600 mt-2">
                            Document valide avec photo visible
                        </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900">
                            <strong className="font-semibold">🔒 Sécurité :</strong> Vos documents sont cryptés et conformes au RGPD.
                            Ils sont uniquement utilisés pour la vérification de votre compte.
                        </p>
                    </div>
                </FormSection>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <FormButton
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700"
                        icon={Save}
                    >
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer les Modifications'}
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default ApporteurProfile;
