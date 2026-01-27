/**
 * Utility functions for navigating to submission forms
 */

/**
 * Navigate to submission hub with specific tab
 * @param {Function} navigate - React Router navigate function
 * @param {string} tab - Tab to open: 'property' | 'request' | 'referral'
 * @param {Object} params - Additional URL parameters
 */
/**
 * Navigate to property submission form (for owners)
 */
export const navigateToPropertySubmission = (navigate) => {
    navigate('/ajouter-un-bien');
};

/**
 * Navigate to rental/purchase request form (for visitors)
 * @param {Function} navigate
 * @param {string|number} propertyId - Optional property ID to pre-fill form
 */
export const navigateToRequestSubmission = (navigate, propertyId = null) => {
    const path = propertyId ? `/rechercher-un-bien?propertyId=${propertyId}` : '/rechercher-un-bien';
    navigate(path);
};

/**
 * Navigate to business referral form (for partners)
 */
export const navigateToReferralSubmission = (navigate) => {
    navigate('/apporter-des-affaires');
};
