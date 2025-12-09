import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from '../molecules/FormGroup';
import Button from '../atoms/Button';
import InputText from '../atoms/Text';
import Checkbox from '../atoms/CheckBox';
import Label from '../atoms/Label';

const API_REGISTER_URL = '/api/auth/register'; 

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    privacyAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, privacyAccepted: e.target.checked }));
    if (formErrors.privacyAccepted) setFormErrors(prev => ({ ...prev, privacyAccepted: undefined }));
  };

  const validate = () => {
    let errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Le nom complet est requis.";
    if (!formData.email.trim()) errors.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Format email invalide.";
    if (!formData.phone.trim()) errors.phone = "Le téléphone est requis.";

    if (formData.password.length < 6) errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";

    if (!formData.privacyAccepted) errors.privacyAccepted = "Vous devez accepter la politique de confidentialité.";
    
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

    const { confirmPassword, ...dataToSend } = formData;

    try {
        const response = await axios.post(API_REGISTER_URL, dataToSend);

        if (response.status === 201) {
            console.log("Inscription réussie:", response.data);
            setSubmissionStatus('success');
            setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', privacyAccepted: false });
        }
    } catch (error) {
        setSubmissionStatus('error');
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            setFormErrors(prev => ({ ...prev, email: "Cet email est déjà associé à un compte." }));
        }
        console.error("Erreur d'inscription :", error.response?.data || error.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="wcp-form">
      <h2>Créer un Compte</h2>

      <FormGroup id="reg-fullName" labelText="Nom complet" required={true} errorMessage={formErrors.fullName}>
        <InputText type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nom et prénom" />
      </FormGroup>

      <FormGroup id="reg-email" labelText="Adresse email" required={true} errorMessage={formErrors.email}>
        <InputText type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ex: contact@mail.com" />
      </FormGroup>
      
      <FormGroup id="reg-phone" labelText="Numéro de téléphone" required={true} errorMessage={formErrors.phone}>
        <InputText type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="ex: 06 00 00 00 00" />
      </FormGroup>

      <FormGroup id="reg-password" labelText="Mot de passe" required={true} errorMessage={formErrors.password}>
        <InputText type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 caractères" />
      </FormGroup>

      <FormGroup id="reg-confirmPassword" labelText="Confirmer le mot de passe" required={true} errorMessage={formErrors.confirmPassword}>
        <InputText type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Retapez votre mot de passe" />
      </FormGroup>

      <div className="wcp-privacy-group">
        <Checkbox id="reg-privacy" name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleCheckboxChange} />
        <Label htmlFor="reg-privacy">
          J'accepte la <a href="/privacy" target="_blank" className="wcp-link-blue">politique de confidentialité</a>
        </Label>
        {formErrors.privacyAccepted && (
            <p className="wcp-privacy-group__error" role="alert">{formErrors.privacyAccepted}</p>
        )}
      </div>

      {submissionStatus === 'success' && (<p style={{ color: 'green', fontWeight: 'bold' }}>Compte créé avec succès ! Vous pouvez maintenant vous connecter.</p>)}
      {submissionStatus === 'error' && (<p style={{ color: 'red', fontWeight: 'bold' }}>Une erreur est survenue lors de l'inscription. Veuillez vérifier les informations et réessayer.</p>)}

      <div className="wcp-submit-row">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Création en cours...' : 'Créer mon compte'}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;