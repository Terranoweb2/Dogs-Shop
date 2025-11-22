
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les notifications d'un utilisateur
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const user_id = searchParams.get("user_id");
  const unread_only = searchParams.get("unread_only") === "true";
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!user_id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur requis",
      status: 400,
    });
  }

  const notificationsCrud = new CrudOperations("notifications");
  const filters: Record<string, any> = { user_id };

  const data = await notificationsCrud.findMany(filters, { 
    limit, 
    offset,
    orderBy: { column: 'created_at', direction: 'desc' }
  });

  // Filtrer les non lues si demandé
  const result = unread_only 
    ? data?.filter((n: any) => !n.read_at)
    : data;

  return createSuccessResponse(result);
});

// POST - Créer une notification
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.user_id || !body.type || !body.title) {
    return createErrorResponse({
      errorMessage: "ID utilisateur, type et titre requis",
      status: 400,
    });
  }

  const notificationsCrud = new CrudOperations("notifications");
  const data = await notificationsCrud.create({
    user_id: body.user_id,
    type: body.type,
    title: body.title,
    content: body.content || null,
    link: body.link || null,
  });

  return createSuccessResponse(data, 201);
});

// PUT - Marquer une notification comme lue
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID notification requis",
      status: 400,
    });
  }

  const notificationsCrud = new CrudOperations("notifications");
  const data = await notificationsCrud.update(id, {
    read_at: new Date().toISOString(),
  });

  return createSuccessResponse(data);
});

// DELETE - Supprimer une notification
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID notification requis",
      status: 400,
    });
  }

  const notificationsCrud = new CrudOperations("notifications");
  const data = await notificationsCrud.delete(id);
  return createSuccessResponse(data);
});
