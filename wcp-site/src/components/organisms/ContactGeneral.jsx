import React, { useState } from 'react';
import axios from 'axios'; // Importation d'Axios
import FormGroup from '../molecules/FormGroup';
import Button from '../atoms/Button';
import InputText from '../atoms/Text';
import TextArea from '../atoms/TextLong';
import Checkbox from '../atoms/CheckBox';
import Label from '../atoms/Label';

// Définir l'URL de l'API de contact (à adapter en fonction du développement backend)
const API_CONTACT_URL = '/api/contact'; 

const ContactGeneralForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacyAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' ou 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Optionnel : Effacer l'erreur associée lors de la modification du champ
    if (formErrors[name]) {
        setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, privacyAccepted: e.target.checked }));
    // Effacer l'erreur de confidentialité lors du clic
    if (formErrors.privacyAccepted) {
        setFormErrors(prev => ({ ...prev, privacyAccepted: undefined }));
    }
  };

  const validate = () => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Le nom complet est requis.";
    if (!formData.email.trim()) errors.email = "L'adresse email est requise.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Format email invalide.";
    if (!formData.phone.trim()) errors.phone = "Le numéro de téléphone est requis.";
    if (!formData.message.trim()) errors.message = "Le message est requis.";
    // Le champ 'subject' n'est pas marqué comme requis dans votre code
    if (!formData.privacyAccepted) errors.privacyAccepted = "Vous devez accepter la politique de confidentialité.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null); // Réinitialiser le statut

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
        // Envoi des données au backend avec Axios
        const response = await axios.post(API_CONTACT_URL, formData, {
            // Configuration de l'en-tête, si nécessaire (Axios met par défaut Content-Type: application/json)
            headers: {
                // Vous pouvez ajouter des headers comme l'autorisation si l'API l'exige
            }
        });

        // Gérer la réponse de succès
        if (response.status === 200 || response.status === 201) {
            console.log("Réponse du Backend (Succès):", response.data);
            setSubmissionStatus('success');
            // Réinitialiser le formulaire après succès
            setFormData({ fullName: '', email: '', phone: '', subject: '', message: '', privacyAccepted: false });
        } else {
             // Gérer d'autres codes de succès qui ne sont pas 200/201 (rare mais possible)
            setSubmissionStatus('error');
            console.error("Erreur inattendue du serveur:", response.status);
        }

    } catch (error) {
        // Gérer les erreurs de réseau ou les erreurs de réponse du backend (codes 4xx/5xx)
        setSubmissionStatus('error');
        if (axios.isAxiosError(error)) {
            console.error("Erreur Axios :", error.response?.data || error.message);
        } else {
            console.error("Erreur inconnue :", error);
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="wcp-form">
      {/* ... (Vos FormGroup pour fullName, email, phone, subject, message) ... */}
      
      {/* Exemples de FormGroup mis à jour avec la logique */}
      <FormGroup
        id="cg-fullName"
        labelText="Nom complet"
        required={true}
        errorMessage={formErrors.fullName}
      >
        <InputText
          type="text"
          name="fullName"
          placeholder="Votre nom et prénom"
          value={formData.fullName}
          onChange={handleChange}
          // Note : Les props 'required' doivent être passées à l'atome InputText
        />
      </FormGroup>

       <FormGroup
        id="cg-email"
        labelText="Adresse email"
        required={true}
        errorMessage={formErrors.email}
      >
        <InputText
          type="email"
          name="email"
          placeholder="ex: contact@mail.com"
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup
        id="cg-phone"
        labelText="Numéro de téléphone"
        required={true}
        errorMessage={formErrors.phone}
      >
        <InputText
          type="tel"
          name="phone"
          placeholder="ex: 06 00 00 00 00"
          value={formData.phone}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup
        id="cg-subject"
        labelText="Sujet de la demande"
        required={false}
      >
        <InputText
          type="text"
          name="subject"
          placeholder="ex: Demande d'information sur la gestion"
          value={formData.subject}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup
        id="cg-message"
        labelText="Message"
        required={true}
        errorMessage={formErrors.message}
      >
        <TextArea
          name="message"
          placeholder="Décrivez votre demande ici..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
        />
      </FormGroup>
      
      {/* Case à cocher pour la politique de confidentialité */}
      <div className="wcp-privacy-group">
        <Checkbox
          id="cg-privacy"
          name="privacyAccepted"
          checked={formData.privacyAccepted}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor="cg-privacy">
          J'accepte la <a href="/privacy" target="_blank" className="wcp-link-blue">politique de confidentialité</a>
        </Label>
        {formErrors.privacyAccepted && (
            <p className="wcp-privacy-group__error" role="alert">
                {formErrors.privacyAccepted}
            </p>
        )}
      </div>

      {/* Affichage du statut de soumission */}
      {submissionStatus === 'success' && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>Votre message a été envoyé avec succès !</p>
      )}
      {submissionStatus === 'error' && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>Une erreur est survenue lors de l'envoi. Veuillez vérifier votre connexion et réessayer.</p>
      )}

      <div className="wcp-submit-row">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon message'}
        </Button>
      </div>
    </form>
  );
};

export default ContactGeneralForm;