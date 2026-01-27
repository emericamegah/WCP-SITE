/**
 * Centralized Property Assignment System
 * Normalized data structure for managing relationships between properties, owners, and tenants
 */

// ============================================
// OWNERS
// ============================================
export const owners = [
    {
        id: 1,
        name: "Amadou Traoré",
        email: "amadou.traore@westcoastproperty.com",
        phone: "+225 07 45 67 89 01",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amadou",
        memberSince: "2022-03-15"
    },
    {
        id: 2,
        name: "Fatou Bamba",
        email: "fatou.bamba@westcoastproperty.com",
        phone: "+225 07 12 34 56 78",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou",
        memberSince: "2023-01-10"
    }
];

// ============================================
// TENANTS
// ============================================
export const tenants = [
    {
        id: "tenant_001",
        firstName: "Koffi",
        lastName: "N'Goran",
        email: "koffi.ngoran@example.com",
        phone: "+225 05 11 22 33 44",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Koffi"
    },
    {
        id: "tenant_002",
        firstName: "Jean",
        lastName: "Kouassi",
        email: "jean.k@example.com",
        phone: "+225 07 XX XX XX XX",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean"
    },
    {
        id: "tenant_003",
        firstName: "Marie",
        lastName: "Diallo",
        email: "marie.d@example.com",
        phone: "+225 05 XX XX XX XX",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
    },
    {
        id: "tenant_004",
        firstName: "Paul",
        lastName: "Yao",
        email: "paul.yao@example.com",
        phone: "+225 01 XX XX XX XX",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paul"
    }
];

// ============================================
// PROPERTIES
// ============================================
export const properties = [
    {
        id: 1,
        title: "Villa Moderne Cocody",
        address: "Rue des Cocotiers, Riviera 3",
        city: "Abidjan",
        district: "Cocody",
        type: "villa",
        image: "https://placehold.co/400x300?text=Villa+Cocody",
        monthlyRent: 850000,
        surface: 250,
        rooms: 5,
        bedrooms: 4,
        bathrooms: 3,
        features: ["Piscine", "Jardin", "Parking", "Climatisation"]
    },
    {
        id: 2,
        title: "Appartement 2 Pièces Plateau",
        address: "Avenue Chardy, Immeuble Le Prestige",
        city: "Abidjan",
        district: "Plateau",
        type: "apartment",
        image: "https://placehold.co/400x300?text=Appt+Plateau",
        monthlyRent: 450000,
        surface: 85,
        rooms: 2,
        bedrooms: 1,
        bathrooms: 1,
        features: ["Ascenseur", "Sécurité 24/7", "Parking"]
    },
    {
        id: 3,
        title: "Bureau Commercial Marcory",
        address: "Zone 4, Boulevard VGE",
        city: "Abidjan",
        district: "Marcory",
        type: "office",
        image: "https://placehold.co/400x300?text=Bureau+Marcory",
        monthlyRent: 600000,
        surface: 120,
        rooms: 4,
        bedrooms: 0,
        bathrooms: 2,
        features: ["Climatisation", "Internet Fibre", "Parking"]
    },
    {
        id: 4,
        title: "Studio Étudiant Yopougon",
        address: "Quartier Niangon, Résidence Étoile",
        city: "Abidjan",
        district: "Yopougon",
        type: "apartment",
        image: "https://placehold.co/400x300?text=Studio+Yop",
        monthlyRent: 150000,
        surface: 30,
        rooms: 1,
        bedrooms: 0,
        bathrooms: 1,
        features: ["Meublé", "Eau", "Électricité"]
    },
    {
        id: 5,
        title: "Duplex Luxe Angré",
        address: "Angré 8ème Tranche",
        city: "Abidjan",
        district: "Cocody",
        type: "apartment",
        image: "https://placehold.co/400x300?text=Duplex+Angre",
        monthlyRent: 750000,
        surface: 180,
        rooms: 4,
        bedrooms: 3,
        bathrooms: 2,
        features: ["Terrasse", "Parking", "Sécurité", "Piscine commune"]
    },
    {
        id: 6,
        title: "Terrain Constructible Bingerville",
        address: "Route de Bingerville, Km 12",
        city: "Bingerville",
        district: "Bingerville",
        type: "land",
        image: "https://placehold.co/400x300?text=Terrain+Bing",
        monthlyRent: 0, // Terrain à vendre, pas à louer
        surface: 500,
        rooms: 0,
        bedrooms: 0,
        bathrooms: 0,
        features: ["Titre foncier", "Viabilisé", "Clôturé"]
    },
    {
        id: 7,
        title: "Commerce Zone 4",
        address: "Marcory Zone 4, Face Carrefour",
        city: "Abidjan",
        district: "Marcory",
        type: "commercial",
        image: "https://placehold.co/400x300?text=Commerce+Z4",
        monthlyRent: 900000,
        surface: 200,
        rooms: 3,
        bedrooms: 0,
        bathrooms: 2,
        features: ["Vitrine", "Parking clients", "Climatisation", "Sécurité"]
    }
];

// ============================================
// LEASES (Baux)
// ============================================
export const leases = [
    {
        id: "lease_001",
        propertyId: 1,
        tenantId: "tenant_002",
        startDate: "2024-01-15",
        endDate: "2025-12-31",
        rentAmount: 850000,
        charges: 50000,
        deposit: 1700000,
        status: "active",
        paymentDay: 5 // Jour du mois pour le paiement
    },
    {
        id: "lease_002",
        propertyId: 2,
        tenantId: "tenant_003",
        startDate: "2023-06-01",
        endDate: "2025-05-31",
        rentAmount: 450000,
        charges: 30000,
        deposit: 900000,
        status: "active",
        paymentDay: 1
    },
    {
        id: "lease_003",
        propertyId: 3,
        tenantId: "tenant_004",
        startDate: "2024-03-01",
        endDate: "2026-02-28",
        rentAmount: 600000,
        charges: 40000,
        deposit: 1200000,
        status: "active",
        paymentDay: 10
    },
    {
        id: "lease_004",
        propertyId: 5,
        tenantId: "tenant_001",
        startDate: "2024-01-01",
        endDate: "2025-12-31",
        rentAmount: 750000,
        charges: 50000,
        deposit: 1500000,
        status: "active",
        paymentDay: 5
    }
];

// ============================================
// PROPERTY ASSIGNMENTS
// ============================================
export const propertyAssignments = [
    {
        id: 1,
        propertyId: 1,
        ownerId: 1,
        tenantId: "tenant_002",
        leaseId: "lease_001",
        status: "occupied",
        assignedDate: "2024-01-15",
        notes: "Locataire fiable, paiements toujours à jour"
    },
    {
        id: 2,
        propertyId: 2,
        ownerId: 1,
        tenantId: "tenant_003",
        leaseId: "lease_002",
        status: "occupied",
        assignedDate: "2023-06-01",
        notes: ""
    },
    {
        id: 3,
        propertyId: 3,
        ownerId: 1,
        tenantId: "tenant_004",
        leaseId: "lease_003",
        status: "occupied",
        assignedDate: "2024-03-01",
        notes: "Entreprise, bail commercial"
    },
    {
        id: 4,
        propertyId: 4,
        ownerId: 1,
        tenantId: null,
        leaseId: null,
        status: "vacant",
        assignedDate: "2024-01-01",
        notes: "Disponible immédiatement"
    },
    {
        id: 5,
        propertyId: 5,
        ownerId: 1,
        tenantId: "tenant_001",
        leaseId: "lease_004",
        status: "occupied",
        assignedDate: "2024-01-01",
        notes: ""
    },
    {
        id: 6,
        propertyId: 6,
        ownerId: 2,
        tenantId: null,
        leaseId: null,
        status: "for_sale",
        assignedDate: "2023-11-01",
        notes: "Terrain à vendre uniquement"
    },
    {
        id: 7,
        propertyId: 7,
        ownerId: 1,
        tenantId: null,
        leaseId: null,
        status: "vacant",
        assignedDate: "2024-02-01",
        notes: "En cours de rénovation"
    }
];

// ============================================
// ASSIGNMENT HISTORY (Historique)
// ============================================
export const assignmentHistory = [
    {
        id: 1,
        propertyId: 4,
        ownerId: 1,
        tenantId: "tenant_005", // Ancien locataire
        leaseId: "lease_old_001",
        status: "terminated",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        terminationReason: "Fin de bail normale",
        terminationDate: "2023-12-31"
    }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all properties owned by a specific owner
 */
export const getPropertiesByOwner = (ownerId) => {
    const ownerAssignments = propertyAssignments.filter(a => a.ownerId === ownerId);
    return ownerAssignments.map(assignment => {
        const property = properties.find(p => p.id === assignment.propertyId);
        const tenant = assignment.tenantId ? tenants.find(t => t.id === assignment.tenantId) : null;
        const lease = assignment.leaseId ? leases.find(l => l.id === assignment.leaseId) : null;

        return {
            ...property,
            assignment,
            tenant,
            lease
        };
    });
};

/**
 * Get property details for a specific tenant
 */
export const getPropertyByTenant = (tenantId) => {
    const assignment = propertyAssignments.find(a => a.tenantId === tenantId && a.status === 'occupied');
    if (!assignment) return null;

    const property = properties.find(p => p.id === assignment.propertyId);
    const owner = owners.find(o => o.id === assignment.ownerId);
    const lease = leases.find(l => l.id === assignment.leaseId);

    return {
        ...property,
        owner,
        lease,
        assignment
    };
};

/**
 * Get all vacant properties
 */
export const getVacantProperties = () => {
    return propertyAssignments
        .filter(a => a.status === 'vacant')
        .map(assignment => {
            const property = properties.find(p => p.id === assignment.propertyId);
            const owner = owners.find(o => o.id === assignment.ownerId);
            return { ...property, owner, assignment };
        });
};

/**
 * Get assignment history for a property
 */
export const getAssignmentHistory = (propertyId) => {
    return assignmentHistory
        .filter(h => h.propertyId === propertyId)
        .map(history => {
            const tenant = tenants.find(t => t.id === history.tenantId);
            return { ...history, tenant };
        });
};
