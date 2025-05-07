import { Module } from '@/types/modules';
import { bffRoutes } from '@/lib/routes';

export async function createModule(moduleData: Module): Promise<any> {
  return fetch(bffRoutes.createModuleURL, {
    method: 'POST',
    body: JSON.stringify(moduleData),
  }).then(res => {
    if (!res.ok) throw new Error('Error al crear módulo');
    return res.json();
  });
}
