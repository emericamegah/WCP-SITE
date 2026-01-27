/**
 * Mock data for Owner Dashboard
 */

export const ownerProfile = {
    id: 1,
    name: "Amadou Traoré",
    email: "amadou.traore@westcoastproperty.com",
    phone: "+225 07 45 67 89 01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amadou",
    propertiesCount: 7,
    totalPortfolioValue: 450000000, // FCFA
    memberSince: "2022-03-15"
};

export const financialSummary = {
    currentMonth: {
        month: "Janvier 2026",
        grossRevenue: 2850000,      // Revenus bruts
        charges: 450000,             // Charges
        managementFees: 285000,      // Frais de gestion (10%)
        netRevenue: 2115000,         // Revenu net
        trends: {
            revenue: { value: "+5.2%", direction: "up" },
            charges: { value: "+2.1%", direction: "up" },
            net: { value: "+6.8%", direction: "up" }
        }
    },
    yearlyRevenue: [
        { month: "Jan", revenue: 2400000, charges: 420000, net: 1740000 },
        { month: "Fév", revenue: 2450000, charges: 430000, net: 1775000 },
        { month: "Mar", revenue: 2500000, charges: 440000, net: 1810000 },
        { month: "Avr", revenue: 2550000, charges: 445000, net: 1857500 },
        { month: "Mai", revenue: 2600000, charges: 448000, net: 1892000 },
        { month: "Jun", revenue: 2650000, charges: 450000, net: 1935000 },
        { month: "Jul", revenue: 2700000, charges: 452000, net: 1973000 },
        { month: "Aoû", revenue: 2750000, charges: 455000, net: 2017500 },
        { month: "Sep", revenue: 2800000, charges: 458000, net: 2059000 },
        { month: "Oct", revenue: 2820000, charges: 460000, net: 2088000 },
        { month: "Nov", revenue: 2840000, charges: 458000, net: 2117800 },
        { month: "Déc", revenue: 2850000, charges: 450000, net: 2115000 },
    ]
};

export const ownerProperties = [
    {
        id: 1,
        title: "Villa Moderne Cocody",
        address: "Rue des Cocotiers, Riviera 3",
        city: "Abidjan",
        district: "Cocody",
        type: "villa",
        status: "loué",
        image: "https://placehold.co/400x300?text=Villa+Cocody",
        monthlyRent: 850000,
        surface: 250,
        rooms: 5,
        bedrooms: 4,
        tenant: {
            name: "Jean Kouassi",
            phone: "+225 07 XX XX XX XX",
            email: "jean.k@example.com",
            leaseStart: "2024-01-15",
            leaseEnd: "2025-12-31",
            paymentStatus: "À jour"
        },
        maintenanceHistory: [
            {
                id: 1,
                date: "2024-11-15",
                type: "Plomberie",
                description: "Réparation fuite salle de bain",
                cost: 75000,
                status: "Terminé"
            },
            {
                id: 2,
                date: "2024-09-20",
                type: "Électricité",
                description: "Remplacement tableau électrique",
                cost: 150000,
                status: "Terminé"
            }
        ]
    },
    {
        id: 2,
        title: "Appartement 2 Pièces Plateau",
        address: "Avenue Chardy, Immeuble Le Prestige",
        city: "Abidjan",
        district: "Plateau",
        type: "apartment",
        status: "loué",
        image: "https://placehold.co/400x300?text=Appt+Plateau",
        monthlyRent: 450000,
        surface: 85,
        rooms: 2,
        bedrooms: 1,
        tenant: {
            name: "Marie Diallo",
            phone: "+225 05 XX XX XX XX",
            email: "marie.d@example.com",
            leaseStart: "2023-06-01",
            leaseEnd: "2025-05-31",
            paymentStatus: "À jour"
        },
        maintenanceHistory: []
    },
    {
        id: 3,
        title: "Bureau Commercial Marcory",
        address: "Zone 4, Boulevard VGE",
        city: "Abidjan",
        district: "Marcory",
        type: "office",
        status: "loué",
        image: "https://placehold.co/400x300?text=Bureau+Marcory",
        monthlyRent: 600000,
        surface: 120,
        rooms: 4,
        bedrooms: 0,
        tenant: {
            name: "SARL TechConnect",
            phone: "+225 27 XX XX XX XX",
            email: "contact@techconnect.ci",
            leaseStart: "2022-09-01",
            leaseEnd: "2026-08-31",
            paymentStatus: "À jour"
        },
        maintenanceHistory: [
            {
                id: 3,
                date: "2024-10-05",
                type: "Climatisation",
                description: "Entretien annuel climatiseurs",
                cost: 120000,
                status: "Terminé"
            }
        ]
    },
    {
        id: 4,
        title: "Villa avec Piscine Deux Plateaux",
        address: "Rue Princesse, Vallon",
        city: "Abidjan",
        district: "Cocody",
        type: "villa",
        status: "vacant",
        image: "https://placehold.co/400x300?text=Villa+Piscine",
        monthlyRent: 1200000,
        surface: 350,
        rooms: 7,
        bedrooms: 5,
        tenant: null,
        maintenanceHistory: [
            {
                id: 4,
                date: "2025-01-10",
                type: "Piscine",
                description: "Nettoyage et traitement eau",
                cost: 85000,
                status: "En cours"
            }
        ]
    },
    {
        id: 5,
        title: "Appartement Standing Angré",
        address: "7ème Tranche, Résidence Les Lauriers",
        city: "Abidjan",
        district: "Cocody",
        type: "apartment",
        status: "loué",
        image: "https://placehold.co/400x300?text=Appt+Angre",
        monthlyRent: 550000,
        surface: 110,
        rooms: 3,
        bedrooms: 2,
        tenant: {
            name: "Ibrahim Sanogo",
            phone: "+225 07 XX XX XX XX",
            email: "ibrahim.s@example.com",
            leaseStart: "2024-03-01",
            leaseEnd: "2026-02-28",
            paymentStatus: "À jour"
        },
        maintenanceHistory: []
    },
    {
        id: 6,
        title: "Local Commercial Adjamé",
        address: "Marché Gouro, Rue du Commerce",
        city: "Abidjan",
        district: "Adjamé",
        type: "commercial",
        status: "maintenance",
        image: "https://placehold.co/400x300?text=Commerce+Adjame",
        monthlyRent: 380000,
        surface: 65,
        rooms: 2,
        bedrooms: 0,
        tenant: null,
        maintenanceHistory: [
            {
                id: 5,
                date: "2025-01-15",
                type: "Rénovation",
                description: "Réfection complète (peinture, sols)",
                cost: 450000,
                status: "En cours"
            }
        ]
    },
    {
        id: 7,
        title: "Duplex Moderne Bingerville",
        address: "Quartier Résidentiel, Allée des Hibiscus",
        city: "Bingerville",
        district: "Bingerville",
        type: "apartment",
        status: "loué",
        image: "https://placehold.co/400x300?text=Duplex+Bingerville",
        monthlyRent: 420000,
        surface: 140,
        rooms: 4,
        bedrooms: 3,
        tenant: {
            name: "Fatou Camara",
            phone: "+225 01 XX XX XX XX",
            email: "fatou.c@example.com",
            leaseStart: "2023-11-01",
            leaseEnd: "2025-10-31",
            paymentStatus: "À jour"
        },
        maintenanceHistory: []
    }
];

export const ownerNotifications = [
    {
        id: 1,
        type: "warning",
        title: "Bail arrivant à échéance",
        message: "Villa Cocody - Renouvellement à prévoir dans 60 jours",
        date: "2025-03-24",
        propertyId: 1,
        isRead: false,
        priority: "high"
    },
    {
        id: 2,
        type: "warning",
        title: "Bail arrivant à échéance",
        message: "Duplex Bingerville - Renouvellement à prévoir dans 90 jours",
        date: "2025-04-24",
        propertyId: 7,
        isRead: false,
        priority: "medium"
    },
    {
        id: 3,
        type: "info",
        title: "Maintenance planifiée",
        message: "Local Commercial Adjamé - Rénovation en cours",
        date: "2025-01-15",
        propertyId: 6,
        isRead: true,
        priority: "low"
    },
    {
        id: 4,
        type: "danger",
        title: "Bien vacant",
        message: "Villa avec Piscine - Vacant depuis 45 jours",
        date: "2024-12-10",
        propertyId: 4,
        isRead: false,
        priority: "high"
    },
    {
        id: 5,
        type: "info",
        title: "Paiement reçu",
        message: "Appartement Plateau - Loyer de Janvier payé",
        date: "2026-01-05",
        propertyId: 2,
        isRead: true,
        priority: "low"
    }
];

// Helper functions
export const getPropertyById = (id) => {
    return ownerProperties.find(p => p.id === parseInt(id));
};

export const getOccupancyRate = () => {
    const occupied = ownerProperties.filter(p => p.status === 'loué').length;
    return Math.round((occupied / ownerProperties.length) * 100);
};

export const getTotalMonthlyRevenue = () => {
    return ownerProperties
        .filter(p => p.status === 'loué')
        .reduce((sum, p) => sum + p.monthlyRent, 0);
};

export const getUnreadNotifications = () => {
    return ownerNotifications.filter(n => !n.isRead).length;
};
