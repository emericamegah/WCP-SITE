import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, User, Calendar, DollarSign, FileText, Upload } from 'lucide-react';
import { tenants } from '../../api/propertyAssignments';
import { assignTenantToProperty, getAvailableTenants } from '../../api/services/assignmentService';
import FormLabel from '../atoms/FormLabel';
import FormSelect from '../atoms/FormSelect';
import FieldGroup from '../molecules/FieldGroup';
import FormButton from '../atoms/FormButton';
import FormError from '../atoms/FormError';
import FileUpload from '../atoms/FileUpload';

const AssignTenantModal = ({ property, onClose, onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contractDocument, setContractDocument] = useState(null);

    const availableTenants = getAvailableTenants();
    const tenantOptions = availableTenants.map(t => ({
        value: t.id,
        label: `${t.firstName} ${t.lastName} (${t.email})`
    }));

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: 'onBlur',
        defaultValues: {
            rentAmount: property.monthlyRent,
            paymentDay: 5
        }
    });

    const selectedTenantId = watch('tenantId');
    const selectedTenant = tenants.find(t => t.id === selectedTenantId);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const leaseData = {
                startDate: data.startDate,
                endDate: data.endDate,
                rentAmount: parseFloat(data.rentAmount),
                charges: parseFloat(data.charges || 0),
                deposit: parseFloat(data.deposit),
                paymentDay: parseInt(data.paymentDay),
                notes: data.notes || ''
            };

            const result = assignTenantToProperty(property.id, data.tenantId, leaseData);

            alert(`✅ Locataire assigné avec succès!\nBail créé: ${result.lease.id}`);
            onSuccess && onSuccess(result);
            onClose();
        } catch (error) {
            alert(`❌ Erreur: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Assigner un Locataire</h2>
                        <p className="text-sm text-slate-600 mt-1">{property.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Tenant Selection */}
                    <div>
                        <FormLabel htmlFor="tenantId" required>Sélectionner le Locataire</FormLabel>
                        <FormSelect
                            id="tenantId"
                            options={tenantOptions}
                            placeholder="Choisir un locataire disponible"
                            error={!!errors.tenantId}
                            {...register('tenantId', { required: 'Le locataire est requis' })}
                        />
                        <FormError message={errors.tenantId?.message} />

                        {selectedTenant && (
                            <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={selectedTenant.avatar}
                                        alt={selectedTenant.firstName}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            {selectedTenant.firstName} {selectedTenant.lastName}
                                        </p>
                                        <p className="text-sm text-slate-600">{selectedTenant.email}</p>
                                        <p className="text-sm text-slate-600">{selectedTenant.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Lease Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Date de Début"
                            name="startDate"
                            type="date"
                            required
                            register={register}
                            error={errors.startDate}
                        />
                        <FieldGroup
                            label="Date de Fin"
                            name="endDate"
                            type="date"
                            required
                            register={register}
                            error={errors.endDate}
                        />
                    </div>

                    {/* Financial Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Loyer Mensuel (FCFA)"
                            name="rentAmount"
                            type="number"
                            required
                            placeholder="Ex: 450000"
                            register={register}
                            error={errors.rentAmount}
                        />
                        <FieldGroup
                            label="Charges (FCFA)"
                            name="charges"
                            type="number"
                            placeholder="Ex: 50000"
                            register={register}
                            error={errors.charges}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldGroup
                            label="Dépôt de Garantie (FCFA)"
                            name="deposit"
                            type="number"
                            required
                            placeholder="Ex: 900000"
                            register={register}
                            error={errors.deposit}
                            helpText="Généralement 2 mois de loyer"
                        />
                        <FieldGroup
                            label="Jour de Paiement"
                            name="paymentDay"
                            type="number"
                            required
                            placeholder="Ex: 5"
                            register={register}
                            error={errors.paymentDay}
                            helpText="Jour du mois (1-31)"
                        />
                    </div>

                    {/* Contract Upload */}
                    <div>
                        <FormLabel htmlFor="contract">Contrat de Bail (Optionnel)</FormLabel>
                        <FileUpload
                            accept="application/pdf"
                            multiple={false}
                            label="Télécharger le contrat signé (PDF)"
                            onChange={(files) => setContractDocument(files[0])}
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <FormLabel htmlFor="notes">Notes / Commentaires</FormLabel>
                        <textarea
                            id="notes"
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Informations complémentaires sur le bail..."
                            {...register('notes')}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                        <FormButton
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                        >
                            Annuler
                        </FormButton>
                        <FormButton
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isSubmitting ? 'Création du bail...' : 'Créer le Bail'}
                        </FormButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignTenantModal;
