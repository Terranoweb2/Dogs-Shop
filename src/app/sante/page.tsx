
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Calendar, Syringe, Stethoscope, Bug, Weight, Trash2 } from 'lucide-react';
import { dogBreeds } from '@/data/dog-breeds';
import { HealthRecord } from '@/types/dog';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';
import { toast } from 'sonner';

export default function HealthPage() {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    setHealthRecords(getFromLocalStorage<HealthRecord[]>(STORAGE_KEYS.HEALTH_RECORDS, []));
  }, []);

  const saveRecords = (records: HealthRecord[]) => {
    setHealthRecords(records);
    saveToLocalStorage(STORAGE_KEYS.HEALTH_RECORDS, records);
  };

  const handleAddRecord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      dogName: formData.get('dogName') as string,
      breedId: formData.get('breedId') as string,
      dogId: Date.now().toString(),
      dateOfBirth: formData.get('dateOfBirth') as string,
      vaccinations: [],
      veterinaryVisits: [],
      parasiteTreatments: [],
      weight: [],
      notes: ''
    };

    saveRecords([...healthRecords, newRecord]);
    setAddDialogOpen(false);
    toast.success('Carnet de santé créé avec succès');
  };

  const handleDeleteRecord = (id: string) => {
    saveRecords(healthRecords.filter(r => r.id !== id));
    toast.success('Carnet de santé supprimé');
  };

  const handleAddVaccination = (recordId: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newVaccination = {
      id: Date.now().toString(),
      name: formData.get('vaccinationName') as string,
      date: formData.get('vaccinationDate') as string,
      nextDue: formData.get('nextDue') as string || undefined,
      veterinarian: formData.get('veterinarian') as string
    };

    const updatedRecords = healthRecords.map(record => {
      if (record.id === recordId) {
        return {
          ...record,
          vaccinations: [...record.vaccinations, newVaccination]
        };
      }
      return record;
    });

    saveRecords(updatedRecords);
    toast.success('Vaccination ajoutée');
  };

  const handleAddVisit = (recordId: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newVisit = {
      id: Date.now().toString(),
      date: formData.get('visitDate') as string,
      reason: formData.get('reason') as string,
      diagnosis: formData.get('diagnosis') as string,
      treatment: formData.get('treatment') as string,
      veterinarian: formData.get('visitVeterinarian') as string
    };

    const updatedRecords = healthRecords.map(record => {
      if (record.id === recordId) {
        return {
          ...record,
          veterinaryVisits: [...record.veterinaryVisits, newVisit]
        };
      }
      return record;
    });

    saveRecords(updatedRecords);
    toast.success('Visite vétérinaire ajoutée');
  };

  const handleAddTreatment = (recordId: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newTreatment = {
      id: Date.now().toString(),
      type: formData.get('treatmentType') as 'Vermifuge' | 'Anti-puces' | 'Anti-tiques',
      date: formData.get('treatmentDate') as string,
      nextDue: formData.get('treatmentNextDue') as string,
      product: formData.get('product') as string
    };

    const updatedRecords = healthRecords.map(record => {
      if (record.id === recordId) {
        return {
          ...record,
          parasiteTreatments: [...record.parasiteTreatments, newTreatment]
        };
      }
      return record;
    });

    saveRecords(updatedRecords);
    toast.success('Traitement antiparasitaire ajouté');
  };

  const handleAddWeight = (recordId: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newWeight = {
      date: formData.get('weightDate') as string,
      weight: parseFloat(formData.get('weight') as string)
    };

    const updatedRecords = healthRecords.map(record => {
      if (record.id === recordId) {
        return {
          ...record,
          weight: [...record.weight, newWeight]
        };
      }
      return record;
    });

    saveRecords(updatedRecords);
    toast.success('Poids ajouté');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Suivi de santé</h2>
            <p className="text-muted-foreground">
              Gérez les carnets de santé de vos chiens
            </p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau carnet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un carnet de santé</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddRecord} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dogName">Nom du chien</Label>
                  <Input id="dogName" name="dogName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breedId">Race</Label>
                  <Select name="breedId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une race" />
                    </SelectTrigger>
                    <SelectContent>
                      {dogBreeds.map((breed) => (
                        <SelectItem key={breed.id} value={breed.id}>
                          {breed.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date de naissance</Label>
                  <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
                </div>
                <Button type="submit" className="w-full">
                  Créer le carnet
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {healthRecords.length === 0 ? (
          <div className="text-center py-12">
            <Stethoscope className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Aucun carnet de santé
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Créez un carnet pour suivre la santé de votre chien
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthRecords.map((record) => {
              const breed = dogBreeds.find(b => b.id === record.breedId);
              const age = Math.floor(
                (new Date().getTime() - new Date(record.dateOfBirth).getTime()) / 
                (1000 * 60 * 60 * 24 * 365)
              );

              return (
                <Card key={record.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{record.dogName}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {breed?.name} • {age} an{age > 1 ? 's' : ''}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRecord(record.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Syringe className="h-4 w-4 text-muted-foreground" />
                        <span>{record.vaccinations.length} vaccins</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span>{record.veterinaryVisits.length} visites</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bug className="h-4 w-4 text-muted-foreground" />
                        <span>{record.parasiteTreatments.length} traitements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-muted-foreground" />
                        <span>{record.weight.length} pesées</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedRecord(record);
                        setDialogOpen(true);
                      }}
                    >
                      Voir le carnet
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Carnet de santé - {selectedRecord.dogName}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Race</p>
                    <p className="font-medium">
                      {dogBreeds.find(b => b.id === selectedRecord.breedId)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date de naissance</p>
                    <p className="font-medium">
                      {new Date(selectedRecord.dateOfBirth).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Syringe className="h-5 w-5" />
                      Vaccinations
                    </h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter une vaccination</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleAddVaccination(selectedRecord.id, e)} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="vaccinationName">Nom du vaccin</Label>
                            <Input id="vaccinationName" name="vaccinationName" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vaccinationDate">Date</Label>
                            <Input id="vaccinationDate" name="vaccinationDate" type="date" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nextDue">Prochain rappel</Label>
                            <Input id="nextDue" name="nextDue" type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="veterinarian">Vétérinaire</Label>
                            <Input id="veterinarian" name="veterinarian" required />
                          </div>
                          <Button type="submit" className="w-full">Ajouter</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {selectedRecord.vaccinations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucune vaccination enregistrée</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedRecord.vaccinations.map((vac) => (
                        <div key={vac.id} className="border rounded-lg p-3">
                          <p className="font-medium">{vac.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Date: {new Date(vac.date).toLocaleDateString('fr-FR')}
                          </p>
                          {vac.nextDue && (
                            <p className="text-sm text-muted-foreground">
                              Rappel: {new Date(vac.nextDue).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            Vétérinaire: {vac.veterinarian}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      Visites vétérinaires
                    </h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter une visite</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleAddVisit(selectedRecord.id, e)} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="visitDate">Date</Label>
                            <Input id="visitDate" name="visitDate" type="date" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reason">Motif</Label>
                            <Input id="reason" name="reason" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="diagnosis">Diagnostic</Label>
                            <Textarea id="diagnosis" name="diagnosis" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="treatment">Traitement</Label>
                            <Textarea id="treatment" name="treatment" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="visitVeterinarian">Vétérinaire</Label>
                            <Input id="visitVeterinarian" name="visitVeterinarian" required />
                          </div>
                          <Button type="submit" className="w-full">Ajouter</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {selectedRecord.veterinaryVisits.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucune visite enregistrée</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedRecord.veterinaryVisits.map((visit) => (
                        <div key={visit.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{visit.reason}</p>
                            <Badge variant="outline">
                              {new Date(visit.date).toLocaleDateString('fr-FR')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            <span className="font-medium">Diagnostic:</span> {visit.diagnosis}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            <span className="font-medium">Traitement:</span> {visit.treatment}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Vétérinaire: {visit.veterinarian}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Bug className="h-5 w-5" />
                      Traitements antiparasitaires
                    </h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter un traitement</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleAddTreatment(selectedRecord.id, e)} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="treatmentType">Type</Label>
                            <Select name="treatmentType" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Vermifuge">Vermifuge</SelectItem>
                                <SelectItem value="Anti-puces">Anti-puces</SelectItem>
                                <SelectItem value="Anti-tiques">Anti-tiques</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="treatmentDate">Date</Label>
                            <Input id="treatmentDate" name="treatmentDate" type="date" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="treatmentNextDue">Prochain traitement</Label>
                            <Input id="treatmentNextDue" name="treatmentNextDue" type="date" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="product">Produit utilisé</Label>
                            <Input id="product" name="product" required />
                          </div>
                          <Button type="submit" className="w-full">Ajouter</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {selectedRecord.parasiteTreatments.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun traitement enregistré</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedRecord.parasiteTreatments.map((treatment) => (
                        <div key={treatment.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge>{treatment.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(treatment.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Produit: {treatment.product}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Prochain: {new Date(treatment.nextDue).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Weight className="h-5 w-5" />
                      Suivi du poids
                    </h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter une pesée</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleAddWeight(selectedRecord.id, e)} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="weightDate">Date</Label>
                            <Input id="weightDate" name="weightDate" type="date" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="weight">Poids (kg)</Label>
                            <Input id="weight" name="weight" type="number" step="0.1" required />
                          </div>
                          <Button type="submit" className="w-full">Ajouter</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {selectedRecord.weight.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucune pesée enregistrée</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedRecord.weight
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((w, index) => (
                          <div key={index} className="flex items-center justify-between border rounded-lg p-3">
                            <span className="font-medium">{w.weight} kg</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(w.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
