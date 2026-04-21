import React from 'react';
import KpiCard from '../../components/molecules/KpiCard';
import UserManagementModule from '../../components/organisms/UserManagementModule';
import GlobalPropertyRegistry from '../../components/organisms/GlobalPropertyRegistry';

const AdminPage = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Vue d'ensemble</h1>
                <p className="text-muted-foreground mt-2">Bienvenue dans le centre de contrôle West Coast Property.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard title="Chiffre d'affaires" value="84 000 000 FCFA" change="+12.5% vs mois dernier" icon="Banknote" trend="up" />
                <KpiCard title="Biens sous gestion" value="145" change="+3 nouveaux" icon="Home" trend="up" />
                <KpiCard title="Taux de vacance" value="4.2%" change="-0.5%" icon="Percent" trend="up" /> {/* Trend Up means good? Less vacancy is good. */}
                <KpiCard title="Tickets Ouverts" value="12" change="+2 urgents" icon="AlertCircle" trend="down" />
            </div>

            {/* Main Modules Preview */}
            <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                <div className="col-span-1">
                    <UserManagementModule />
                </div>
                <div className="col-span-1">
                    <GlobalPropertyRegistry />
                    {/* Note: In a real app we might show a summarized version here, 
                        but reusing the full list is fine for the prototype. */}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
