
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DogListing, DogBreed, PaymentMethod, Order } from '@/types/dog';
import { formatPrice, calculateDeposit } from '@/lib/currency';
import { useOrders } from '@/hooks/use-orders';
import { toast } from 'sonner';
import { 
  Smartphone, 
  Banknote, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PaymentDialogProps {
  listing: DogListing | null;
  breed: DogBreed | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const paymentMethods = [
  { id: 'orange-money', name: 'Orange Money', icon: Smartphone, color: 'text-orange-500' },
  { id: 'mtn-money', name: 'MTN Money', icon: Smartphone, color: 'text-yellow-500' },
  { id: 'moov-money', name: 'Moov Money', icon: Smartphone, color: 'text-blue-500' },
  { id: 'cash', name: 'Espèces', icon: Banknote, color: 'text-green-500' },
];

export function PaymentDialog({ listing, breed, open, onOpenChange }: PaymentDialogProps) {
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('orange-money');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  if (!listing || !breed) return null;

  const depositAmount = calculateDeposit(listing.price);
  const amountToPay = paymentType === 'deposit' ? depositAmount : listing.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerInfo.name || !buyerInfo.phone || !buyerInfo.email) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const order: Order = {
      id: Date.now().toString(),
      listingId: listing.id,
      dogName: listing.name,
      breedName: breed.name,
      buyerInfo,
      totalPrice: listing.price,
      depositAmount,
      remainingAmount: listing.price - (paymentType === 'deposit' ? depositAmount : listing.price),
      paymentMethod,
      status: paymentType === 'deposit' ? 'deposit-paid' : 'fully-paid',
      createdAt: new Date().toISOString(),
      depositPaidAt: paymentType === 'deposit' ? new Date().toISOString() : undefined,
      fullyPaidAt: paymentType === 'full' ? new Date().toISOString() : undefined,
      notes: ''
    };

    addOrder(order);
    
    toast.success(
      paymentType === 'deposit' 
        ? 'Réservation confirmée ! Acompte enregistré.' 
        : 'Paiement complet enregistré !'
    );

    onOpenChange(false);
    
    setBuyerInfo({
      name: '',
      phone: '',
      email: '',
      address: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[92vw] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-3 xs:p-4 sm:p-6 pb-0">
          <DialogTitle className="text-lg xs:text-xl sm:text-2xl">Réservation et paiement</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-60px)] xs:max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4 sm:space-y-6 p-3 xs:p-4 sm:p-6 pt-3 xs:pt-4">
            {/* Dog Info */}
            <div className="bg-muted p-2.5 xs:p-3 sm:p-4 rounded-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm xs:text-base sm:text-lg truncate">{listing.name}</h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground">{breed.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[9px] xs:text-[10px] sm:text-sm text-muted-foreground">Prix total</p>
                  <p className="text-base xs:text-lg sm:text-xl font-bold text-[#D4A574]">
                    {formatPrice(listing.price)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Type */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-xs xs:text-sm sm:text-base">Type de paiement</h4>
              <RadioGroup value={paymentType} onValueChange={(value) => setPaymentType(value as 'deposit' | 'full')}>
                <div className="flex items-center space-x-2 border rounded-lg p-2.5 xs:p-3 sm:p-4 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="deposit" id="deposit" />
                  <Label htmlFor="deposit" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-xs xs:text-sm sm:text-base">Acompte (30%)</p>
                        <p className="text-[9px] xs:text-[10px] sm:text-sm text-muted-foreground">
                          Réservez maintenant
                        </p>
                      </div>
                      <p className="font-bold text-[#D4A574] text-xs xs:text-sm sm:text-base whitespace-nowrap">{formatPrice(depositAmount)}</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-2.5 xs:p-3 sm:p-4 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-xs xs:text-sm sm:text-base">Paiement complet</p>
                        <p className="text-[9px] xs:text-[10px] sm:text-sm text-muted-foreground">
                          Payez la totalité
                        </p>
                      </div>
                      <p className="font-bold text-[#D4A574] text-xs xs:text-sm sm:text-base whitespace-nowrap">{formatPrice(listing.price)}</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Payment Method */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-xs xs:text-sm sm:text-base">Méthode de paiement</h4>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div key={method.id} className="flex items-center space-x-1.5 xs:space-x-2 border rounded-lg p-2 xs:p-2.5 sm:p-3 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex-1 cursor-pointer flex items-center gap-1.5 xs:gap-2">
                          <Icon className={`h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 ${method.color} flex-shrink-0`} />
                          <span className="font-medium text-[10px] xs:text-xs sm:text-sm truncate">{method.name}</span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Buyer Info */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-xs xs:text-sm sm:text-base">Informations de l'acheteur</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="name" className="text-xs xs:text-sm">Nom complet *</Label>
                  <Input
                    id="name"
                    value={buyerInfo.name}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>

                <div className="space-y-1.5 xs:space-y-2">
                  <Label htmlFor="phone" className="text-xs xs:text-sm">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={buyerInfo.phone}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                    required
                    className="h-9 xs:h-10 sm:h-11 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 xs:space-y-2">
                <Label htmlFor="email" className="text-xs xs:text-sm">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={buyerInfo.email}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                  required
                  className="h-9 xs:h-10 sm:h-11 text-sm"
                />
              </div>

              <div className="space-y-1.5 xs:space-y-2">
                <Label htmlFor="address" className="text-xs xs:text-sm">Adresse de livraison</Label>
                <Textarea
                  id="address"
                  value={buyerInfo.address}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, address: e.target.value })}
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-950 p-2.5 xs:p-3 sm:p-4 rounded-lg">
              <div className="flex gap-2 xs:gap-2.5 sm:gap-3">
                <AlertCircle className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-[10px] xs:text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                  <p className="font-semibold mb-1 xs:mb-1.5 sm:mb-2">Instructions de paiement</p>
                  {paymentMethod === 'cash' ? (
                    <p>
                      Vous recevrez les coordonnées de l'éleveur pour organiser le paiement.
                    </p>
                  ) : (
                    <p>
                      Vous recevrez un SMS avec les instructions pour effectuer le paiement via {paymentMethods.find(m => m.id === paymentMethod)?.name}.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between p-2.5 xs:p-3 sm:p-4 bg-muted rounded-lg">
              <span className="font-semibold text-xs xs:text-sm sm:text-base">Montant à payer</span>
              <span className="text-lg xs:text-xl sm:text-2xl font-bold text-[#D4A574]">
                {formatPrice(amountToPay)}
              </span>
            </div>

            <Button type="submit" className="w-full h-10 xs:h-11 sm:h-12 text-xs xs:text-sm sm:text-base">
              <CheckCircle2 className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mr-2" />
              Confirmer la réservation
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
