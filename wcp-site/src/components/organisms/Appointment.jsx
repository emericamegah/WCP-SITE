import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from '../molecules/FormGroup';
import Button from '../atoms/Button';
import InputText from '../atoms/Text';
import TextArea from '../atoms/TextLong';
import Label from '../atoms/Label';

const APPOINTMENT_REASONS = [
    'Demande de visite d\'un bien',
    'Consultation sur la gestion de propriété',
    'Demande d\'estimation de bien',
    'Rendez-vous commercial/partenariat',
    'Autre'
];

const API_APPOINTMENT_URL = '/api/requests/appointment'; 

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    appointmentReason: '',
    desiredDate: '',
    desiredTime: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    let errors = {};
    
    if (!formData.fullName.trim()) errors.fullName = "Le nom complet est requis.";
    if (!formData.email.trim()) errors.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Format email invalide.";
    if (!formData.phone.trim()) errors.phone = "Le numéro de téléphone est requis.";

    if (!formData.appointmentReason) errors.appointmentReason = "Le motif est requis.";
    if (!formData.desiredDate) errors.desiredDate = "Une date souhaitée est requise.";
    if (!formData.desiredTime) errors.desiredTime = "Une heure souhaitée est requise.";
    
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

    try {
        const response = await axios.post(API_APPOINTMENT_URL, formData);

        if (response.status === 201) { 
            console.log("Demande de rendez-vous soumise avec succès:", response.data);
            setSubmissionStatus('success');
            setFormData({ fullName: '', email: '', phone: '', appointmentReason: '', desiredDate: '', desiredTime: '', notes: '' });
        }
    } catch (error) {
        setSubmissionStatus('error');
        console.error("Erreur lors de la soumission du rendez-vous :", error.response?.data || error.message);
        setFormErrors(prev => ({ ...prev, general: "Une erreur est survenue lors de l'envoi. Veuillez vérifier vos informations." }));
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Demande de Rendez-vous</h2>

      {formErrors.general && (
        <p role="alert">{formErrors.general}</p>
      )}

      {/* --- Section Contact --- */}
      <FormGroup id="app-fullName" labelText="Nom complet" required={true} errorMessage={formErrors.fullName}>
        <InputText type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Votre nom et prénom" />
      </FormGroup>

      <FormGroup id="app-email" labelText="Adresse email" required={true} errorMessage={formErrors.email}>
        <InputText type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ex: contact@mail.com" />
      </FormGroup>

      <FormGroup id="app-phone" labelText="Numéro de téléphone" required={true} errorMessage={formErrors.phone}>
        <InputText type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="ex: 06 00 00 00 00" />
      </FormGroup>

      {/* --- Section Rendez-vous --- */}
      <FormGroup id="app-reason" labelText="Motif du rendez-vous" required={true} errorMessage={formErrors.appointmentReason}>
        <select name="appointmentReason" value={formData.appointmentReason} onChange={handleChange} required>
          <option value="">-- Sélectionner un motif --</option>
          {APPOINTMENT_REASONS.map(reason => (
            <option key={reason} value={reason.toLowerCase().replace(/\s/g, '-')}>{reason}</option>
          ))}
        </select>
      </FormGroup>

      <FormGroup id="app-date" labelText="Date souhaitée" required={true} errorMessage={formErrors.desiredDate}>
        <InputText type="date" name="desiredDate" value={formData.desiredDate} onChange={handleChange} />
      </FormGroup>

      <FormGroup id="app-time" labelText="Heure souhaitée" required={true} errorMessage={formErrors.desiredTime}>
        <InputText type="time" name="desiredTime" value={formData.desiredTime} onChange={handleChange} />
      </FormGroup>
      
      <FormGroup id="app-notes" labelText="Détails de la demande (optionnel)" required={false}>
        <TextArea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Ajouter toute note pertinente ici..." />
      </FormGroup>


      {/* Affichage du statut de soumission */}
      {submissionStatus === 'success' && (
          <p>Votre demande de rendez-vous a été envoyée ! Nous vous confirmerons la date et l'heure exactes.</p>
      )}
      
      <div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Demander un rendez-vous'}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;