'use client';

import { useMemo, useState } from 'react';
import { Module, Submodule } from '@/types/modules';
import { useModal } from '@/hooks/useModal';
import { ModalComponent } from '@/components/ModalComponent/ModalComponent';
import { TablePagination } from '@/app/(dashboard)/modules/components/TableModules/components/TablePagination';
import { TableRow } from '@/app/(dashboard)/modules/components/TableModules/components/TableRow';
import { TableHeader } from '@/app/(dashboard)/modules/components/TableModules/components/TableHeader';

type Props = {
  openSubmoduleView: (module: Module) => void;
  onDeleteModule: (module: Module) => Promise<boolean>;
  modules: Module[];
  submodules: Submodule[];
  itemsPerPage?: number;
  loadingDelete?: boolean
};

export default function TableModules(
  {
    openSubmoduleView,
    onDeleteModule,
    modules,
    submodules,
    itemsPerPage = 5,
    loadingDelete = false,
  }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const { isOpen, onOpen, onClose, backdrop } = useModal();

  const totalPages = Math.ceil(modules.length / itemsPerPage);
  const currentModules = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return modules.slice(start, start + itemsPerPage);
  }, [modules, currentPage, itemsPerPage]);

  const handleDelete = (module: Module) => {
    setModuleToDelete(module);
    onOpen();
  };

  const confirmDelete = async () => {
    if (moduleToDelete) {
      const wasDeleted = await onDeleteModule(moduleToDelete);
      if (wasDeleted) onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full min-h-[500px] w-full justify-between">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader />
          <tbody>
          {currentModules.map((module) => (
            <TableRow
              key={module.id}
              module={module}
              submodules={submodules}
              onDelete={handleDelete}
              onOpenSubmodules={openSubmoduleView}
            />
          ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={modules.length}
          itemsPerPage={itemsPerPage}
        />
      )}

      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        backdrop={backdrop}
        title="Eliminar módulo"
        description={<p>¿Estás seguro de que querés eliminar el módulo?</p>}
        onAction={confirmDelete}
        actionLabel="Confirmar"
        actionColor="danger"
        isLoading={loadingDelete}
      />
    </div>
  );
}
