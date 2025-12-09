import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from '../molecules/FormGroup';
import Button from '../atoms/Button';
import InputText from '../atoms/Text';
import TextArea from '../atoms/TextLong';
import Label from '../atoms/Label';

const PROPERTY_TYPES = ['Appartement', 'Maison', 'Villa', 'Studio', 'Local commercial', 'Terrain'];
const RENTAL_DURATIONS = ['Moins de 6 mois', '6 mois - 1 an', '1 an - 2 ans', 'Plus de 2 ans'];

const API_RENTAL_REQUEST_URL = '/api/requests/rental-demand'; 

const RentalDemandForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    propertyType: '',
    maxBudget: '',
    desiredLocation: '',
    rentalDuration: '',
    moveInDate: '',
    propertyDescription: '',
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
    if (!formData.profession.trim()) errors.profession = "La profession / secteur d'activité est requis.";

    if (!formData.propertyType) errors.propertyType = "Le type de bien est requis.";
    if (!formData.maxBudget || isNaN(parseInt(formData.maxBudget)) || parseInt(formData.maxBudget) <= 0) {
        errors.maxBudget = "Un budget maximum valide est requis.";
    }
    if (!formData.desiredLocation.trim()) errors.desiredLocation = "La localisation est requise.";
    if (!formData.rentalDuration) errors.rentalDuration = "La durée de location est requise.";
    if (!formData.moveInDate) errors.moveInDate = "Une date d'emménagement est requise.";
    if (!formData.propertyDescription.trim()) errors.propertyDescription = "La description est requise.";
    
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
        const response = await axios.post(API_RENTAL_REQUEST_URL, formData);

        if (response.status === 201) { 
            console.log("Demande de location soumise avec succès:", response.data);
            setSubmissionStatus('success');
            setFormData({ fullName: '', email: '', phone: '', profession: '', propertyType: '', maxBudget: '', desiredLocation: '', rentalDuration: '', moveInDate: '', propertyDescription: '' });
        }
    } catch (error) {
        setSubmissionStatus('error');
        console.error("Erreur lors de la soumission de la demande :", error.response?.data || error.message);
        setFormErrors(prev => ({ ...prev, general: "Une erreur est survenue lors de l'envoi. Veuillez réessayer." }));
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulaire de Demande de Location</h2>

      {formErrors.general && (
        <p role="alert">{formErrors.general}</p>
      )}

      <FormGroup id="rd-fullName" labelText="Nom complet" required={true} errorMessage={formErrors.fullName}>
        <InputText type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Votre nom et prénom" />
      </FormGroup>

      <FormGroup id="rd-email" labelText="Adresse email" required={true} errorMessage={formErrors.email}>
        <InputText type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ex: contact@mail.com" />
      </FormGroup>

      <FormGroup id="rd-phone" labelText="Numéro de téléphone" required={true} errorMessage={formErrors.phone}>
        <InputText type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="ex: 06 00 00 00 00" />
      </FormGroup>

      <FormGroup id="rd-profession" labelText="Profession / Secteur d'activité" required={true} errorMessage={formErrors.profession}>
        <InputText type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder="Ex: Ingénieur, Consultant, Commerce, etc." />
      </FormGroup>

      <FormGroup id="rd-propertyType" labelText="Type de bien recherché" required={true} errorMessage={formErrors.propertyType}>
        <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
          <option value="">-- Sélectionner --</option>
          {PROPERTY_TYPES.map(type => (
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>
      </FormGroup>

      <FormGroup id="rd-maxBudget" labelText="Budget maximum (XOF / Mois)" required={true} errorMessage={formErrors.maxBudget}>
        <InputText type="number" name="maxBudget" value={formData.maxBudget} onChange={handleChange} placeholder="Ex: 500000" min="1" />
      </FormGroup>

      <FormGroup id="rd-desiredLocation" labelText="Localisation souhaitée" required={true} errorMessage={formErrors.desiredLocation}>
        <InputText type="text" name="desiredLocation" value={formData.desiredLocation} onChange={handleChange} placeholder="Ex: Cotonou, Calavi" />
      </FormGroup>
      
      <FormGroup id="rd-rentalDuration" labelText="Durée de location" required={true} errorMessage={formErrors.rentalDuration}>
        <select name="rentalDuration" value={formData.rentalDuration} onChange={handleChange} required>
          <option value="">-- Sélectionner --</option>
          {RENTAL_DURATIONS.map(duration => (
            <option key={duration} value={duration}>{duration}</option>
          ))}
        </select>
      </FormGroup>

      <FormGroup id="rd-moveInDate" labelText="Date souhaitée d'emménagement" required={true} errorMessage={formErrors.moveInDate}>
        <InputText type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} />
      </FormGroup>

      <FormGroup id="rd-propertyDescription" labelText="Description du bien recherché (détails)" required={true} errorMessage={formErrors.propertyDescription}>
        <TextArea name="propertyDescription" value={formData.propertyDescription} onChange={handleChange} rows={4} placeholder="Ex: Je recherche un F3 avec balcon dans un quartier calme..." />
      </FormGroup>

      {submissionStatus === 'success' && (
          <p>Votre demande de location a été soumise avec succès. Nous vous contacterons bientôt !</p>
      )}
      
      <div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Soumettre ma demande'}
        </Button>
      </div>
    </form>
  );
};

export default RentalDemandForm;