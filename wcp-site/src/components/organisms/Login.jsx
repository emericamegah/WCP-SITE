import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from '../molecules/FormGroup';
import Button from '../atoms/Button';
import InputText from '../atoms/Text';
import Label from '../atoms/Label';

const API_LOGIN_URL = '/api/auth/login'; 
const API_GOOGLE_LOGIN_URL = '/api/auth/google'; 

const LoginForm = ({ onLoginSuccess }) => { 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email.trim()) errors.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Format email invalide.";
    if (!formData.password) errors.password = "Le mot de passe est requis.";
    
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
        const response = await axios.post(API_LOGIN_URL, formData);

        if (response.status === 200) {
            console.log("Connexion réussie. Jeton (Token) reçu :", response.data.token);
            setSubmissionStatus('success');
            
            localStorage.setItem('authToken', response.data.token);
            
            if (onLoginSuccess) {
                onLoginSuccess(response.data.user);
            }
        }
    } catch (error) {
        setSubmissionStatus('error');
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            setFormErrors(prev => ({ ...prev, general: "Email ou mot de passe incorrect." }));
        }
        console.error("Erreur de connexion :", error.response?.data || error.message);
    } finally {
        setIsSubmitting(false);
    }
  };
    
  const handleGoogleLogin = () => {
      window.location.href = API_GOOGLE_LOGIN_URL;
  };


  return (
    <form onSubmit={handleSubmit}>

      {formErrors.general && (
        <p role="alert">
            {formErrors.general}
        </p>
      )}

      <FormGroup id="log-email" labelText="Adresse email" required={true} errorMessage={formErrors.email}>
        <InputText 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Votre email" 
        />
      </FormGroup>

      <FormGroup id="log-password" labelText="Mot de passe" required={true} errorMessage={formErrors.password}>
        <InputText 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Votre mot de passe" 
        />
      </FormGroup>

      <div>
        <a href="/forgot-password">
          Mot de passe oublié ?
        </a>
      </div>

      {submissionStatus === 'success' && (
          <p>Connexion réussie ! Redirection en cours...</p>
      )}
      {submissionStatus === 'error' && !formErrors.general && (
          <p role="alert">Une erreur de réseau est survenue. Veuillez réessayer.</p>
      )}

      <div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </div>

      <div>
        <Button 
            type="button" 
            onClick={handleGoogleLogin}
        >
            Connectez-vous avec Google
        </Button>
      </div>

      <div>
        <p>Pas encore de compte ? <a href="/register">Créer un compte</a></p>
      </div>
    </form>
  );
};

export default LoginForm;