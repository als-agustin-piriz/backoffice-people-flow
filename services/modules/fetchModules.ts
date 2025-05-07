import { Module } from '@/types/modules';

export async function fetchModules(): Promise<any> {
  return fetch('/api/backend/module', {
    method: 'GET',
  }).then(res => {
    if (!res.ok) throw new Error('Error al obtener los módulos');
    return res.json();
  });
}
