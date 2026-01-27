import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';

const tickets = [
    { id: 'T-102', title: 'Fuite d\'eau cuisine', property: 'Villa Bellevue', priority: 'high', status: 'open', date: '22/01/2026' },
    { id: 'T-103', title: 'Panne chauffage', property: 'Appt Centre', priority: 'medium', status: 'in_progress', date: '21/01/2026' },
    { id: 'T-104', title: 'Portail bloqué', property: 'Maison Basque', priority: 'low', status: 'resolved', date: '15/01/2026' },
    { id: 'T-105', title: 'Prise défectueuse', property: 'Studio Plage', priority: 'low', status: 'open', date: '23/01/2026' },
];

const priorityColor = {
    high: 'destructive',
    medium: 'warning',
    low: 'secondary'
};

const MaintenancePage = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
            <Card>
                <CardHeader><CardTitle>Tickets en cours</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Sujet</TableHead>
                                <TableHead>Bien</TableHead>
                                <TableHead>Priorité</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Statut</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tickets.map(t => (
                                <TableRow key={t.id}>
                                    <TableCell className="font-medium">{t.id}</TableCell>
                                    <TableCell>{t.title}</TableCell>
                                    <TableCell>{t.property}</TableCell>
                                    <TableCell><Badge variant={priorityColor[t.priority]}>{t.priority}</Badge></TableCell>
                                    <TableCell>{t.date}</TableCell>
                                    <TableCell>{t.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default MaintenancePage;
