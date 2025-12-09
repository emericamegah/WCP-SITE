import React from 'react';
import ContactGeneralForm from './components/organisms/ContactGeneral';
import RegisterForm from './components/organisms/Register';
import LoginForm from './components/organisms/Login';
import RentalDemandForm from './components/organisms/RentalDemand';
import PropertyEstimationForm from './components/organisms/PropertyEstimation';
import PartnershipForm from './components/organisms/Partnership';
import PropertySubmissionForm from './components/organisms/PropertySubmition';
import './App.css'; 

function App() {
  return (
    <div className="App"> 
      
      <PropertySubmissionForm />

    </div>
  );
}

export default App;