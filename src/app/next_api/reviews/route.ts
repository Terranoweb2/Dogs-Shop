
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les avis
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const reviewed_user_id = searchParams.get("reviewed_user_id");
  const reviewer_id = searchParams.get("reviewer_id");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const reviewsCrud = new CrudOperations("reviews");

  if (id) {
    const review = await reviewsCrud.findById(id);
    if (!review) {
      return createErrorResponse({
        errorMessage: "Avis non trouvé",
        status: 404,
      });
    }
    return createSuccessResponse(review);
  }

  const filters: Record<string, any> = {};
  if (reviewed_user_id) filters.reviewed_user_id = reviewed_user_id;
  if (reviewer_id) filters.reviewer_id = reviewer_id;

  const data = await reviewsCrud.findMany(filters, { 
    limit, 
    offset,
    orderBy: { column: 'created_at', direction: 'desc' }
  });

  return createSuccessResponse(data);
});

// POST - Créer un avis
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.reviewed_user_id || !body.rating) {
    return createErrorResponse({
      errorMessage: "ID utilisateur évalué et note requis",
      status: 400,
    });
  }

  if (body.rating < 1 || body.rating > 5) {
    return createErrorResponse({
      errorMessage: "La note doit être entre 1 et 5",
      status: 400,
    });
  }

  const reviewsCrud = new CrudOperations("reviews");
  const data = await reviewsCrud.create({
    reviewer_id: body.reviewer_id || null,
    reviewed_user_id: body.reviewed_user_id,
    order_id: body.order_id || null,
    rating: body.rating,
    title: body.title || null,
    comment: body.comment || null,
  });

  return createSuccessResponse(data, 201);
});

// PUT - Répondre à un avis
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID avis requis",
      status: 400,
    });
  }

  const body = await validateRequestBody(request);
  const reviewsCrud = new CrudOperations("reviews");

  const existing = await reviewsCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Avis non trouvé",
      status: 404,
    });
  }

  const data = await reviewsCrud.update(id, {
    response: body.response,
    response_at: new Date().toISOString(),
  });

  return createSuccessResponse(data);
});
