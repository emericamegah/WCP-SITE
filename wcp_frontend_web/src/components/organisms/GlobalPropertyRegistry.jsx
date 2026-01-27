import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import AdminBadge from '../atoms/AdminBadge';
import { mockProperties } from '../../api/mockData'; // Reusing existing mock data
import IconButton from '../atoms/IconButton';

const GlobalPropertyRegistry = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Registre Global des Biens</CardTitle>
                <CardDescription>Vue d'ensemble de tous les mandats en cours.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ref</TableHead>
                            <TableHead>Bien</TableHead>
                            <TableHead>Localisation</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Chargé d'affaires</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockProperties.map(prop => (
                            <TableRow key={prop._id}>
                                <TableCell className="font-mono text-[10px] text-slate-400">
                                    {prop._id.substring(0, 8)}...
                                </TableCell>
                                <TableCell className="font-bold text-slate-800">{prop.title}</TableCell>
                                <TableCell className="text-slate-500 font-medium">{prop.location}</TableCell>
                                <TableCell className="font-black text-slate-900">{prop.price}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${prop.status === 'sale' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {prop.status === 'sale' ? 'Vente' : 'Location'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold">WCP</div>
                                        <span className="text-xs font-bold text-slate-700">Equipe West Coast</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <IconButton type="edit" className="hover:bg-primary/5 transition-colors" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default GlobalPropertyRegistry;
