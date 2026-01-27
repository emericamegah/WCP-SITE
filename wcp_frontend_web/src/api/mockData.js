export const mockProperties = [
    {
        _id: '65b2f1a1e4b0a1a1a1a1a1a1',
        title: 'Villa Contemporaine',
        price: '1 250 000 €',
        location: 'Biarritz',
        status: 'sale',
        bedrooms: 5,
        area: '250 m²',
        image: 'https://placehold.co/600x400?text=Villa',
        address: '15 Avenue de la Plage, Biarritz',
        description: `Découvrez cette sublime villa d'architecte située dans l'un des quartiers les plus prisés de Biarritz. Avec ses lignes épurées et ses grands volumes, cette propriété offre un cadre de vie exceptionnel.
        
        Le vaste séjour cathédrale de 80m² baigné de lumière s'ouvre sur une terrasse panoramique et une piscine à débordement chauffée. La cuisine américaine haut de gamme est entièrement équipée.
        
        L'espace nuit se compose d'une suite parentale avec dressing et salle de bain privative, ainsi que de 4 autres chambres spacieuses. 
        Un garage double et un jardin paysager complette ce bien d'exception.`,
        amenities: [
            'Piscine à débordement chauffée',
            'Vue Océan panoramique',
            'Garage double sécurisé',
            'Domotique intégrale',
            'Climatisation réversible',
            'Jardin paysager 1200m²'
        ],
        images: [
            'https://placehold.co/1200x800?text=Vue+Piscine',
            'https://placehold.co/800x600?text=Salon',
            'https://placehold.co/800x600?text=Cuisine',
            'https://placehold.co/800x600?text=Suite+Parentale'
        ],
        features: [
            { icon: 'Maximize', label: 'Surface', value: '250 m²' },
            { icon: 'Bed', label: 'Chambres', value: '5' },
            { icon: 'Bath', label: 'Salles de bain', value: '3' },
            { icon: 'Zap', label: 'DPE', value: 'A' },
        ]
    },
    {
        _id: '65b2f1a1e4b0a1a1a1a1a1a2',
        title: 'Appartement Vue Mer',
        price: '450 000 €',
        location: 'Anglet',
        status: 'sale',
        bedrooms: 2,
        area: '75 m²',
        image: 'https://placehold.co/600x400?text=Appartement',
        address: '5 Rue du Phare, Anglet',
        description: 'Superbe appartement T3 avec vue imprenable sur l\'océan.',
        amenities: ['Vue Mer', 'Parking', 'Ascenseur'],
        images: ['https://placehold.co/800x600?text=Vue+Mer'],
        features: [
            { icon: 'Maximize', label: 'Surface', value: '75 m²' },
            { icon: 'Bed', label: 'Chambres', value: '2' },
            { icon: 'Bath', label: 'Salles de bain', value: '1' },
            { icon: 'Zap', label: 'DPE', value: 'C' },
        ]
    },
    {
        _id: '65b2f1a1e4b0a1a1a1a1a1a3',
        title: 'Loft Industriel',
        price: '2 800 €/mois',
        location: 'Bordeaux',
        status: 'rent',
        bedrooms: 3,
        area: '120 m²',
        image: 'https://placehold.co/600x400?text=Loft',
        address: 'Quai des Chartrons, Bordeaux',
        description: 'Magnifique loft dans un ancien chai réhabilité.',
        amenities: ['Hauteur sous plafond', 'Cuisine équipée', 'Proche Tram'],
        images: ['https://placehold.co/800x600?text=Loft+Interior'],
        features: [
            { icon: 'Maximize', label: 'Surface', value: '120 m²' },
            { icon: 'Bed', label: 'Chambres', value: '3' },
            { icon: 'Bath', label: 'Salles de bain', value: '2' },
            { icon: 'Zap', label: 'DPE', value: 'B' },
        ]
    },
    {
        _id: '65b2f1a1e4b0a1a1a1a1a1a4',
        title: 'Maison Basque',
        price: '890 000 €',
        location: 'Saint-Jean-de-Luz',
        status: 'sale',
        bedrooms: 4,
        area: '180 m²',
        image: 'https://placehold.co/600x400?text=Maison',
        address: 'Chemin de Chantaco, Saint-Jean-de-Luz',
        description: 'Authentique maison basque rénovée avec goût.',
        amenities: ['Cheminée', 'Jardin clos', 'Garage'],
        images: ['https://placehold.co/800x600?text=Maison+Exterieur'],
        features: [
            { icon: 'Maximize', label: 'Surface', value: '180 m²' },
            { icon: 'Bed', label: 'Chambres', value: '4' },
            { icon: 'Bath', label: 'Salles de bain', value: '2' },
            { icon: 'Zap', label: 'DPE', value: 'D' },
        ]
    },
    {
        _id: '65b2f1a1e4b0a1a1a1a1a1a5',
        title: 'Bureau Centre',
        price: '320 000 €',
        location: 'Bayonne',
        status: 'sale',
        bedrooms: 0,
        area: '90 m²',
        image: 'https://placehold.co/600x400?text=Bureau',
        address: 'Allées Marines, Bayonne',
        description: 'Plateau de bureaux lumineux proche du centre ville.',
        amenities: ['Fibre optique', 'Climatisation', 'Accès PMR'],
        images: ['https://placehold.co/800x600?text=Open+Space'],
        features: [
            { icon: 'Maximize', label: 'Surface', value: '90 m²' },
            { icon: 'Bed', label: 'Bureaux', value: '3' },
            { icon: 'Bath', label: 'WC', value: '2' },
            { icon: 'Zap', label: 'DPE', value: 'B' },
        ]
    },
    {
        _id: '65b2f1a1e4b0a1a1a1a1a1a6',
        title: 'Villa Piscine',
        price: '2 100 000 €',
        location: 'Hossegor',
        status: 'sale',
        bedrooms: 6,
        area: '320 m²',
        image: 'https://placehold.co/600x400?text=Luxe',
        address: 'Avenue du Golf, Hossegor',
        description: 'Villa de luxe au bord du golf d\'Hossegor.',
        amenities: ['Piscine', 'Golf', 'Cinéma'],
        images: ['https://placehold.co/800x600?text=Villa+Luxe'],
        features: [
            { icon: 'Maximize', label: 'Surface', value: '320 m²' },
            { icon: 'Bed', label: 'Chambres', value: '6' },
            { icon: 'Bath', label: 'Salles de bain', value: '5' },
            { icon: 'Zap', label: 'DPE', value: 'A' },
        ]
    }
];

export const mockServices = [
    {
        id: 1,
        icon: 'Key',
        title: 'Gestion Locative',
        description: 'Maximisez vos revenus locatifs sans les contraintes. Nous prenons en charge la gestion complète de votre bien.',
        benefits: [
            'Suivi rigoureux des loyers et charges',
            'Gestion des impayés et contentieux',
            'Rapports de gestion mensuels détaillés',
            'Maintenance et suivi des travaux'
        ]
    },
    {
        id: 2,
        icon: 'Home',
        title: 'Vente & Achat',
        description: 'Une stratégie commerciale efficace pour vendre au meilleur prix ou trouver la perle rare sur le marché.',
        benefits: [
            'Estimation précise au prix du marché',
            'Photos HD et visites virtuelles',
            'Diffusion sur les portails premium',
            'Accompagnement juridique jusqu\'à la signature'
        ]
    },
    {
        id: 3,
        icon: 'TrendingUp',
        title: 'Estimation & Conseil',
        description: 'Bénéficiez d\'une expertise locale pointue pour valoriser votre patrimoine immobilier.',
        benefits: [
            'Analyse comparative du marché',
            'Étude de rentabilité locative',
            'Conseils en défiscalisation',
            'Valorisation foncière'
        ]
    }
];

export const mockValidations = [
    {
        id: 101,
        type: 'Partenariat',
        submitter: 'Agence ImmoSud',
        date: '23 Jan 2026',
        status: 'pending',
        clientName: 'Sophie Martin',
        clientEmail: 'sophie.martin@email.com',
        clientPhone: '06 12 34 56 78',
        details: 'Proposition de partenariat pour la gestion exclusive de 5 biens sur la côte basque. Contrat type standard avec clause de préférence.',
        documents: ['contrat_draft_v1.pdf', 'kbis_agence.pdf']
    },
    {
        id: 102,
        type: 'Estimation',
        submitter: 'Jean Dupont',
        date: '22 Jan 2026',
        status: 'pending',
        clientName: 'Pierre Durand',
        clientEmail: 'p.durand@test.fr',
        clientPhone: '07 98 76 54 32',
        details: 'Demande d\'estimation pour une maison T4 à Anglet. Le client souhaite vendre rapidement pour cause de mutation professionnelle.',
        documents: ['photos_bien.zip', 'titre_propiete.pdf']
    },
    {
        id: 103,
        type: 'Vente',
        submitter: 'Notaire Lefebvre',
        date: '20 Jan 2026',
        status: 'processing',
        clientName: 'SCI Horizon',
        clientEmail: 'contact@sci-horizon.com',
        clientPhone: '05 59 00 00 00',
        details: 'Dossier de vente complet pour le terrain constructible "Les Chênes". Attente de validation urbanisme.',
        documents: ['compromis_signe.pdf', 'urbanisme.pdf']
    },
    {
        id: 104,
        type: 'Location',
        submitter: 'Sci Les Pins',
        date: '19 Jan 2026',
        status: 'validated',
        clientName: 'Marie Curieux',
        clientEmail: 'marie.c@email.com',
        clientPhone: '06 00 11 22 33',
        details: 'Dossier locataire validé par la garantie loyers impayés. Bail prêt à signer.',
        documents: ['dossier_locataire.pdf', 'garantie.pdf']
    },
    {
        id: 105,
        type: 'Partenariat',
        submitter: 'Architecte Vo',
        date: '18 Jan 2026',
        status: 'rejected',
        clientName: 'Luc Vo',
        clientEmail: 'luc@vo-archi.com',
        clientPhone: '06 99 88 77 66',
        details: 'Proposition de rénovation avant vente. Rejeté car hors budget prévisionnel.',
        documents: ['devis_travaux.pdf']
    },
];
