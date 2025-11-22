
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// GET - Récupérer les conversations d'un utilisateur
export const GET = requestMiddleware(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const user_id = searchParams.get("user_id");
  const id = searchParams.get("id");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const conversationsCrud = new CrudOperations("conversations");

  if (id) {
    const conversation = await conversationsCrud.findById(id);
    if (!conversation) {
      return createErrorResponse({
        errorMessage: "Conversation non trouvée",
        status: 404,
      });
    }
    return createSuccessResponse(conversation);
  }

  if (!user_id) {
    return createErrorResponse({
      errorMessage: "ID utilisateur requis",
      status: 400,
    });
  }

  // Récupérer les conversations où l'utilisateur est participant
  const data = await conversationsCrud.findMany(
    {},
    { limit, offset, orderBy: { column: 'last_message_at', direction: 'desc' } }
  );

  // Filtrer côté serveur pour les conversations de l'utilisateur
  const userConversations = data?.filter(
    (conv: any) => conv.participant_1_id === user_id || conv.participant_2_id === user_id
  );

  return createSuccessResponse(userConversations);
});

// POST - Créer une conversation
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);

  if (!body.participant_1_id || !body.participant_2_id) {
    return createErrorResponse({
      errorMessage: "Les deux participants sont requis",
      status: 400,
    });
  }

  const conversationsCrud = new CrudOperations("conversations");
  const data = await conversationsCrud.create({
    participant_1_id: body.participant_1_id,
    participant_2_id: body.participant_2_id,
    dog_id: body.dog_id || null,
  });

  return createSuccessResponse(data, 201);
});
