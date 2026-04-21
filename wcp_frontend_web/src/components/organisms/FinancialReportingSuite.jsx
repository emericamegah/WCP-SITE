import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
import Icon from '../atoms/Icon';

const data = [
    { name: 'Jan', revenus: 4000, charges: 2400 },
    { name: 'Fev', revenus: 3000, charges: 1398 },
    { name: 'Mar', revenus: 2000, charges: 9800 },
    { name: 'Avr', revenus: 2780, charges: 3908 },
    { name: 'Mai', revenus: 1890, charges: 4800 },
    { name: 'Juin', revenus: 2390, charges: 3800 },
];

const FinancialReportingSuite = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Revenus & Dépenses</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} FCFA`} />
                            <Tooltip />
                            <Bar dataKey="revenus" fill="#0f172a" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="charges" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Exports & Rapports</CardTitle>
                    <CardDescription>Générez les documents comptables.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border rounded p-4 flex items-center justify-between">
                        <div>
                            <div className="font-semibold">Grand Livre 2025</div>
                            <div className="text-xs text-muted-foreground">PDF - 2.4 MB</div>
                        </div>
                        <Button variant="outline" size="sm"><Icon name="Download" className="mr-2 h-4 w-4" /> Télécharger</Button>
                    </div>
                    <div className="border rounded p-4 flex items-center justify-between">
                        <div>
                            <div className="font-semibold">Relevé des Mandats</div>
                            <div className="text-xs text-muted-foreground">CSV - 120 KB</div>
                        </div>
                        <Button variant="outline" size="sm"><Icon name="FileSpreadsheet" className="mr-2 h-4 w-4" /> Exporter</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FinancialReportingSuite;
