
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les recherches sauvegardées
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const user_id = searchParams.get("user_id");
  const id = searchParams.get("id");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const savedSearchesCrud = new CrudOperations("saved_searches");

  if (id) {
    const search = await savedSearchesCrud.findById(id);
    if (!search) {
      return createErrorResponse({
        errorMessage: "Recherche non trouvée",
        status: 404,
      });
    }
    return createSuccessResponse(search);
  }

  if (!user_id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur requis",
      status: 400,
    });
  }

  const data = await savedSearchesCrud.findMany(
    { user_id },
    { limit, offset, orderBy: { column: 'created_at', direction: 'desc' } }
  );

  return createSuccessResponse(data);
});

// POST - Sauvegarder une recherche
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.user_id || !body.filters) {
    return createErrorResponse({
      errorMessage: "ID utilisateur et filtres requis",
      status: 400,
    });
  }

  const savedSearchesCrud = new CrudOperations("saved_searches");
  const data = await savedSearchesCrud.create({
    user_id: body.user_id,
    name: body.name || 'Recherche sans nom',
    filters: body.filters,
    notify_new_matches: body.notify_new_matches ?? true,
  });

  return createSuccessResponse(data, 201);
});

// DELETE - Supprimer une recherche sauvegardée
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID recherche requis",
      status: 400,
    });
  }

  const savedSearchesCrud = new CrudOperations("saved_searches");
  const data = await savedSearchesCrud.delete(id);
  return createSuccessResponse(data);
});
