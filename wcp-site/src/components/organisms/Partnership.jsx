import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from '../molecules/FormGroup';
import Button from '../atoms/Button';
import InputText from '../atoms/Text';
import TextArea from '../atoms/TextLong';
import { InputFile } from '../atoms/File';

const PARTNERSHIP_TYPES = [
    'Apport d\'affaires (Client à la recherche d\'un bien)',
    'Apport d\'affaires (Propriétaire d\'un bien à vendre/louer)',
    'Partenariat général / Fournisseur',
    'Autre'
];

const API_PARTNERSHIP_URL = '/api/requests/partnership'; 
const MAX_DOCUMENTS = 5;

const PartnershipForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    partnershipType: '',
    description: '',
    documents: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > MAX_DOCUMENTS) {
        setFormErrors(prev => ({ 
            ...prev, 
            documents: `Vous ne pouvez sélectionner qu'un maximum de ${MAX_DOCUMENTS} documents/fichiers.` 
        }));
        e.target.value = null;
        setFormData(prev => ({ ...prev, documents: [] }));
        return;
    }

    setFormData(prev => ({ 
        ...prev, 
        documents: selectedFiles
    }));
    if (formErrors.documents) setFormErrors(prev => ({ ...prev, documents: undefined }));
  };

  const validate = () => {
    let errors = {};
    
    if (!formData.fullName.trim()) errors.fullName = "Le nom complet est requis.";
    if (!formData.email.trim()) errors.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Format email invalide.";
    if (!formData.phone.trim()) errors.phone = "Le numéro de téléphone est requis.";

    if (!formData.partnershipType) errors.partnershipType = "Le type de partenariat est requis.";
    if (!formData.description.trim()) errors.description = "La description est requise pour évaluer l'apport.";
    
    if (formData.documents.length === 0) {
        // Rendre l'ajout de document optionnel ou mettre un message d'avertissement.
        // Ici, on le rend non-bloquant, mais on pourrait le rendre requis en changeant la logique.
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null); 

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const submissionData = new FormData();
    
    for (const key in formData) {
        if (key !== 'documents') {
            submissionData.append(key, formData[key]);
        }
    }

    formData.documents.forEach((file) => {
        submissionData.append('documents', file);
    });

    try {
        const response = await axios.post(API_PARTNERSHIP_URL, submissionData, {});

        if (response.status === 201) { 
            console.log("Demande de partenariat soumise avec succès:", response.data);
            setSubmissionStatus('success');
            setFormData({ fullName: '', email: '', phone: '', partnershipType: '', description: '', documents: [] });
        }
    } catch (error) {
        setSubmissionStatus('error');
        console.error("Erreur lors de la soumission de l'apport :", error.response?.data || error.message);
        setFormErrors(prev => ({ ...prev, general: "Une erreur est survenue lors de l'envoi. Veuillez réessayer." }));
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulaire de Partenariat / Apport d'Affaires</h2>

      {formErrors.general && (
        <p role="alert">{formErrors.general}</p>
      )}

      <FormGroup id="part-fullName" labelText="Nom et prénom" required={true} errorMessage={formErrors.fullName}>
        <InputText type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Votre nom et prénom" />
      </FormGroup>

      <FormGroup id="part-email" labelText="Adresse email" required={true} errorMessage={formErrors.email}>
        <InputText type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ex: contact@mail.com" />
      </FormGroup>

      <FormGroup id="part-phone" labelText="Numéro de téléphone" required={true} errorMessage={formErrors.phone}>
        <InputText type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="ex: 06 00 00 00 00" />
      </FormGroup>

      <FormGroup id="part-type" labelText="Type de partenariat / Apport" required={true} errorMessage={formErrors.partnershipType}>
        <select name="partnershipType" value={formData.partnershipType} onChange={handleChange} required>
          <option value="">-- Sélectionner --</option>
          {PARTNERSHIP_TYPES.map(type => (
            <option key={type} value={type.toLowerCase().replace(/\s/g, '-')}>{type}</option>
          ))}
        </select>
      </FormGroup>

      <FormGroup id="part-description" labelText="Description de l'apport (bien ou client)" required={true} errorMessage={formErrors.description}>
        <TextArea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Ex: J'ai un client qui recherche une villa à Cotonou, ou j'ai un bien de 200m² à vendre..." />
      </FormGroup>

      <FormGroup id="part-documents" labelText={`Documents ou Pièces jointes (max ${MAX_DOCUMENTS})`} required={false} errorMessage={formErrors.documents}>
        <InputFile 
            name="documents" 
            onChange={handleFileChange} 
            multiple={true}
            accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
        />
        {formData.documents.length > 0 && (
            <small>{formData.documents.length} fichier(s) sélectionné(s) / {MAX_DOCUMENTS} max.</small>
        )}
      </FormGroup>

      {submissionStatus === 'success' && (
          <p>Votre demande de partenariat/apport a été soumise avec succès. Nous analyserons les informations et vous contacterons rapidement.</p>
      )}
      
      <div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Soumettre mon Partenariat'}
        </Button>
      </div>
    </form>
  );
};

export default PartnershipForm;