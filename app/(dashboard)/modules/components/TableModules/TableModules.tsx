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
  onEditModule: (module: Module) => void;
  onDeleteModule: (module: Module) => Promise<boolean>;
  isLoadingDeleteSubmodule?: boolean;
  onDeleteSubmodule: (submodule: Submodule) => Promise<boolean>;
  modules: Module[];
  itemsPerPage?: number;
  loadingDelete?: boolean
};

export default function TableModules(
  {
    openSubmoduleView,
    onDeleteModule,
    onDeleteSubmodule,
    isLoadingDeleteSubmodule = false,
    onEditModule,
    modules,
    itemsPerPage = 5,
    loadingDelete = false,
  }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const { isOpen, onOpenModal, onClose, backdrop } = useModal();

  const totalPages = Math.ceil(modules.length / itemsPerPage);
  const currentModules = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return modules.slice(start, start + itemsPerPage);
  }, [modules, currentPage, itemsPerPage]);

  const handleDelete = (module: Module) => {
    setModuleToDelete(module);
    onOpenModal();
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
              submodules={module.submodules || []}
              onDelete={handleDelete}
              onDeleteSubmodule={onDeleteSubmodule}
              isLoadingDeleteSubmodule={isLoadingDeleteSubmodule}
              onOpenSubmodules={openSubmoduleView}
              onEditModule={onEditModule}
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
        description={
          <div className="flex gap-1 w-full">
            <p>¿Eliminar</p>
            <p className="font-bold">{moduleToDelete?.name}</p>
            <p>?</p>
          </div>
        }
        onAction={confirmDelete}
        actionLabel="Confirmar"
        actionColor="danger"
        isLoading={loadingDelete}
      />
    </div>
  );
}
