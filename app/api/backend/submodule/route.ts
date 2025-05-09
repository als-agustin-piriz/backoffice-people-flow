import { fetchApiWithAuth } from '@/lib/fetchApiWithAuth';
import { apiRoutes } from '@/lib/routes';

export const POST = async (req: Request) => {
  const body = await req.json();

  const data = await fetchApiWithAuth(apiRoutes.modules.createSubModule, {
    method: 'POST',
    body,
  });

  return Response.json(data);
};