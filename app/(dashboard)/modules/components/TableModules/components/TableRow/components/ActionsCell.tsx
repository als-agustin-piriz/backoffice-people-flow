import { Module } from '@/types/modules';
import { Button } from '@heroui/react';
import { Archive, Pencil, PlusCircleIcon } from 'lucide-react';

export const ActionsCell = (
  {
    module,
    onEditModule,
    onDelete,
    onOpenSubmodules,
  }: {
    module: Module;
    onEditModule: (m: Module) => void;
    onDelete: (m: Module) => void;
    onOpenSubmodules: (m: Module) => void;
  }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        color="default"
        variant="flat"
        onPress={() => onEditModule(module)}
        startContent={<Pencil size={14} />}
      >
        Editar módulo
      </Button>
      <Button
        size="sm"
        color="danger"
        variant="flat"
        onPress={() => onDelete(module)}
        startContent={<Archive size={14} />}
      >
        Eliminar módulo
      </Button>
      <Button
        size="sm"
        color="primary"
        variant="flat"
        onPress={() => onOpenSubmodules(module)}
        startContent={<PlusCircleIcon size={14} />}
      >
        Agregar submódulo
      </Button>
    </div>
  </td>
);