
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les messages d'une conversation
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const conversation_id = searchParams.get("conversation_id");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!conversation_id) {
    return createErrorResponse({
      errorMessage: "ID conversation requis",
      status: 400,
    });
  }

  const messagesCrud = new CrudOperations("messages");
  const data = await messagesCrud.findMany(
    { conversation_id },
    { limit, offset, orderBy: { column: 'created_at', direction: 'asc' } }
  );

  return createSuccessResponse(data);
});

// POST - Envoyer un message
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.conversation_id || !body.sender_id || !body.content) {
    return createErrorResponse({
      errorMessage: "ID conversation, ID expéditeur et contenu requis",
      status: 400,
    });
  }

  const messagesCrud = new CrudOperations("messages");
  const data = await messagesCrud.create({
    conversation_id: body.conversation_id,
    sender_id: body.sender_id,
    content: body.content,
  });

  // Mettre à jour last_message_at de la conversation
  const conversationsCrud = new CrudOperations("conversations");
  await conversationsCrud.update(body.conversation_id, {
    last_message_at: new Date().toISOString(),
  });

  return createSuccessResponse(data, 201);
});

// PUT - Marquer un message comme lu
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID message requis",
      status: 400,
    });
  }

  const messagesCrud = new CrudOperations("messages");
  const data = await messagesCrud.update(id, {
    read_at: new Date().toISOString(),
  });

  return createSuccessResponse(data);
});
