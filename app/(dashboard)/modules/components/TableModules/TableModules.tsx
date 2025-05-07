'use client';

import { useMemo, useState } from 'react';
import { Button, Chip, Tooltip } from '@heroui/react';
import { ChevronLeftIcon, ChevronRightIcon, PlusCircleIcon } from 'lucide-react';
import { Module, Submodule } from '@/types/modules';

type Props = {
  openSubmoduleView: (module: Module) => void;
  modules: Module[];
  submodules: Submodule[];
  itemsPerPage?: number;
};

export default function TableModules(
  {
    openSubmoduleView,
    modules,
    submodules,
    itemsPerPage = 5,
  }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(modules.length / itemsPerPage);

  const currentModules = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return modules.slice(startIndex, endIndex);
  }, [modules, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full min-h-[500px] w-full justify-between">
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
          {currentModules.map((module) => {
            const moduleSubmodules = submodules.filter(
              (sub) => sub.moduleId === module.id,
            );

            return (
              <tr key={module.id} className="hover:bg-gray-50 border-b">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-sm">{module.name}</div>
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

      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 border-t">
          <div className="text-sm text-gray-500">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, modules.length)} de {modules.length} módulos
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="flat"
              isDisabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}
              startContent={<ChevronLeftIcon size={16} />}
            >
              Anterior
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  size="sm"
                  variant={page === currentPage ? 'solid' : 'flat'}
                  color={page === currentPage ? 'primary' : 'default'}
                  onPress={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              size="sm"
              variant="flat"
              isDisabled={currentPage === totalPages}
              onPress={() => handlePageChange(currentPage + 1)}
              endContent={<ChevronRightIcon size={16} />}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}