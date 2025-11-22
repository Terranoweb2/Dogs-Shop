
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les signalements
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const reportsCrud = new CrudOperations("reports");

  if (id) {
    const report = await reportsCrud.findById(id);
    if (!report) {
      return createErrorResponse({
        errorMessage: "Signalement non trouvé",
        status: 404,
      });
    }
    return createSuccessResponse(report);
  }

  const filters: Record<string, any> = {};
  if (status) filters.status = status;

  const data = await reportsCrud.findMany(filters, { 
    limit, 
    offset,
    orderBy: { column: 'created_at', direction: 'desc' }
  });

  return createSuccessResponse(data);
});

// POST - Créer un signalement
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.reason) {
    return createErrorResponse({
      errorMessage: "Raison du signalement requise",
      status: 400,
    });
  }

  if (!body.reported_user_id && !body.dog_id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur ou ID annonce requis",
      status: 400,
    });
  }

  const reportsCrud = new CrudOperations("reports");
  const data = await reportsCrud.create({
    reporter_id: body.reporter_id || null,
    reported_user_id: body.reported_user_id || null,
    dog_id: body.dog_id || null,
    reason: body.reason,
    description: body.description || null,
    status: 'pending',
  });

  return createSuccessResponse(data, 201);
});

// PUT - Mettre à jour un signalement (admin)
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID signalement requis",
      status: 400,
    });
  }

  const body = await validateRequestBody(request);
  const reportsCrud = new CrudOperations("reports");

  const existing = await reportsCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Signalement non trouvé",
      status: 404,
    });
  }

  const updateData: Record<string, any> = {};
  if (body.status) updateData.status = body.status;
  if (body.admin_notes) updateData.admin_notes = body.admin_notes;
  if (body.status === 'resolved' || body.status === 'dismissed') {
    updateData.resolved_at = new Date().toISOString();
  }

  const data = await reportsCrud.update(id, updateData);
  return createSuccessResponse(data);
});
