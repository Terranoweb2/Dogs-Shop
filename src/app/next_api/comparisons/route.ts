
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer la comparaison d'un utilisateur
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const user_id = searchParams.get("user_id");
  const id = searchParams.get("id");

  const comparisonsCrud = new CrudOperations("comparisons");

  if (id) {
    const comparison = await comparisonsCrud.findById(id);
    if (!comparison) {
      return createErrorResponse({
        errorMessage: "Comparaison non trouvée",
        status: 404,
      });
    }
    return createSuccessResponse(comparison);
  }

  if (!user_id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur requis",
      status: 400,
    });
  }

  const data = await comparisonsCrud.findMany(
    { user_id },
    { limit: 1, offset: 0, orderBy: { column: 'updated_at', direction: 'desc' } }
  );

  return createSuccessResponse(data?.[0] || null);
});

// POST - Créer ou mettre à jour une comparaison
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.user_id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur requis",
      status: 400,
    });
  }

  const comparisonsCrud = new CrudOperations("comparisons");
  
  // Vérifier si une comparaison existe déjà
  const existing = await comparisonsCrud.findMany(
    { user_id: body.user_id },
    { limit: 1, offset: 0 }
  );

  if (existing && existing.length > 0) {
    // Mettre à jour
    const data = await comparisonsCrud.update(existing[0].id, {
      dog_ids: body.dog_ids || [],
    });
    return createSuccessResponse(data);
  }

  // Créer
  const data = await comparisonsCrud.create({
    user_id: body.user_id,
    dog_ids: body.dog_ids || [],
  });

  return createSuccessResponse(data, 201);
});

// DELETE - Supprimer une comparaison
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID comparaison requis",
      status: 400,
    });
  }

  const comparisonsCrud = new CrudOperations("comparisons");
  const data = await comparisonsCrud.delete(id);
  return createSuccessResponse(data);
});
