
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";

// GET - Récupérer les races
export const GET = requestMiddleware(async (request) => {
  const { limit, offset, id } = parseQueryParams(request);
  const breedsCrud = new CrudOperations("breeds");

  if (id) {
    const breed = await breedsCrud.findById(id);
    if (!breed) {
      return createErrorResponse({
        errorMessage: "Race non trouvée",
        status: 404,
      });
    }
    return createSuccessResponse(breed);
  }

  const data = await breedsCrud.findMany({}, { 
    limit: limit || 100, 
    offset,
    orderBy: { column: 'name', direction: 'asc' }
  });
  return createSuccessResponse(data);
});

// POST - Créer une race
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.name) {
    return createErrorResponse({
      errorMessage: "Le nom de la race est requis",
      status: 400,
    });
  }

  const breedsCrud = new CrudOperations("breeds");
  const data = await breedsCrud.create({
    name: body.name,
    description: body.description || null,
    origin: body.origin || null,
    size: body.size || null,
    weight_min: body.weight_min || null,
    weight_max: body.weight_max || null,
    lifespan_min: body.lifespan_min || null,
    lifespan_max: body.lifespan_max || null,
    temperament: body.temperament || [],
    exercise_needs: body.exercise_needs || null,
    grooming_needs: body.grooming_needs || null,
    good_with_children: body.good_with_children ?? true,
    good_with_pets: body.good_with_pets ?? true,
    image_url: body.image_url || null,
  });

  return createSuccessResponse(data, 201);
});
