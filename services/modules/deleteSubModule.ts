import { bffRoutes } from '@/lib/routes';

export async function deleteSubModule(subModuleId: string): Promise<boolean> {
  const deleteURL = `${bffRoutes.subModuleURL}/${subModuleId}`;
  return fetch(deleteURL, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) throw new Error('Error al eliminar submódulo');
    return res.json();
  });
}
