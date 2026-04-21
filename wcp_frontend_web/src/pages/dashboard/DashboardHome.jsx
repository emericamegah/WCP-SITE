import React from 'react';
import StatCard from '../../components/molecules/StatCard';
import ValidationQueue from '../../components/organisms/ValidationQueue';
import MaintenanceManager from '../../components/organisms/MaintenanceManager';
import ContractMonitor from '../../components/organisms/ContractMonitor';
import { Button } from '../../components/ui/button';
import Icon from '../../components/atoms/Icon';

const DashboardHome = () => {
    const pendingItems = [
        { id: 101, type: 'Partenariat', submitter: 'Agence ImmoSud', date: '23 Jan 2026', status: 'pending' },
        { id: 102, type: 'Estimation', submitter: 'Jean Dupont', date: '22 Jan 2026', status: 'pending' },
        { id: 103, type: 'Vente', submitter: 'Notaire Lefebvre', date: '20 Jan 2026', status: 'processing' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tableau de Bord</h1>
                    <p className="text-muted-foreground">Bienvenue, voici le récapitulatif de la journée.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Icon name="Download" size={16} className="mr-2" /> Rapport</Button>
                    <Button><Icon name="Plus" size={16} className="mr-2" /> Nouveau Dossier</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Dossiers en attente" value="12" icon="FileStack" trend="+2" description="depuis hier" />
                <StatCard title="Biens actifs" value="45" icon="Home" trend="+5%" description="ce mois-ci" />
                <StatCard title="Tickets Maintenance" value="3" icon="Wrench" description="Urgence moyenne" />
                <StatCard title="Chiffre d'affaires" value="81M FCFA" icon="Banknote" trend="+12%" description="vs N-1" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                    <ValidationQueue items={pendingItems} />
                    {/* Placeholder for Revenue Chart or similar */}
                </div>

                {/* Right Col (1/3) */}
                <div className="space-y-8">
                    <MaintenanceManager />
                    <ContractMonitor />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
