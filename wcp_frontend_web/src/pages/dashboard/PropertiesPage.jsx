import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';

const properties = [
    { id: 1, name: 'Villa Californienne', owner: 'SCI Horizon', type: 'Vente', status: 'active', price: '1 250 000€' },
    { id: 2, name: 'Appartement Vue Mer', owner: 'M. Martin', type: 'Vente', status: 'offer', price: '450 000€' },
    { id: 3, name: 'Maison Basque', owner: 'Mme. Etcheverry', type: 'Location', status: 'rented', price: '2 500€/mois' },
];

const PropertiesPage = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight">Mes Biens</h1>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Propriétaire</TableHead>
                                <TableHead>Mandat</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead>Statut</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {properties.map(p => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium">{p.name}</TableCell>
                                    <TableCell>{p.owner}</TableCell>
                                    <TableCell>{p.type}</TableCell>
                                    <TableCell>{p.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={p.status === 'active' ? 'success' : 'secondary'}>
                                            {p.status}
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

export default PropertiesPage;
