
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les commandes
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const buyer_id = searchParams.get("buyer_id");
  const seller_id = searchParams.get("seller_id");
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const ordersCrud = new CrudOperations("orders");

  if (id) {
    const order = await ordersCrud.findById(id);
    if (!order) {
      return createErrorResponse({
        errorMessage: "Commande non trouvée",
        status: 404,
      });
    }
    return createSuccessResponse(order);
  }

  const filters: Record<string, any> = {};
  if (buyer_id) filters.buyer_id = buyer_id;
  if (seller_id) filters.seller_id = seller_id;
  if (status) filters.status = status;

  const data = await ordersCrud.findMany(filters, { 
    limit, 
    offset,
    orderBy: { column: 'created_at', direction: 'desc' }
  });

  return createSuccessResponse(data);
});

// POST - Créer une commande
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.dog_id || !body.dog_name || !body.dog_price) {
    return createErrorResponse({
      errorMessage: "Informations du chien requises",
      status: 400,
    });
  }

  const ordersCrud = new CrudOperations("orders");
  const depositAmount = body.deposit_amount || body.dog_price * 0.3;

  const data = await ordersCrud.create({
    buyer_id: body.buyer_id || null,
    seller_id: body.seller_id || null,
    dog_id: body.dog_id,
    dog_name: body.dog_name,
    dog_breed: body.dog_breed || '',
    dog_price: body.dog_price,
    deposit_amount: depositAmount,
    total_amount: body.dog_price,
    status: 'pending',
    payment_method: body.payment_method || null,
    payment_id: body.payment_id || null,
    buyer_name: body.buyer_name || null,
    buyer_email: body.buyer_email || null,
    buyer_phone: body.buyer_phone || null,
    buyer_address: body.buyer_address || null,
    notes: body.notes || null,
    pickup_date: body.pickup_date || null,
  });

  return createSuccessResponse(data, 201);
});

// PUT - Mettre à jour une commande
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID commande requis",
      status: 400,
    });
  }

  const body = await validateRequestBody(request);
  const ordersCrud = new CrudOperations("orders");

  const existing = await ordersCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Commande non trouvée",
      status: 404,
    });
  }

  const data = await ordersCrud.update(id, body);
  return createSuccessResponse(data);
});

// DELETE - Supprimer une commande
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID commande requis",
      status: 400,
    });
  }

  const ordersCrud = new CrudOperations("orders");

  const existing = await ordersCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Commande non trouvée",
      status: 404,
    });
  }

  const data = await ordersCrud.delete(id);
  return createSuccessResponse(data);
});
