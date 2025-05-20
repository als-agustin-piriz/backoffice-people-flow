import { fetchApiWithAuth } from '@/lib/fetchApiWithAuth';
import { apiRoutes } from '@/lib/routes';

export const POST = async (req: Request) => {
  const body = await req.json();

  const data = await fetchApiWithAuth(apiRoutes.companies.createCompany, {
    method: 'POST',
    body,
  });

  return Response.json(data);
};

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const search = url.search;

  const data = await fetchApiWithAuth(
    `${apiRoutes.companies.getCompanies}${search}`,
  );

  return Response.json(data);
};