
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";

// GET - Récupérer les utilisateurs
export const GET = requestMiddleware(async (request) => {
  const { limit, offset, id } = parseQueryParams(request);
  const usersCrud = new CrudOperations("users");

  if (id) {
    const user = await usersCrud.findById(id);
    if (!user) {
      return createErrorResponse({
        errorMessage: "Utilisateur non trouvé",
        status: 404,
      });
    }
    return createSuccessResponse(user);
  }

  const data = await usersCrud.findMany({}, { limit, offset });
  return createSuccessResponse(data);
});

// POST - Créer un utilisateur
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.email || !body.full_name) {
    return createErrorResponse({
      errorMessage: "Email et nom complet sont requis",
      status: 400,
    });
  }

  const usersCrud = new CrudOperations("users");
  const data = await usersCrud.create({
    email: body.email,
    password_hash: body.password_hash || '',
    full_name: body.full_name,
    phone: body.phone || null,
    avatar_url: body.avatar_url || null,
    address: body.address || null,
    city: body.city || null,
    postal_code: body.postal_code || null,
    country: body.country || 'France',
    is_breeder: body.is_breeder || false,
    breeder_name: body.breeder_name || null,
    breeder_description: body.breeder_description || null,
    breeder_siret: body.breeder_siret || null,
    breeder_verified: false,
  });

  return createSuccessResponse(data, 201);
});

// PUT - Mettre à jour un utilisateur
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur requis",
      status: 400,
    });
  }

  const body = await validateRequestBody(request);
  const usersCrud = new CrudOperations("users");

  const existing = await usersCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Utilisateur non trouvé",
      status: 404,
    });
  }

  const data = await usersCrud.update(id, body);
  return createSuccessResponse(data);
});

// DELETE - Supprimer un utilisateur
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur requis",
      status: 400,
    });
  }

  const usersCrud = new CrudOperations("users");

  const existing = await usersCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Utilisateur non trouvé",
      status: 404,
    });
  }

  const data = await usersCrud.delete(id);
  return createSuccessResponse(data);
});
