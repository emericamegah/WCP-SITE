# Guide de Migration : Mock Data → Backend API

## Vue d'Ensemble

Le fichier `backendRoutes.js` centralise **toutes les routes API** de votre backend. Pour passer des données fictives au backend réel, suivez ce guide.

## Étape 1 : Configuration de l'URL Backend

### Fichier : `axiosInstance.js`

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
```

**Variables d'environnement** (`.env`) :
```env
# Développement local
REACT_APP_API_URL=http://localhost:3000/api

# Production
REACT_APP_API_URL=https://api.westcoastproperty.com/api
```

---

## Étape 2 : Remplacement des Imports

### Avant (Mock Data)
```javascript
import { ownerProfile, ownerProperties } from '../api/ownerMockData';
import { tenants } from '../api/tenantMockData';
```

### Après (Backend API)
```javascript
import { ownerAPI, tenantAPI } from '../api/backendRoutes';

// Utilisation
const fetchData = async () => {
    const { data: profile } = await ownerAPI.getById(ownerId);
    const { data: properties } = await ownerAPI.getByOwner(ownerId);
    const { data: tenants } = await tenantAPI.getAll();
};
```

---

## Étape 3 : Exemples de Migration

### Exemple 1 : Owner Dashboard

**Avant** :
```javascript
// OwnerDashboardOverview.jsx
import { ownerProfile, financialSummary } from '../api/ownerMockData';

const OwnerDashboardOverview = () => {
    const profile = ownerProfile;
    const finances = financialSummary;
    // ...
};
```

**Après** :
```javascript
// OwnerDashboardOverview.jsx
import { ownerAPI } from '../api/backendRoutes';
import { useState, useEffect } from 'react';

const OwnerDashboardOverview = () => {
    const [profile, setProfile] = useState(null);
    const [finances, setFinances] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ownerId = 1; // Récupérer depuis le contexte auth
                const [profileRes, financesRes] = await Promise.all([
                    ownerAPI.getById(ownerId),
                    ownerAPI.getFinancialReports(ownerId)
                ]);
                setProfile(profileRes.data);
                setFinances(financesRes.data);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Chargement...</div>;
    // ...
};
```

---

### Exemple 2 : Property Assignment

**Avant** :
```javascript
import { assignTenantToProperty } from '../api/services/assignmentService';

// Fonction locale avec mock data
const result = assignTenantToProperty(propertyId, tenantId, leaseData);
```

**Après** :
```javascript
import { assignmentAPI } from '../api/backendRoutes';

// Appel API backend
const handleAssign = async () => {
    try {
        const { data } = await assignmentAPI.assignTenantToProperty(
            propertyId,
            tenantId,
            leaseData
        );
        alert('✅ Locataire assigné !');
    } catch (error) {
        alert('❌ Erreur: ' + error.response?.data?.message);
    }
};
```

---

### Exemple 3 : Apporteur Submissions

**Avant** :
```javascript
// ClientSubmissionForm.jsx
const onSubmit = (data) => {
    console.log('Client submission:', data);
    alert('✅ Client soumis !');
};
```

**Après** :
```javascript
import { apporteurAPI } from '../api/backendRoutes';

const onSubmit = async (data) => {
    try {
        const { data: result } = await apporteurAPI.submitClient(data);
        alert(`✅ Client soumis ! ID: ${result.id}`);
        navigate('/apporteur');
    } catch (error) {
        alert('❌ Erreur: ' + error.response?.data?.message);
    }
};
```

---

## Étape 4 : Gestion des Erreurs

### Intercepteur Axios (déjà configuré)

```javascript
// axiosInstance.js
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Rediriger vers login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
```

### Gestion dans les composants

```javascript
try {
    const { data } = await propertyAPI.create(propertyData);
} catch (error) {
    if (error.response) {
        // Erreur du serveur (4xx, 5xx)
        console.error('Erreur serveur:', error.response.data);
        alert(error.response.data.message);
    } else if (error.request) {
        // Pas de réponse du serveur
        console.error('Pas de réponse:', error.request);
        alert('Impossible de contacter le serveur');
    } else {
        // Erreur de configuration
        console.error('Erreur:', error.message);
    }
}
```

---

## Étape 5 : Upload de Fichiers

### Photos de Biens

```javascript
import { propertyAPI } from '../api/backendRoutes';

const handleUpload = async (propertyId, files) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('photos', file);
    });

    try {
        const { data } = await propertyAPI.uploadPhotos(propertyId, formData);
        alert(`✅ ${data.uploadedCount} photos uploadées`);
    } catch (error) {
        alert('❌ Erreur upload');
    }
};
```

### Documents RIB

```javascript
import { apporteurAPI } from '../api/backendRoutes';

const handleDocumentUpload = async (apporteurId, ribFile, idFile) => {
    const formData = new FormData();
    formData.append('rib', ribFile);
    formData.append('id_card', idFile);

    const { data } = await apporteurAPI.uploadDocuments(apporteurId, formData);
};
```

---

## Étape 6 : Authentification

### Login

```javascript
import { authAPI } from '../api/backendRoutes';

const handleLogin = async (email, password, role) => {
    try {
        const { data } = await authAPI.login(email, password, role);
        
        // Stocker le token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Rediriger
        navigate(redirectMap[data.user.role]);
    } catch (error) {
        setError('Identifiants invalides');
    }
};
```

---

## Résumé des Fichiers à Modifier

| Fichier | Action |
|---------|--------|
| `.env` | Ajouter `REACT_APP_API_URL` |
| `axiosInstance.js` | Déjà configuré ✅ |
| `backendRoutes.js` | **Nouveau fichier créé** ✅ |
| Tous les composants | Remplacer imports mock → API |
| `AuthContext.jsx` | Utiliser `authAPI` |
| Services existants | Remplacer par `backendRoutes` |

---

## Checklist de Migration

- [ ] Configurer `.env` avec URL backend
- [ ] Tester connexion backend (`authAPI.login`)
- [ ] Migrer AuthContext
- [ ] Migrer Owner Dashboard
- [ ] Migrer Tenant Dashboard
- [ ] Migrer Apporteur Dashboard
- [ ] Migrer Admin Dashboard
- [ ] Migrer Property Management
- [ ] Migrer Assignments
- [ ] Tester uploads de fichiers
- [ ] Tester génération de PDF
- [ ] Configurer gestion d'erreurs globale

Le fichier `backendRoutes.js` est **prêt à l'emploi** ! 🚀
