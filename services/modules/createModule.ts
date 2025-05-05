import { Module } from '@/types/modules';

export async function createModule(moduleData: Module): Promise<any> {
  return fetch('/api/backend/module', {
    method: 'POST',
    body: JSON.stringify(moduleData),
  }).then(res => {
    if (!res.ok) throw new Error('Error al crear módulo');
    return res.json();
  });
}
