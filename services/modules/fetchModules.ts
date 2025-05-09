import { ModuleDTO } from '@/types/modules';

export async function fetchModules(): Promise<ModuleDTO> {
  return fetch('/api/backend/module', {
    method: 'GET',
  }).then(res => {
    if (!res.ok) return null;
    return res.json();
  });
}
