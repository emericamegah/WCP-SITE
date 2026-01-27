import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

const contracts = [
    { id: 1, client: 'M. Martin', type: 'Mandat Vente', ends: '15 Jours' },
    { id: 2, client: 'Mme. Durand', type: 'Bail Location', ends: '30 Jours' },
];

const ContractMonitor = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Contrats à écheance</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {contracts.map(contract => (
                        <div key={contract.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                                <p className="text-sm font-medium">{contract.client}</p>
                                <p className="text-xs text-muted-foreground">{contract.type}</p>
                            </div>
                            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                                {contract.ends}
                            </Badge>
                        </div>
                    ))}
                    {contracts.length === 0 && <p className="text-sm text-gray-500">Aucun contrat urgent.</p>}
                </div>
            </CardContent>
        </Card>
    );
};

export default ContractMonitor;
