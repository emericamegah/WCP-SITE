import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';

const contracts = [
    { id: 'C-2023-001', type: 'Mandat de Vente', parties: 'SCI Horizon / WCP', start: '01/01/2026', end: '01/04/2026', status: 'active' },
    { id: 'C-2023-045', type: 'Bail Location', parties: 'Mme. Etcheverry / M. Tenant', start: '15/01/2026', end: '15/01/2027', status: 'signed' },
    { id: 'C-2022-890', type: 'Mandat Gestion', parties: 'M. Martin / WCP', start: '10/06/2025', end: '10/06/2026', status: 'expiring' },
];

const ContractsPage = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight">Contrats</h1>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Réf</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Parties</TableHead>
                                <TableHead>Date Début</TableHead>
                                <TableHead>Date Fin</TableHead>
                                <TableHead>Statut</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contracts.map(c => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">{c.id}</TableCell>
                                    <TableCell>{c.type}</TableCell>
                                    <TableCell>{c.parties}</TableCell>
                                    <TableCell>{c.start}</TableCell>
                                    <TableCell>{c.end}</TableCell>
                                    <TableCell>
                                        <Badge variant={c.status === 'expiring' ? 'destructive' : 'outline'}>
                                            {c.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContractsPage;
