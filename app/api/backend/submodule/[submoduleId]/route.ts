import { fetchApiWithAuth } from '@/lib/fetchApiWithAuth';
import { apiRoutes } from '@/lib/routes';
import { NextResponse } from 'next/server';

export const DELETE = async (
  _req: NextResponse,
  { params }: { params: { submoduleId: string } },
) => {
  const { submoduleId } = params;

  if (!submoduleId) {
    return NextResponse.json({ error: 'Missing submoduleId' }, { status: 400 });
  }

  try {
    const backendDeleteUrl = `${apiRoutes.modules.deleteSubmodule}/${submoduleId}`;
    const data = await fetchApiWithAuth(backendDeleteUrl, {
      method: 'DELETE',
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting module', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
};
