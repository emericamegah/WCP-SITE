import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from '../molecules/FormGroup';
import Button from '../atoms/Button';
import InputText from '../atoms/Text';
import TextArea from '../atoms/TextLong';
import { InputFile } from '../atoms/File';
const PROPERTY_TYPES = ['Appartement', 'Maison', 'Villa', 'Studio', 'Terrain', 'Local commercial'];
const PROPERTY_STATES = ['Neuf', 'Très bon état', 'Bon état', 'À rafraîchir', 'À rénover'];

const API_ESTIMATION_URL = '/api/requests/property-estimation'; 

const PropertyEstimationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    propertyType: '',
    area: '',
    rooms: '',
    propertyState: '',
    description: '',
    photos: [],
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
    setFormData(prev => ({ 
        ...prev, 
        photos: Array.from(e.target.files) 
    }));
    if (formErrors.photos) setFormErrors(prev => ({ ...prev, photos: undefined }));
  };

  const validate = () => {
    let errors = {};
    
    if (!formData.fullName.trim()) errors.fullName = "Le nom complet est requis.";
    if (!formData.email.trim()) errors.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Format email invalide.";
    if (!formData.phone.trim()) errors.phone = "Le numéro de téléphone est requis.";
    if (!formData.propertyAddress.trim()) errors.propertyAddress = "L'adresse du bien est requise.";
    if (!formData.propertyType) errors.propertyType = "Le type de bien est requis.";
    if (!formData.area || isNaN(parseInt(formData.area)) || parseInt(formData.area) <= 0) {
        errors.area = "Une superficie valide (m²) est requise.";
    }
    if (!formData.rooms || isNaN(parseInt(formData.rooms)) || parseInt(formData.rooms) <= 0) {
        errors.rooms = "Un nombre de pièces valide est requis.";
    }
    if (!formData.propertyState) errors.propertyState = "L'état du bien est requis.";
    if (!formData.description.trim()) errors.description = "Une description est requise.";
    
    if (formData.photos.length === 0) errors.photos = "Veuillez téléverser au moins une photo du bien.";

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
        if (key !== 'photos' && key !== 'description') {
            submissionData.append(key, formData[key]);
        }
    }
    submissionData.append('description', formData.description);

    formData.photos.forEach((file) => {
        submissionData.append('photos', file);
    });

    try {
        const response = await axios.post(API_ESTIMATION_URL, submissionData, {});

        if (response.status === 201) { 
            console.log("Demande d'estimation soumise avec succès:", response.data);
            setSubmissionStatus('success');
            setFormData({ fullName: '', email: '', phone: '', propertyAddress: '', propertyType: '', area: '', rooms: '', propertyState: '', description: '', photos: [] });
        }
    } catch (error) {
        setSubmissionStatus('error');
        console.error("Erreur lors de la soumission de l'estimation :", error.response?.data || error.message);
        setFormErrors(prev => ({ ...prev, general: "Une erreur est survenue lors de l'envoi. Veuillez réessayer." }));
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Demande d'Estimation de Bien</h2>

      {formErrors.general && (
        <p role="alert">{formErrors.general}</p>
      )}

      {/* --- Champs de Contact et Caractéristiques --- */}
      <FormGroup id="est-fullName" labelText="Nom complet" required={true} errorMessage={formErrors.fullName}>
        <InputText type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Votre nom et prénom" />
      </FormGroup>
      <FormGroup id="est-email" labelText="Adresse email" required={true} errorMessage={formErrors.email}>
        <InputText type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ex: contact@mail.com" />
      </FormGroup>
      <FormGroup id="est-phone" labelText="Numéro de téléphone" required={true} errorMessage={formErrors.phone}>
        <InputText type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="ex: 06 00 00 00 00" />
      </FormGroup>
      <FormGroup id="est-address" labelText="Adresse complète du bien" required={true} errorMessage={formErrors.propertyAddress}>
        <InputText type="text" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} placeholder="Ex: Lot 123, Quartier X, Ville Y" />
      </FormGroup>
      <FormGroup id="est-propertyType" labelText="Type de bien" required={true} errorMessage={formErrors.propertyType}>
        <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
          <option value="">-- Sélectionner --</option>
          {PROPERTY_TYPES.map(type => (
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>
      </FormGroup>
      <FormGroup id="est-area" labelText="Superficie (m²)" required={true} errorMessage={formErrors.area}>
        <InputText type="number" name="area" value={formData.area} onChange={handleChange} placeholder="Ex: 200" min="1" />
      </FormGroup>
      <FormGroup id="est-rooms" labelText="Nombre de pièces" required={true} errorMessage={formErrors.rooms}>
        <InputText type="number" name="rooms" value={formData.rooms} onChange={handleChange} placeholder="Ex: 4" min="1" />
      </FormGroup>
      <FormGroup id="est-state" labelText="État général du bien" required={true} errorMessage={formErrors.propertyState}>
        <select name="propertyState" value={formData.propertyState} onChange={handleChange} required>
          <option value="">-- Sélectionner --</option>
          {PROPERTY_STATES.map(state => (
            <option key={state} value={state.toLowerCase()}>{state}</option>
          ))}
        </select>
      </FormGroup>
      <FormGroup id="est-description" labelText="Description du bien" required={true} errorMessage={formErrors.description}>
        <TextArea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Atouts, défauts, travaux à prévoir, etc." />
      </FormGroup>

      {/* 📸 Utilisation de l'atome InputFile */}
      <FormGroup id="est-photos" labelText={`Photos du bien (max 5)`} required={true} errorMessage={formErrors.photos}>
        <InputFile 
            name="photos" 
            onChange={handleFileChange} 
            multiple={true}
            accept="image/jpeg, image/png" 
        />
        {formData.photos.length > 0 && (
            <small>{formData.photos.length} fichier(s) sélectionné(s).</small>
        )}
      </FormGroup>

      {/* Affichage du statut de soumission */}
      {submissionStatus === 'success' && (
          <p>Votre demande d'estimation a été soumise avec succès. Les photos ont été transmises.</p>
      )}
      {submissionStatus === 'error' && !formErrors.general && (
          <p role="alert">Une erreur de réseau est survenue. Veuillez vérifier vos informations.</p>
      )}
      
      <div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Demander mon estimation gratuite'}
        </Button>
      </div>
    </form>
  );
};

export default PropertyEstimationForm;