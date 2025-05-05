import { fetchApiWithAuth } from '@/lib/fetchApiWithAuth';
import { withAuthToken } from '@/lib/withAuthToken';

export const POST = withAuthToken(async (req: any, { accessToken }) => {
  const body = await req.json();

  const data = await fetchApiWithAuth(`${process.env.NEXTAPI_URL}/modules`, accessToken, {
    method: 'POST',
    body,
  });

  return Response.json(data);
});
