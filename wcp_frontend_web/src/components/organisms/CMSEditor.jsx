import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'; // Need to make sure tabs exist or are created
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const CMSEditor = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Gestion du Contenu (CMS)</CardTitle>
                <CardDescription>Modifiez les textes et actualités du site.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="news" className="w-full">
                    <TabsList>
                        <TabsTrigger value="news">Actualités</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="legal">Légal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="news" className="space-y-4">
                        <div className="border p-4 rounded-md space-y-4">
                            <h3 className="font-semibold">Dernière Actualité</h3>
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="title">Titre</Label>
                                <Input id="title" placeholder="Titre de l'article" defaultValue="Les prix de l'immobilier en hausse au Pays Basque" />
                            </div>
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="message">Contenu</Label>
                                <Textarea id="message" placeholder="Contenu de l'article" className="min-h-[100px]" />
                            </div>
                            <Button>Publier</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="services">
                        <div className="py-4 text-muted-foreground text-center">Gestion des services (À venir)</div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default CMSEditor;
