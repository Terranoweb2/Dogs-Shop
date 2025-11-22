
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useOrders } from '@/hooks/use-orders';
import { Order, OrderStatus } from '@/types/dog';
import { formatPrice } from '@/lib/currency';
import { 
  ShoppingBag, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  'pending': { label: 'En attente', color: 'bg-yellow-500', icon: Clock },
  'deposit-paid': { label: 'Acompte payé', color: 'bg-blue-500', icon: CheckCircle2 },
  'fully-paid': { label: 'Payé', color: 'bg-green-500', icon: CheckCircle2 },
  'completed': { label: 'Terminé', color: 'bg-gray-500', icon: CheckCircle2 },
  'cancelled': { label: 'Annulé', color: 'bg-red-500', icon: XCircle },
};

const paymentMethodLabels: Record<string, string> = {
  'orange-money': 'Orange Money',
  'mtn-money': 'MTN Money',
  'moov-money': 'Moov Money',
  'cash': 'Espèces',
};

export default function OrdersPage() {
  const { orders, updateOrder, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handlePayRemaining = (orderId: string) => {
    updateOrder(orderId, {
      status: 'fully-paid',
      fullyPaidAt: new Date().toISOString(),
      remainingAmount: 0
    });
    toast.success('Paiement du solde enregistré !');
    setDialogOpen(false);
  };

  const handleCompleteOrder = (orderId: string) => {
    updateOrder(orderId, {
      status: 'completed',
      completedAt: new Date().toISOString()
    });
    toast.success('Commande marquée comme terminée');
    setDialogOpen(false);
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
      updateOrder(orderId, {
        status: 'cancelled'
      });
      toast.success('Commande annulée');
      setDialogOpen(false);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      deleteOrder(orderId);
      toast.success('Commande supprimée');
      setDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-20 lg:pb-6">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-[#D4A574]" />
            <h2 className="text-xl sm:text-2xl font-bold">Mes commandes</h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            {orders.length} commande{orders.length > 1 ? 's' : ''}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-10 sm:py-12">
            <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg mb-2">
              Aucune commande
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Vos réservations apparaîtront ici
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {orders
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((order) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;

                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <CardTitle className="text-base sm:text-lg truncate">{order.dogName}</CardTitle>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            {order.breedName}
                          </p>
                        </div>
                        <Badge className={`${status.color} text-white text-[10px] sm:text-xs flex-shrink-0`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <p className="text-muted-foreground">Prix total</p>
                          <p className="font-semibold">{formatPrice(order.totalPrice)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Reste à payer</p>
                          <p className="font-semibold text-[#D4A574]">
                            {formatPrice(order.remainingAmount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Paiement</p>
                          <p className="font-semibold truncate">
                            {paymentMethodLabels[order.paymentMethod]}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-semibold">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full h-9 sm:h-10 text-xs sm:text-sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        Voir les détails
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
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0 overflow-hidden">
          {selectedOrder && (
            <>
              <DialogHeader className="p-4 sm:p-6 pb-0">
                <DialogTitle className="text-xl sm:text-2xl">Détails de la commande</DialogTitle>
              </DialogHeader>

              <ScrollArea className="max-h-[calc(90vh-80px)]">
                <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold truncate">{selectedOrder.dogName}</h3>
                      <p className="text-muted-foreground text-sm">{selectedOrder.breedName}</p>
                    </div>
                    <Badge className={`${statusConfig[selectedOrder.status].color} text-white text-xs sm:text-sm flex-shrink-0`}>
                      {statusConfig[selectedOrder.status].label}
                    </Badge>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3 text-sm sm:text-base">Informations financières</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prix total</span>
                        <span className="font-semibold">{formatPrice(selectedOrder.totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Acompte versé</span>
                        <span className="font-semibold text-green-600">
                          {formatPrice(selectedOrder.depositAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reste à payer</span>
                        <span className="font-semibold text-[#D4A574]">
                          {formatPrice(selectedOrder.remainingAmount)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-semibold">Méthode de paiement</span>
                        <span className="font-semibold">
                          {paymentMethodLabels[selectedOrder.paymentMethod]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3 text-sm sm:text-base">Informations de l'acheteur</h4>
                    <div className="space-y-2">
                      <p className="font-medium text-sm sm:text-base">{selectedOrder.buyerInfo.name}</p>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span>{selectedOrder.buyerInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">{selectedOrder.buyerInfo.email}</span>
                      </div>
                      {selectedOrder.buyerInfo.address && (
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                          <span>{selectedOrder.buyerInfo.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3 text-sm sm:text-base">Historique</h4>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">Créée le:</span>
                        <span className="truncate">{formatDate(selectedOrder.createdAt)}</span>
                      </div>
                      {selectedOrder.depositPaidAt && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">Acompte payé le:</span>
                          <span className="truncate">{formatDate(selectedOrder.depositPaidAt)}</span>
                        </div>
                      )}
                      {selectedOrder.fullyPaidAt && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground">Payé le:</span>
                          <span className="truncate">{formatDate(selectedOrder.fullyPaidAt)}</span>
                        </div>
                      )}
                      {selectedOrder.completedAt && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                          <span className="text-muted-foreground">Terminée le:</span>
                          <span className="truncate">{formatDate(selectedOrder.completedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {selectedOrder.status === 'deposit-paid' && selectedOrder.remainingAmount > 0 && (
                      <Button
                        className="w-full h-10 sm:h-11"
                        onClick={() => handlePayRemaining(selectedOrder.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Payer le solde ({formatPrice(selectedOrder.remainingAmount)})
                      </Button>
                    )}

                    {selectedOrder.status === 'fully-paid' && (
                      <Button
                        className="w-full h-10 sm:h-11"
                        onClick={() => handleCompleteOrder(selectedOrder.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Marquer comme terminée
                      </Button>
                    )}

                    {selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && (
                      <Button
                        variant="outline"
                        className="w-full h-10 sm:h-11"
                        onClick={() => handleCancelOrder(selectedOrder.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Annuler la commande
                      </Button>
                    )}

                    <Button
                      variant="destructive"
                      className="w-full h-10 sm:h-11"
                      onClick={() => handleDeleteOrder(selectedOrder.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer la commande
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
