import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import Icon from '../atoms/Icon';
import MediaUpload from '../forms/MediaUpload';
import { mockProperties } from '../../api/mockData';

const PropertySelector = ({ selectedIds, onToggle, multi = false }) => {
    return (
        <div className="space-y-3 max-h-48 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
            {mockProperties.map(prop => {
                const isSelected = multi
                    ? selectedIds.includes(prop._id)
                    : selectedIds === prop._id;

                return (
                    <div
                        key={prop._id}
                        onClick={() => onToggle(prop._id)}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-white shadow-md border-primary/20 ring-1 ring-primary/10' : 'hover:bg-white/50 border-transparent'
                            } border`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${prop.status === 'rent' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                            <div>
                                <p className="text-[11px] font-bold text-slate-900">{prop.title}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{prop.location}</p>
                            </div>
                        </div>
                        {isSelected && <Icon name="Check" size={14} className="text-primary" />}
                    </div>
                );
            })}
        </div>
    );
};

const UserForm = ({ initialData = null, onSubmit, onCancel }) => {
    const isEditing = !!initialData;
    const [role, setRole] = useState(initialData?.role || 'tenant');
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        email: initialData?.email || '',
        password: '', // Should be handled carefully in editing mode
        status: initialData?.status || 'active',
        permissions: initialData?.permissions || [],
        // Role specific data
        phone: initialData?.phone || '',
        address: initialData?.address || '',
        rib: initialData?.rib || '',
        documents: initialData?.documents || [],
        propertyLink: initialData?.propertyLink || '',
        sector: initialData?.sector || '',
        scope: initialData?.scope || '',
    });

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const togglePermission = (perm) => {
        setFormData(prev => {
            const hasPerm = prev.permissions.includes(perm);
            return {
                ...prev,
                permissions: hasPerm
                    ? prev.permissions.filter(p => p !== perm)
                    : [...prev.permissions, perm]
            };
        });
    };

    const roles = [
        { value: 'admin', label: 'Administrateur' },
        { value: 'owner', label: 'Propriétaire' },
        { value: 'tenant', label: 'Locataire' },
        { value: 'apporteur', label: 'Apporteur d\'affaires' },
        { value: 'agent', label: 'Chargé d\'affaires' },
    ];

    const renderRoleSpecificFields = () => {
        switch (role) {
            case 'owner':
                return (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Téléphone</Label>
                                <Input
                                    placeholder="01 23 45 67 89"
                                    value={formData.phone}
                                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Adresse Postale</Label>
                                <Input
                                    placeholder="123 rue de Rivoli, Paris"
                                    value={formData.address}
                                    onChange={(e) => handleFieldChange('address', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Patrimoine (Liste des biens gérés)</Label>
                            <PropertySelector
                                selectedIds={formData.ownedProperties || []}
                                onToggle={(id) => {
                                    const current = formData.ownedProperties || [];
                                    const next = current.includes(id)
                                        ? current.filter(pi => pi !== id)
                                        : [...current, id];
                                    handleFieldChange('ownedProperties', next);
                                }}
                                multi={true}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>RIB / Informations Bancaires</Label>
                            <Input
                                placeholder="FR76 ..."
                                value={formData.rib}
                                onChange={(e) => handleFieldChange('rib', e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 'tenant':
                return (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                            <Label>Bien occupé (Lien Relationnel)</Label>
                            <PropertySelector
                                selectedIds={formData.propertyLink}
                                onToggle={(id) => handleFieldChange('propertyLink', id)}
                                multi={false}
                            />
                            <p className="text-[10px] text-slate-400 italic">Identifiant unique du bien (MongoDB Ref)</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Dossier administratif (Justificatifs)</Label>
                            <MediaUpload
                                label="Identité, Garant, Revenus"
                                onUploadSuccess={(url) => handleFieldChange('documents', [...formData.documents, url])}
                            />
                        </div>
                    </div>
                );
            case 'apporteur':
                return (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Téléphone Professionnel</Label>
                                <Input
                                    placeholder="06 ..."
                                    value={formData.phone}
                                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>RIB pour Commissions</Label>
                                <Input
                                    placeholder="FR76 ..."
                                    value={formData.rib}
                                    onChange={(e) => handleFieldChange('rib', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Dossiers Apportés (Leads ↔ Bien)</Label>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                    <span>Bien Apporté</span>
                                    <span>Com. Estimée</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <span className="text-xs font-bold text-slate-700">Appartement Vue Mer (REF-A2)</span>
                                    <span className="text-xs font-black text-emerald-600">4 500 €</span>
                                </div>
                                <p className="text-[10px] text-center text-slate-400 italic">Identifiant d'apport: {initialData?._id || 'NO_ID'}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Justificatifs d'Identité ou Société</Label>
                            <MediaUpload
                                label="Kbis, CNI"
                                onUploadSuccess={(url) => handleFieldChange('documents', [...formData.documents, url])}
                            />
                        </div>
                    </div>
                );
            case 'agent':
                return (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Secteur Géographique</Label>
                                <Input
                                    placeholder="Paris Ouest, Nice..."
                                    value={formData.sector}
                                    onChange={(e) => handleFieldChange('sector', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Périmètre d'action</Label>
                                <Input
                                    placeholder="Vente, Location Prestige..."
                                    value={formData.scope}
                                    onChange={(e) => handleFieldChange('scope', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Portefeuille (Biens supervisés)</Label>
                            <PropertySelector
                                selectedIds={formData.managedProperties || []}
                                onToggle={(id) => {
                                    const current = formData.managedProperties || [];
                                    const next = current.includes(id)
                                        ? current.filter(pi => pi !== id)
                                        : [...current, id];
                                    handleFieldChange('managedProperties', next);
                                }}
                                multi={true}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...formData, role }); }} className="space-y-8 py-4">
            {/* Common Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 border-b pb-2">Informations Générales</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nom Complet</Label>
                        <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email / Identifiant</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Rôle</Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map(r => (
                                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">{isEditing ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe initial'}</Label>
                        <Input
                            id="password"
                            type="password"
                            required={!isEditing}
                            value={formData.password}
                            onChange={(e) => handleFieldChange('password', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Role Specific Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 border-b pb-2">Détails {roles.find(r => r.value === role)?.label}</h3>
                {renderRoleSpecificFields()}
            </div>

            {/* Permissions & Status Section */}
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 border-b pb-2">Permissions</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {['Lecture seule', 'Modification documents', 'Gestion paiements', 'Accès rapports'].map(perm => (
                            <div key={perm} className="flex items-center space-x-2">
                                <Checkbox
                                    id={perm}
                                    checked={formData.permissions.includes(perm)}
                                    onCheckedChange={() => togglePermission(perm)}
                                />
                                <label htmlFor={perm} className="text-sm cursor-pointer">{perm}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 border-b pb-2">Statut du Compte</h3>
                    <Select
                        value={formData.status}
                        onValueChange={(val) => handleFieldChange('status', val)}
                    >
                        <SelectTrigger className={`font-bold ${formData.status === 'active' ? 'text-emerald-600 bg-emerald-50' :
                            formData.status === 'suspended' ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50'
                            }`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="suspended">Suspendu</SelectItem>
                            <SelectItem value="pending">En attente de validation</SelectItem>
                        </SelectContent>
                    </Select>

                    {isEditing && (
                        <div className="mt-6 p-4 bg-slate-100 rounded-xl">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Historique d'activité</p>
                            <ul className="text-[11px] text-slate-600 space-y-1">
                                <li>• Création : 12/01/2026 par Admin</li>
                                <li>• Dernière modif : 20/01/2026 (Email)</li>
                                <li>• Connexion : {initialData?.lastActivity || 'Jamais'}</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t font-sans">
                <Button variant="ghost" type="button" onClick={onCancel}>Annuler</Button>
                <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                    {isEditing ? 'Mettre à jour' : 'Créer l\'utilisateur'}
                </Button>
            </div>
        </form>
    );
};

export default UserForm;
