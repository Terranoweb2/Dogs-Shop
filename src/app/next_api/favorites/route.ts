
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les favoris d'un utilisateur
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const user_id = searchParams.get("user_id");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!user_id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur requis",
      status: 400,
    });
  }

  const favoritesCrud = new CrudOperations("favorites");
  const data = await favoritesCrud.findMany(
    { user_id },
    { limit, offset, orderBy: { column: 'created_at', direction: 'desc' } }
  );

  return createSuccessResponse(data);
});

// POST - Ajouter un favori
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.user_id || !body.dog_id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur et ID chien requis",
      status: 400,
    });
  }

  const favoritesCrud = new CrudOperations("favorites");
  const data = await favoritesCrud.create({
    user_id: body.user_id,
    dog_id: body.dog_id,
  });

  return createSuccessResponse(data, 201);
});

// DELETE - Supprimer un favori
export const DELETE = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const user_id = searchParams.get("user_id");
  const dog_id = searchParams.get("dog_id");

  const favoritesCrud = new CrudOperations("favorites");

  if (id) {
    await favoritesCrud.delete(id);
    return createSuccessResponse({ id });
  }

  if (user_id && dog_id) {
    // Trouver et supprimer par user_id et dog_id
    const favorites = await favoritesCrud.findMany({ user_id, dog_id }, { limit: 1, offset: 0 });
    if (favorites && favorites.length > 0) {
      await favoritesCrud.delete(favorites[0].id);
      return createSuccessResponse({ id: favorites[0].id });
    }
    return createErrorResponse({
      errorMessage: "Favori non trouvé",
      status: 404,
    });
  }

  return createErrorResponse({
    errorMessage: "ID ou (user_id et dog_id) requis",
    status: 400,
  });
});
