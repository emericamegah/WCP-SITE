import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';

const clients = [
    { id: 1, name: 'Jean Dupont', email: 'j.dupont@email.com', role: 'Propriétaire', phone: '06 00 00 00 00' },
    { id: 2, name: 'Alice Martin', email: 'alice.m@email.com', role: 'Locataire', phone: '06 11 11 11 11' },
    { id: 3, name: 'Lucas Bernard', email: 'lucas@immo.fr', role: 'Apporteur', phone: '06 22 22 22 22' },
];

const ClientsPage = () => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead>Rôle</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Téléphone</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map(c => (
                                <TableRow key={c.id}>
                                    <TableCell>
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{c.name}</TableCell>
                                    <TableCell>{c.role}</TableCell>
                                    <TableCell>{c.email}</TableCell>
                                    <TableCell>{c.phone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ClientsPage;
