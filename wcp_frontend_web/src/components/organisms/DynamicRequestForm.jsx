import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import WCPFilePicker from '../atoms/WCPFilePicker';
import SuccessFeedback from '../molecules/SuccessFeedback';

const DynamicRequestForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm();

    // eslint-disable-next-line react-hooks/incompatible-library
    const requestType = watch('requestType', 'buy'); // Default to buy/rent

    const onSubmit = (data) => {
        console.log('Form Submitted:', data);
        // Simulate API call
        setTimeout(() => setIsSubmitted(true), 1000);
    };

    const handleReset = () => {
        setIsSubmitted(false);
        reset();
    };

    if (isSubmitted) {
        return (
            <Card className="h-full border-none shadow-none">
                <CardContent>
                    <SuccessFeedback onReset={handleReset} />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-2xl shadow-xl border-border/50">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Envoyez-nous un message</CardTitle>
                <CardDescription>Remplissez le formulaire ci-dessous pour nous contacter.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Common Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom complet <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                placeholder="Jean Dupont"
                                {...register('name', { required: 'Ce champ est requis' })}
                            />
                            {errors.name && <p className="text-xs text-destructive font-medium">{errors.name.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="jean@exemple.com"
                                {...register('email', {
                                    required: 'Email requis',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email invalide"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-xs text-destructive font-medium">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Type de demande <span className="text-red-500">*</span></Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { val: 'buy', label: 'Vente / Achat' },
                                { val: 'rent', label: 'Location' },
                                { val: 'estimate', label: 'Estimation' },
                                { val: 'partner', label: 'Partenariat' }
                            ].map(type => (
                                <label
                                    key={type.val}
                                    className={`
                            cursor-pointer text-center py-3 px-2 rounded-md border text-sm font-medium transition-all
                            ${requestType === type.val
                                            ? 'bg-primary/10 border-primary text-primary ring-1 ring-primary'
                                            : 'bg-background border-input hover:bg-accent hover:text-accent-foreground'
                                        }
                        `}
                                >
                                    <input
                                        type="radio"
                                        value={type.val}
                                        {...register('requestType')}
                                        className="sr-only"
                                    />
                                    {type.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Sections */}
                    {requestType === 'estimate' && (
                        <div className="bg-muted/50 p-4 rounded-lg space-y-4 animate-fadeIn border border-border/50">
                            <h4 className="text-sm font-semibold uppercase tracking-wide mb-2">Détails du bien</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Adresse du bien</Label>
                                    <Input {...register('propertyAddress', { required: true })} placeholder="12 rue..." />
                                    {errors.propertyAddress && <span className="text-xs text-destructive">Requis</span>}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Surface (m²)</Label>
                                    <Input type="number" {...register('propertyArea')} placeholder="Ex: 85" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Type de bien</Label>
                                <Controller
                                    control={control}
                                    name="propertyType"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="house">Maison</SelectItem>
                                                <SelectItem value="apartment">Appartement</SelectItem>
                                                <SelectItem value="land">Terrain</SelectItem>
                                                <SelectItem value="commercial">Local Commercial</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {requestType === 'partner' && (
                        <div className="bg-muted/50 p-4 rounded-lg space-y-4 animate-fadeIn border border-border/50">
                            <h4 className="text-sm font-semibold uppercase tracking-wide mb-2">Espace Apporteur d'Affaires</h4>
                            <div className="grid gap-2">
                                <Label>Profil</Label>
                                <Controller
                                    control={control}
                                    name="partnerProfile"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Votre profil..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pro">Professionnel de l'immobilier</SelectItem>
                                                <SelectItem value="notary">Notaire / Avocat</SelectItem>
                                                <SelectItem value="architect">Architecte / Constructeur</SelectItem>
                                                <SelectItem value="other">Autre</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Joindre un dossier</Label>
                                <WCPFilePicker {...register('partnerFile')} className="bg-background" />
                            </div>
                        </div>
                    )}

                    {(requestType === 'buy' || requestType === 'rent') && (
                        <div className="bg-muted/50 p-4 rounded-lg space-y-4 animate-fadeIn border border-border/50">
                            <h4 className="text-sm font-semibold uppercase tracking-wide mb-2">Vos Critères</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Budget Max (FCFA)</Label>
                                    <Input type="number" {...register('budget')} placeholder="Ex: 300000000" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Secteur</Label>
                                    <Input {...register('location')} placeholder="Ex: Biarritz, Anglet..." />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Message */}
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                        <Textarea
                            id="message"
                            placeholder="Dites-nous en plus sur votre projet..."
                            {...register('message', { required: 'Un message est requis.' })}
                        />
                        {errors.message && <p className="text-xs text-destructive font-medium">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Envoyer ma demande
                    </Button>

                </form>
            </CardContent>
        </Card>
    );
};

export default DynamicRequestForm;
