import {bffRoutes} from '@/lib/routes';
import {Module} from '@/types/modules';

export async function updateModule({moduleId, newDataModule}: {
    moduleId: string,
    newDataModule: Module
}): Promise<Module> {
    const deleteURL = `${bffRoutes.updateModuleURL}/${moduleId}`;
    return fetch(deleteURL, {
        method: 'PUT',
        body: JSON.stringify(newDataModule),
    }).then(res => {
        if (!res.ok) throw new Error('Error al eliminar módulo');
        return res.json();
    });
}
