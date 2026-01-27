/**
 * Tenant Profile Data
 * Extracted from tenantMockData.json for use in TenantLayout
 */

export const tenantProfile = {
    id: "tenant_001",
    firstName: "Koffi",
    lastName: "N'Goran",
    email: "koffi.ngoran@example.com",
    phone: "+225 05 11 22 33 44",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Koffi",
    role: "tenant",
    property: {
        id: "prop_123",
        address: "Résidence Horizon, Appartement B204, Cocody Riviera"
    },
    currentRent: 450000,
    nextPaymentDate: "2026-02-05",
    paymentStatus: "À jour"
};

export default tenantProfile;
