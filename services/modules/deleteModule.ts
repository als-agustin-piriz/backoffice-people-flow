import { bffRoutes } from '@/lib/routes';

export async function deleteModule(moduleId: number): Promise<boolean> {
  const deleteURL = `${bffRoutes.deleteModuleURL}/${moduleId}`;
  return fetch(deleteURL, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) throw new Error('Error al eliminar módulo');
    return res.json();
  });
}
