import { fetchApiWithAuth } from '@/lib/fetchApiWithAuth';
import { apiRoutes } from '@/lib/routes';
import { NextResponse } from 'next/server';

export const DELETE = async (
  _req: NextResponse,
  { params }: { params: { moduleId: string } },
) => {
  const { moduleId } = params;

  console.log('params', params);
  if (!moduleId) {
    return NextResponse.json({ error: 'Missing moduleId' }, { status: 400 });
  }

  try {
    const backendDeleteUrl = `${apiRoutes.modules.deleteModule}/${moduleId}`;
    const data = await fetchApiWithAuth(backendDeleteUrl, {
      method: 'DELETE',
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting module', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
};

export const PUT = async (
  _req: NextResponse,
  { params }: { params: { companyId: string } },
) => {
  const { companyId } = params;
  const body = await _req.json();

  if (!companyId) {
    return NextResponse.json({ error: 'Missing companyId' }, { status: 400 });
  }

  try {
    const backendUpdateURL = `${apiRoutes.companies.updateCompany}/${companyId}`;
    const data = await fetchApiWithAuth(backendUpdateURL, {
      method: 'PUT',
      body,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting module', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
};
