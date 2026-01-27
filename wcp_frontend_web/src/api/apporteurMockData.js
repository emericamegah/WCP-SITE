/**
 * Mock data for Apporteur d'Affaires Dashboard
 */

export const apporteurProfile = {
    id: 101,
    name: "Jean-Pierre Bakayoko",
    email: "jp.bakayoko@partenaire.wcp",
    phone: "+225 01 02 03 04 05",
    role: "apporteur",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JeanPierre",
    totalCommissions: 1250000,
    pendingCommissions: 450000,
    referralsCount: 12,
    bankInfo: {
        bankName: "NSIA Banque CI",
        iban: "CI00 0000 0000 0000 0000 00",
        accountName: "Jean-Pierre Bakayoko",
        verified: true
    }
};

export const apporteurReferrals = [
    {
        id: "REF-001",
        type: "Client Locataire",
        clientName: "Alice Konan",
        submitDate: "2025-01-10",
        status: "validated",
        details: "Recherche un triplex à Cocody"
    },
    {
        id: "REF-002",
        type: "Bien Immobilier",
        clientName: "Villa Bingerville",
        submitDate: "2025-01-15",
        status: "pending",
        details: "Villa 4 pièces neuve"
    },
    {
        id: "REF-003",
        type: "Client Acheteur",
        clientName: "Marc Ondoua",
        submitDate: "2025-01-20",
        status: "rejected",
        details: "Budget insuffisant pour zone 4"
    },
    {
        id: "REF-004",
        type: "Bien Immobilier",
        clientName: "Appartement Plateau",
        submitDate: "2025-01-22",
        status: "pending",
        details: "Bureau open space 200m2"
    }
];

export const apporteurCommissions = [
    {
        id: "COM-2025-001",
        referralId: "REF-001",
        amount: 250000,
        status: "paid",
        date: "2025-01-15",
        description: "Comission Location Villa Alice"
    },
    {
        id: "COM-2025-002",
        referralId: "REF-010", // Previous historical data
        amount: 800000,
        status: "paid",
        date: "2024-12-05",
        description: "Vente Appartement Marcory"
    },
    {
        id: "COM-2025-003",
        referralId: "REF-012",
        amount: 200000,
        status: "pending",
        date: "2025-01-25",
        description: "Mandat Gestion Immeuble"
    }
];

export const getApporteurStats = () => {
    return {
        total: apporteurProfile.totalCommissions,
        pending: apporteurProfile.pendingCommissions,
        count: apporteurProfile.referralsCount,
        successRate: "75%"
    };
};
