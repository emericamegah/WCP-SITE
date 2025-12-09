import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from '../molecules/FormGroup';
import Button from '../atoms/Button';
import InputText from '../atoms/Text';
import TextArea from '../atoms/TextLong';
import { InputFile } from '../atoms/File';

// Données statiques et constantes
const PROPERTY_TYPES = ['Appartement', 'Maison', 'Villa', 'Studio', 'Terrain', 'Local commercial'];
const API_SUBMISSION_URL = '/api/partner/submit-property'; 
const MAX_PHOTOS = 10; 

const PropertySubmissionForm = () => {
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyType: '',
    area: '', // Superficie en m²
    estimatedPrice: '', // Prix de vente ou loyer estimé
    notes: '', // Notes de l'apporteur sur le bien
    photos: [], // Objets File
    // Note: L'ID de l'apporteur sera probablement ajouté côté backend via le token JWT
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

    if (selectedFiles.length > MAX_PHOTOS) {
        setFormErrors(prev => ({ 
            ...prev, 
            photos: `Vous ne pouvez sélectionner qu'un maximum de ${MAX_PHOTOS} photos.` 
        }));
        e.target.value = null; // Réinitialise l'input
        setFormData(prev => ({ ...prev, photos: [] }));
        return;
    }

    setFormData(prev => ({ 
        ...prev, 
        photos: selectedFiles
    }));
    if (formErrors.photos) setFormErrors(prev => ({ ...prev, photos: undefined }));
  };

  const validate = () => {
    let errors = {};
    
    // Validation des critères du bien (tous sont requis selon la proposition)
    if (!formData.propertyAddress.trim()) errors.propertyAddress = "L'adresse du bien est requise.";
    if (!formData.propertyType) errors.propertyType = "Le type de bien est requis.";

    // Validation Numérique
    if (!formData.area || isNaN(parseInt(formData.area)) || parseInt(formData.area) <= 0) {
        errors.area = "Une superficie valide (m²) est requise.";
    }
    if (!formData.estimatedPrice || isNaN(parseInt(formData.estimatedPrice)) || parseInt(formData.estimatedPrice) <= 0) {
        errors.estimatedPrice = "Un prix estimé valide est requis.";
    }

    // Au moins une photo requise
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

    // Préparation de l'objet FormData pour l'envoi de fichiers
    const submissionData = new FormData();
    
    // Ajouter tous les champs texte/numérique
    for (const key in formData) {
        if (key !== 'photos') {
            submissionData.append(key, formData[key]);
        }
    }

    // Ajouter les fichiers
    formData.photos.forEach((file) => {
        submissionData.append('photos', file); 
    });

    try {
        // L'authentification (token JWT) devrait être gérée par Axios interceptor ici
        const response = await axios.post(API_SUBMISSION_URL, submissionData, {});

        if (response.status === 201) { 
            console.log("Soumission de bien réussie:", response.data);
            setSubmissionStatus('success');
            // Réinitialisation du formulaire
            setFormData({ propertyAddress: '', propertyType: '', area: '', estimatedPrice: '', notes: '', photos: [] });
        }
    } catch (error) {
        setSubmissionStatus('error');
        console.error("Erreur lors de la soumission du bien :", error.response?.data || error.message);
        setFormErrors(prev => ({ ...prev, general: "Une erreur est survenue lors de l'envoi. Assurez-vous d'être connecté." }));
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Soumettre un Bien à Gérer</h2>
      <p>Merci d'utiliser ce formulaire pour nous soumettre un bien pour la vente, la location ou la gestion.</p>

      {formErrors.general && (
        <p role="alert">{formErrors.general}</p>
      )}

      {/* --- Section Caractéristiques du Bien --- */}
      <FormGroup id="sub-address" labelText="Adresse complète du bien" required={true} errorMessage={formErrors.propertyAddress}>
        <InputText type="text" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} placeholder="Lot 123, Quartier X, Ville Y" />
      </FormGroup>

      <FormGroup id="sub-propertyType" labelText="Type de bien" required={true} errorMessage={formErrors.propertyType}>
        <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
          <option value="">-- Sélectionner --</option>
          {PROPERTY_TYPES.map(type => (
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>
      </FormGroup>

      <div style={{ display: 'flex', gap: '20px' }}>
          <FormGroup id="sub-area" labelText="Superficie (m²)" required={true} errorMessage={formErrors.area} style={{ flex: 1 }}>
            <InputText type="number" name="area" value={formData.area} onChange={handleChange} placeholder="Ex: 200" min="1" />
          </FormGroup>

          <FormGroup id="sub-price" labelText="Prix estimé (XOF ou USD)" required={true} errorMessage={formErrors.estimatedPrice} style={{ flex: 1 }}>
            <InputText type="number" name="estimatedPrice" value={formData.estimatedPrice} onChange={handleChange} placeholder="Ex: 50000000" min="1000" />
          </FormGroup>
      </div>

      <FormGroup id="sub-notes" labelText="Notes du bien (optionnel)" required={false}>
        <TextArea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Détails importants à savoir pour la vente/gestion..." />
      </FormGroup>

      {/* 📸 Utilisation de l'atome InputFile */}
      <FormGroup id="sub-photos" labelText={`Photos du bien (max ${MAX_PHOTOS})`} required={true} errorMessage={formErrors.photos}>
        <InputFile 
            name="photos" 
            onChange={handleFileChange} 
            multiple={true}
            accept="image/jpeg, image/png, image/webp" 
        />
        {formData.photos.length > 0 && (
            <small>{formData.photos.length} fichier(s) sélectionné(s) / {MAX_PHOTOS} max.</small>
        )}
      </FormGroup>

      {/* Affichage du statut de soumission */}
      {submissionStatus === 'success' && (
          <p>Le bien a été soumis avec succès ! L'agence va l'examiner et vous tenir informé.</p>
      )}
      
      <div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Soumission en cours...' : 'Soumettre le bien'}
        </Button>
      </div>
    </form>
  );
};

export default PropertySubmissionForm;