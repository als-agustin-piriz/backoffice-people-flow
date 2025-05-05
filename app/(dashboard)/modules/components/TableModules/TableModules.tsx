'use client';

import { Button, Chip, Tooltip } from '@heroui/react';
import { PlusCircleIcon } from 'lucide-react';
import { Module, Submodule } from '@/types/modules';

type Props = {
  openSubmoduleView: (module: Module) => void;
  modules: Module[];
  submodules: Submodule[];
};

export default function TableModules({ openSubmoduleView, modules, submodules }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
          <tr className="bg-gray-50 border-b">
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submódulos
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de creación
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
          </thead>
          <tbody>
          {modules.map((module) => {
            const moduleSubmodules = submodules.filter(
              (sub) => sub.moduleId === module.id,
            );

            return (
              <tr key={module.id} className="hover:bg-gray-50 border-b">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{module.name}</div>
                  {module.description && (
                    <div className="text-sm text-gray-500">
                      {module.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {module.id}
                  </code>
                </td>
                <td className="px-6 py-4">
                  {moduleSubmodules.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {moduleSubmodules.map((submodule) => (
                        <Tooltip
                          key={submodule.id}
                          content={'Sin descripción'}
                        >
                          <Chip
                            color="warning"
                            variant="flat"
                            size="sm"
                          >
                            {submodule.name}
                          </Chip>
                        </Tooltip>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">
                        Sin submódulos
                      </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(module.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    onPress={() => openSubmoduleView(module)}
                    startContent={<PlusCircleIcon size={14} />}
                  >
                    Agregar submódulo
                  </Button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
