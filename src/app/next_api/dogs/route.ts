
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les annonces de chiens
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const breed_name = searchParams.get("breed_name");
  const city = searchParams.get("city");
  const gender = searchParams.get("gender");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const seller_id = searchParams.get("seller_id");

  const dogsCrud = new CrudOperations("dogs");

  if (id) {
    const dog = await dogsCrud.findById(id);
    if (!dog) {
      return createErrorResponse({
        errorMessage: "Annonce non trouvée",
        status: 404,
      });
    }
    return createSuccessResponse(dog);
  }

  // Construire les filtres
  const filters: Record<string, any> = {};
  if (status) filters.status = status;
  if (breed_name) filters.breed_name = breed_name;
  if (city) filters.city = city;
  if (gender) filters.gender = gender;
  if (seller_id) filters.seller_id = seller_id;

  const data = await dogsCrud.findMany(filters, { 
    limit, 
    offset,
    orderBy: { column: 'created_at', direction: 'desc' }
  });

  return createSuccessResponse(data);
});

// POST - Créer une annonce
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.name || !body.breed_name || !body.price) {
    return createErrorResponse({
      errorMessage: "Nom, race et prix sont requis",
      status: 400,
    });
  }

  const dogsCrud = new CrudOperations("dogs");
  const data = await dogsCrud.create({
    seller_id: body.seller_id || null,
    breed_id: body.breed_id || null,
    name: body.name,
    breed_name: body.breed_name,
    age_months: body.age_months || 0,
    gender: body.gender || 'male',
    price: body.price,
    description: body.description || null,
    health_status: body.health_status || null,
    vaccinated: body.vaccinated || false,
    microchipped: body.microchipped || false,
    dewormed: body.dewormed || false,
    pedigree: body.pedigree || false,
    lof_certified: body.lof_certified || false,
    lof_number: body.lof_number || null,
    images: body.images || [],
    video_url: body.video_url || null,
    location: body.location || null,
    city: body.city || null,
    postal_code: body.postal_code || null,
    latitude: body.latitude || null,
    longitude: body.longitude || null,
    status: 'available',
    views_count: 0,
    featured: body.featured || false,
  });

  return createSuccessResponse(data, 201);
});

// PUT - Mettre à jour une annonce
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID annonce requis",
      status: 400,
    });
  }

  const body = await validateRequestBody(request);
  const dogsCrud = new CrudOperations("dogs");

  const existing = await dogsCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Annonce non trouvée",
      status: 404,
    });
  }

  const data = await dogsCrud.update(id, body);
  return createSuccessResponse(data);
});

// DELETE - Supprimer une annonce
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID annonce requis",
      status: 400,
    });
  }

  const dogsCrud = new CrudOperations("dogs");

  const existing = await dogsCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Annonce non trouvée",
      status: 404,
    });
  }

  const data = await dogsCrud.delete(id);
  return createSuccessResponse(data);
});
