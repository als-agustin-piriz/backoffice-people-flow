import { Submodule } from '@/types/modules';
import { bffRoutes } from '@/lib/routes';

export async function createSubModule(moduleData: Submodule): Promise<Submodule> {
  return fetch(bffRoutes.createModuleURL, {
    method: 'POST',
    body: JSON.stringify(moduleData),
  }).then(res => {
    if (!res.ok) throw new Error('Error al crear módulo');
    return res.json();
  });
}
