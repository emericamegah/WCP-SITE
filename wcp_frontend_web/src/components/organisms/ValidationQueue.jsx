import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import StatusPill from '../atoms/StatusPill';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Icon from '../atoms/Icon';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";

const ValidationQueue = ({ items = [], onValidate, onReject }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleView = (item) => {
        setSelectedItem(item);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">File d'attente de validation</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Apporteur</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                    Aucun dossier en attente.
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">#{item.id}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.submitter}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell><StatusPill status={item.status} /></TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                title="Voir"
                                                onClick={() => handleView(item)}
                                            >
                                                <Icon name="Eye" size={16} />
                                            </Button>
                                            {item.status !== 'validated' && item.status !== 'rejected' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        className="bg-green-600 hover:bg-green-700"
                                                        title="Valider"
                                                        onClick={() => onValidate && onValidate(item.id)}
                                                    >
                                                        <Icon name="Check" size={16} />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        title="Rejeter"
                                                        onClick={() => onReject && onReject(item.id)}
                                                    >
                                                        <Icon name="X" size={16} />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>

            <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Détails du dossier #{selectedItem?.id}</DialogTitle>
                        <DialogDescription>
                            Soumis par {selectedItem?.submitter} le {selectedItem?.date}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedItem && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium leading-none">Client</h4>
                                    <p className="text-sm text-muted-foreground">{selectedItem.clientName}</p>
                                    <p className="text-xs text-muted-foreground">{selectedItem.clientEmail}</p>
                                    <p className="text-xs text-muted-foreground">{selectedItem.clientPhone}</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium leading-none">Type de demande</h4>
                                    <p className="text-sm text-muted-foreground mb-1">{selectedItem.type}</p>
                                    <StatusPill status={selectedItem.status} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-sm font-medium leading-none">Détails de la demande</h4>
                                <p className="text-sm text-muted-foreground bg-slate-50 p-3 rounded-md border mt-2">
                                    {selectedItem.details || "Aucun détail supplémentaire."}
                                </p>
                            </div>

                            {selectedItem.documents && selectedItem.documents.length > 0 && (
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium leading-none">Documents joints</h4>
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {selectedItem.documents.map((doc, index) => (
                                            <div key={index} className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-700 border">
                                                <Icon name="FileText" size={12} />
                                                {doc}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        {selectedItem?.status !== 'validated' && selectedItem?.status !== 'rejected' && (
                            <div className="flex w-full justify-between sm:justify-end gap-2">
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        onReject && onReject(selectedItem.id);
                                        setSelectedItem(null);
                                    }}
                                >
                                    Rejeter
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => {
                                        onValidate && onValidate(selectedItem.id);
                                        setSelectedItem(null);
                                    }}
                                >
                                    Valider
                                </Button>
                            </div>
                        )}
                        {(selectedItem?.status === 'validated' || selectedItem?.status === 'rejected') && (
                            <Button variant="outline" onClick={() => setSelectedItem(null)}>Fermer</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ValidationQueue;
