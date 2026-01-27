import React, { useState } from 'react';
import ValidationQueue from '../../components/organisms/ValidationQueue';
import { mockValidations } from '../../api/mockData';

const ValidationsPage = () => {
    const [items, setItems] = useState(mockValidations);

    const handleValidate = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, status: 'validated' } : item
            )
        );
    };

    const handleReject = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, status: 'rejected' } : item
            )
        );
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h1 className="text-3xl font-bold tracking-tight">Validations</h1>
            <p className="text-muted-foreground">Historique complet des dossiers soumis par les apporteurs d'affaires.</p>
            <ValidationQueue
                items={items}
                onValidate={handleValidate}
                onReject={handleReject}
            />
        </div>
    );
};

export default ValidationsPage;
