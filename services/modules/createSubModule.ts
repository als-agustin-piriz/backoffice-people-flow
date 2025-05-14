import { Submodule } from '@/types/modules';
import { bffRoutes } from '@/lib/routes';

export async function createSubModule(subModuleData: Submodule): Promise<Submodule> {
  return fetch(bffRoutes.createSubModuleURL, {
    method: 'POST',
    body: JSON.stringify(subModuleData),
  }).then(res => {
    if (!res.ok) throw new Error('Error al crear módulo');
    return res.json();
  });
}
