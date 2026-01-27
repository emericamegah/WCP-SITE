/**
 * CENTRALIZED API ROUTES - WEST COAST PROPERTY
 * 
 * Ce fichier regroupe TOUTES les routes API backend.
 * Pour passer des données fictives au backend réel :
 * 1. Configurez BASE_URL dans axiosInstance.js
 * 2. Remplacez les imports de mockData par ce fichier
 * 3. Toutes les fonctions retournent des Promises avec Axios
 */

import api from './axiosInstance';

// ============================================
// AUTHENTICATION
// ============================================

export const authAPI = {
    /**
     * Connexion utilisateur
     * @param {string} email 
     * @param {string} password 
     * @param {string} role 
     */
    login: (email, password, role) => {
        return api.post('/auth/login', { email, password, role });
    },

    /**
     * Déconnexion
     */
    logout: () => {
        return api.post('/auth/logout');
    },

    /**
     * Récupérer l'utilisateur connecté
     */
    getCurrentUser: () => {
        return api.get('/auth/me');
    },

    /**
     * Rafraîchir le token
     */
    refreshToken: () => {
        return api.post('/auth/refresh');
    },

    /**
     * Réinitialisation mot de passe
     */
    resetPassword: (email) => {
        return api.post('/auth/reset-password', { email });
    }
};

// ============================================
// PROPERTIES (BIENS IMMOBILIERS)
// ============================================

export const propertyAPI = {
    /**
     * Récupérer tous les biens
     * @param {object} filters - Filtres optionnels (type, ville, prix, etc.)
     */
    getAll: (filters = {}) => {
        return api.get('/properties', { params: filters });
    },

    /**
     * Récupérer un bien par ID
     */
    getById: (id) => {
        return api.get(`/properties/${id}`);
    },

    /**
     * Créer un nouveau bien
     */
    create: (propertyData) => {
        return api.post('/properties', propertyData);
    },

    /**
     * Mettre à jour un bien
     */
    update: (id, propertyData) => {
        return api.put(`/properties/${id}`, propertyData);
    },

    /**
     * Supprimer un bien
     */
    delete: (id) => {
        return api.delete(`/properties/${id}`);
    },

    /**
     * Récupérer les biens d'un propriétaire
     */
    getByOwner: (ownerId) => {
        return api.get(`/properties/owner/${ownerId}`);
    },

    /**
     * Récupérer les biens vacants
     */
    getVacant: () => {
        return api.get('/properties/vacant');
    },

    /**
     * Upload photos d'un bien
     */
    uploadPhotos: (propertyId, formData) => {
        return api.post(`/properties/${propertyId}/photos`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};

// ============================================
// OWNERS (PROPRIÉTAIRES)
// ============================================

export const ownerAPI = {
    /**
     * Récupérer tous les propriétaires
     */
    getAll: () => {
        return api.get('/owners');
    },

    /**
     * Récupérer un propriétaire par ID
     */
    getById: (id) => {
        return api.get(`/owners/${id}`);
    },

    /**
     * Créer un propriétaire
     */
    create: (ownerData) => {
        return api.post('/owners', ownerData);
    },

    /**
     * Mettre à jour un propriétaire
     */
    update: (id, ownerData) => {
        return api.put(`/owners/${id}`, ownerData);
    },

    /**
     * Récupérer les statistiques d'un propriétaire
     */
    getStats: (id) => {
        return api.get(`/owners/${id}/stats`);
    },

    /**
     * Récupérer les rapports financiers
     */
    getFinancialReports: (id, params = {}) => {
        return api.get(`/owners/${id}/finances`, { params });
    }
};

// ============================================
// TENANTS (LOCATAIRES)
// ============================================

export const tenantAPI = {
    /**
     * Récupérer tous les locataires
     */
    getAll: () => {
        return api.get('/tenants');
    },

    /**
     * Récupérer un locataire par ID
     */
    getById: (id) => {
        return api.get(`/tenants/${id}`);
    },

    /**
     * Créer un locataire
     */
    create: (tenantData) => {
        return api.post('/tenants', tenantData);
    },

    /**
     * Mettre à jour un locataire
     */
    update: (id, tenantData) => {
        return api.put(`/tenants/${id}`, tenantData);
    },

    /**
     * Récupérer les locataires disponibles (sans bail actif)
     */
    getAvailable: () => {
        return api.get('/tenants/available');
    },

    /**
     * Récupérer les documents d'un locataire
     */
    getDocuments: (id) => {
        return api.get(`/tenants/${id}/documents`);
    },

    /**
     * Récupérer les quittances de loyer
     */
    getReceipts: (id) => {
        return api.get(`/tenants/${id}/receipts`);
    }
};

// ============================================
// LEASES (BAUX)
// ============================================

export const leaseAPI = {
    /**
     * Récupérer tous les baux
     */
    getAll: () => {
        return api.get('/leases');
    },

    /**
     * Récupérer un bail par ID
     */
    getById: (id) => {
        return api.get(`/leases/${id}`);
    },

    /**
     * Créer un bail
     */
    create: (leaseData) => {
        return api.post('/leases', leaseData);
    },

    /**
     * Mettre à jour un bail
     */
    update: (id, leaseData) => {
        return api.put(`/leases/${id}`, leaseData);
    },

    /**
     * Terminer un bail
     */
    terminate: (id, reason) => {
        return api.post(`/leases/${id}/terminate`, { reason });
    },

    /**
     * Récupérer les baux actifs
     */
    getActive: () => {
        return api.get('/leases/active');
    },

    /**
     * Upload contrat de bail
     */
    uploadContract: (leaseId, formData) => {
        return api.post(`/leases/${leaseId}/contract`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};

// ============================================
// ASSIGNMENTS (ASSIGNEMENTS)
// ============================================

export const assignmentAPI = {
    /**
     * Récupérer tous les assignements
     */
    getAll: () => {
        return api.get('/assignments');
    },

    /**
     * Assigner un bien à un propriétaire
     */
    assignPropertyToOwner: (propertyId, ownerId) => {
        return api.post('/assignments/property-to-owner', { propertyId, ownerId });
    },

    /**
     * Assigner un locataire à un bien (créer bail)
     */
    assignTenantToProperty: (propertyId, tenantId, leaseData) => {
        return api.post('/assignments/tenant-to-property', {
            propertyId,
            tenantId,
            leaseData
        });
    },

    /**
     * Libérer un bien (éviction)
     */
    evictTenant: (propertyId, tenantId, reason) => {
        return api.post('/assignments/evict', { propertyId, tenantId, reason });
    },

    /**
     * Récupérer l'historique des assignements
     */
    getHistory: (propertyId) => {
        return api.get(`/assignments/history/${propertyId}`);
    }
};

// ============================================
// APPORTEURS (BUSINESS REFERRALS)
// ============================================

export const apporteurAPI = {
    /**
     * Récupérer le profil de l'apporteur
     */
    getProfile: (id) => {
        return api.get(`/apporteurs/${id}`);
    },

    /**
     * Soumettre un client
     */
    submitClient: (clientData) => {
        return api.post('/apporteurs/submit-client', clientData);
    },

    /**
     * Soumettre un bien
     */
    submitProperty: (propertyData) => {
        return api.post('/apporteurs/submit-property', propertyData);
    },

    /**
     * Récupérer les apports d'un apporteur
     */
    getReferrals: (apporteurId) => {
        return api.get(`/apporteurs/${apporteurId}/referrals`);
    },

    /**
     * Récupérer les commissions
     */
    getCommissions: (apporteurId) => {
        return api.get(`/apporteurs/${apporteurId}/commissions`);
    },

    /**
     * Mettre à jour le profil (RIB)
     */
    updateProfile: (id, profileData) => {
        return api.put(`/apporteurs/${id}/profile`, profileData);
    },

    /**
     * Upload documents (RIB, CNI)
     */
    uploadDocuments: (id, formData) => {
        return api.post(`/apporteurs/${id}/documents`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};

// ============================================
// VALIDATIONS
// ============================================

export const validationAPI = {
    /**
     * Récupérer la file d'attente de validation
     */
    getQueue: () => {
        return api.get('/validations/queue');
    },

    /**
     * Valider un dossier
     */
    validate: (id) => {
        return api.post(`/validations/${id}/validate`);
    },

    /**
     * Rejeter un dossier
     */
    reject: (id, reason) => {
        return api.post(`/validations/${id}/reject`, { reason });
    },

    /**
     * Récupérer l'historique des validations
     */
    getHistory: () => {
        return api.get('/validations/history');
    }
};

// ============================================
// MAINTENANCE
// ============================================

export const maintenanceAPI = {
    /**
     * Récupérer toutes les demandes de maintenance
     */
    getAll: () => {
        return api.get('/maintenance');
    },

    /**
     * Créer une demande de maintenance
     */
    create: (maintenanceData) => {
        return api.post('/maintenance', maintenanceData);
    },

    /**
     * Mettre à jour le statut
     */
    updateStatus: (id, status) => {
        return api.patch(`/maintenance/${id}/status`, { status });
    },

    /**
     * Upload photos pour une demande
     */
    uploadPhotos: (id, formData) => {
        return api.post(`/maintenance/${id}/photos`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};

// ============================================
// PAYMENTS (PAIEMENTS)
// ============================================

export const paymentAPI = {
    /**
     * Récupérer tous les paiements
     */
    getAll: (filters = {}) => {
        return api.get('/payments', { params: filters });
    },

    /**
     * Créer un paiement
     */
    create: (paymentData) => {
        return api.post('/payments', paymentData);
    },

    /**
     * Récupérer les paiements d'un locataire
     */
    getByTenant: (tenantId) => {
        return api.get(`/payments/tenant/${tenantId}`);
    },

    /**
     * Récupérer les paiements d'un propriétaire
     */
    getByOwner: (ownerId) => {
        return api.get(`/payments/owner/${ownerId}`);
    },

    /**
     * Générer une quittance
     */
    generateReceipt: (paymentId) => {
        return api.get(`/payments/${paymentId}/receipt`, {
            responseType: 'blob'
        });
    }
};

// ============================================
// DOCUMENTS
// ============================================

export const documentAPI = {
    /**
     * Upload un document
     */
    upload: (formData) => {
        return api.post('/documents/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    /**
     * Télécharger un document
     */
    download: (documentId) => {
        return api.get(`/documents/${documentId}/download`, {
            responseType: 'blob'
        });
    },

    /**
     * Supprimer un document
     */
    delete: (documentId) => {
        return api.delete(`/documents/${documentId}`);
    }
};

// ============================================
// STATISTICS & REPORTS
// ============================================

export const statsAPI = {
    /**
     * Dashboard global (admin)
     */
    getGlobalStats: () => {
        return api.get('/stats/global');
    },

    /**
     * Statistiques propriétaire
     */
    getOwnerStats: (ownerId) => {
        return api.get(`/stats/owner/${ownerId}`);
    },

    /**
     * Statistiques apporteur
     */
    getApporteurStats: (apporteurId) => {
        return api.get(`/stats/apporteur/${apporteurId}`);
    },

    /**
     * Rapport financier
     */
    getFinancialReport: (params = {}) => {
        return api.get('/stats/financial-report', { params });
    },

    /**
     * Export données (CSV/Excel)
     */
    exportData: (type, params = {}) => {
        return api.get(`/stats/export/${type}`, {
            params,
            responseType: 'blob'
        });
    }
};

// ============================================
// USERS (GESTION UTILISATEURS - ADMIN)
// ============================================

export const userAPI = {
    /**
     * Récupérer tous les utilisateurs
     */
    getAll: () => {
        return api.get('/users');
    },

    /**
     * Créer un utilisateur
     */
    create: (userData) => {
        return api.post('/users', userData);
    },

    /**
     * Mettre à jour un utilisateur
     */
    update: (id, userData) => {
        return api.put(`/users/${id}`, userData);
    },

    /**
     * Supprimer un utilisateur
     */
    delete: (id) => {
        return api.delete(`/users/${id}`);
    },

    /**
     * Changer le rôle
     */
    changeRole: (id, role) => {
        return api.patch(`/users/${id}/role`, { role });
    },

    /**
     * Activer/Désactiver un compte
     */
    toggleStatus: (id) => {
        return api.patch(`/users/${id}/toggle-status`);
    }
};

// ============================================
// NOTIFICATIONS
// ============================================

export const notificationAPI = {
    /**
     * Récupérer les notifications
     */
    getAll: () => {
        return api.get('/notifications');
    },

    /**
     * Marquer comme lu
     */
    markAsRead: (id) => {
        return api.patch(`/notifications/${id}/read`);
    },

    /**
     * Marquer toutes comme lues
     */
    markAllAsRead: () => {
        return api.patch('/notifications/read-all');
    },

    /**
     * Supprimer une notification
     */
    delete: (id) => {
        return api.delete(`/notifications/${id}`);
    }
};

// ============================================
// EXPORT PAR DÉFAUT
// ============================================

export default {
    auth: authAPI,
    properties: propertyAPI,
    owners: ownerAPI,
    tenants: tenantAPI,
    leases: leaseAPI,
    assignments: assignmentAPI,
    apporteurs: apporteurAPI,
    validations: validationAPI,
    maintenance: maintenanceAPI,
    payments: paymentAPI,
    documents: documentAPI,
    stats: statsAPI,
    users: userAPI,
    notifications: notificationAPI
};
