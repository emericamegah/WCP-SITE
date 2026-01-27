import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import Icon from '../atoms/Icon';
import IconButton from '../atoms/IconButton';
import AdminBadge from '../atoms/AdminBadge';
import UserForm from './UserForm';

const initialUsers = [
    { _id: '65b2f1a1e4b0a1a1a1a1a1b1', name: 'Jean Admin', email: 'jean@wcp.com', role: 'admin', avatar: 'https://placehold.co/100', lastActivity: 'Il y a 2 min', status: 'active', permissions: ['Lecture seule', 'Modification documents'] },
    { _id: '65b2f1a1e4b0a1a1a1a1a1b2', name: 'Alice Agent', email: 'alice@wcp.com', role: 'agent', avatar: 'https://placehold.co/100', lastActivity: 'Il y a 1 heure', status: 'active', permissions: ['Lecture seule'] },
    { _id: '65b2f1a1e4b0a1a1a1a1a1b3', name: 'Bob Apporteur', email: 'bob@partner.com', role: 'apporteur', avatar: 'https://placehold.co/100', lastActivity: 'Hier', status: 'pending', permissions: ['Lecture seule'] },
    { _id: '65b2f1a1e4b0a1a1a1a1a1b4', name: 'Sophie Locataire', email: 'sophie@gmail.com', role: 'tenant', avatar: 'https://placehold.co/100', lastActivity: 'Il y a 2 jours', status: 'active', permissions: [], propertyLink: '65b2f1a1e4b0a1a1a1a1a1a3' },
];

const UserManagementModule = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsFormOpen(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleFormSubmit = (data) => {
        // Logic de "Suivi des Statuts" & Validation Relationnelle
        console.log("Validation de la liaison relationnelle...");

        if (data.role === 'tenant' && data.propertyLink) {
            console.log(`ACTION: Mise à jour du statut du Bien ${data.propertyLink} -> OCCUPÉ`);
            // Dans une vraie app MongoDB, on ferait un Property.findByIdAndUpdate()
        }

        if (selectedUser) {
            // Update existing user
            setUsers(prev => prev.map(u => u._id === selectedUser._id ? { ...u, ...data } : u));
        } else {
            // Add new user
            const newUser = {
                ...data,
                _id: `65b2f1a1e4b0a1a1a1a1${Math.floor(Math.random() * 999999).toString(16).padStart(6, '0')}`,
                avatar: `https://i.pravatar.cc/150?u=${data.email}`,
                lastActivity: 'À l\'instant',
            };
            setUsers(prev => [...prev, newUser]);
        }
        setIsFormOpen(false);
    };

    return (
        <Card className="h-full shadow-lg border-slate-200/60 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7 bg-slate-50/50">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Utilisateurs</CardTitle>
                    <CardDescription className="font-medium text-slate-500">
                        Administration globale des accès et des rôles.
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative group">
                        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Rechercher..."
                            className="pl-10 w-[240px] h-11 bg-white border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={handleAddUser}
                        className="h-11 px-6 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md shadow-slate-200"
                    >
                        <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                        <span className="font-bold tracking-tight">Ajouter</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Identité</TableHead>
                                <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Rôle</TableHead>
                                <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</TableHead>
                                <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Activité</TableHead>
                                <TableHead className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map(user => (
                                <TableRow key={user.id} className="group hover:bg-slate-50/80 transition-colors border-slate-50">
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                                                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${user.status === 'active' ? 'bg-emerald-500' : user.status === 'suspended' ? 'bg-red-500' : 'bg-amber-500'}`} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 leading-tight">{user.name}</div>
                                                <div className="text-xs font-medium text-slate-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <AdminBadge role={user.role} />
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${user.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                                            user.status === 'suspended' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                            {user.status === 'active' ? 'Actif' : user.status === 'suspended' ? 'Suspendu' : 'Attente'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center text-xs font-semibold text-slate-500">
                                            <Icon name="Clock" className="mr-1.5 h-3 w-3" />
                                            {user.lastActivity}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <IconButton type="edit" onClick={() => handleEditUser(user)} className="bg-white border hover:border-primary/50 hover:text-primary" />
                                            <IconButton type="ban" className="bg-white border hover:border-red-500/50 hover:text-red-500" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <Icon name="SearchX" className="mx-auto h-12 w-12 text-slate-200 mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Aucun utilisateur trouvé</p>
                        </div>
                    )}
                </div>
            </CardContent>

            {/* Modal de Formulaire Utilisateur */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:rounded-[2rem] border-none shadow-2xl p-0">
                    <div className="p-8 lg:p-12">
                        <DialogHeader className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                    <Icon name={selectedUser ? "User" : "UserPlus"} size={20} />
                                </div>
                                <DialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                    {selectedUser ? 'Modifier l\'utilisateur' : 'Nouvel Utilisateur'}
                                </DialogTitle>
                            </div>
                            <DialogDescription className="text-slate-500 font-medium">
                                Configurez les accès et les informations spécifiques selon le profil de l'utilisateur.
                            </DialogDescription>
                        </DialogHeader>

                        <UserForm
                            initialData={selectedUser}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setIsFormOpen(false)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default UserManagementModule;
