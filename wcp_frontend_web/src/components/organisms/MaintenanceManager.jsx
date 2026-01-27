import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import Icon from '../atoms/Icon';

const tickets = [
    { id: 'T-102', title: 'Fuite d\'eau cuisine', property: 'Villa Bellevue', priority: 'high', status: 'open' },
    { id: 'T-103', title: 'Panne chauffage', property: 'Appt Centre', priority: 'medium', status: 'in_progress' },
    { id: 'T-104', title: 'Portail bloqué', property: 'Maison Basque', priority: 'low', status: 'resolved' },
];

const priorityColor = {
    high: 'destructive',
    medium: 'warning',
    low: 'secondary'
};

const MaintenanceManager = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex justify-between items-center">
                    Maintenance
                    <Badge variant="outline" className="text-xs font-normal">3 en cours</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div>
                                <h4 className="text-sm font-semibold">{ticket.title}</h4>
                                <p className="text-xs text-muted-foreground">{ticket.property}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <Badge variant={priorityColor[ticket.priority]} className="text-[10px] uppercase">
                                    {ticket.priority}
                                </Badge>
                                <span className="text-[10px] text-gray-500">#{ticket.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default MaintenanceManager;
