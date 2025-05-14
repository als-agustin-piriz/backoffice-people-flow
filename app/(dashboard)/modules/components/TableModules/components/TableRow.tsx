import { Button, Chip } from '@heroui/react';
import { PlusCircleIcon } from 'lucide-react';
import { Module, Submodule } from '@/types/modules';

type Props = {
  module: Module;
  submodules: Submodule[];
  onDelete: (m: Module) => void;
  onOpenSubmodules: (m: Module) => void;
};

export function TableRow({ module, submodules, onDelete, onOpenSubmodules }: Props) {
  const moduleSubmodules = submodules.filter((s) => s.moduleId === module.id);

  return (
    <tr className="hover:bg-gray-50 border-b">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-sm">{module.name}</div>
        {module.description && (
          <div className="text-sm text-gray-500">{module.description}</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <code className="bg-gray-100 px-2 py-1 rounded text-sm">{module.id}</code>
      </td>
      <td className="px-6 py-4">
        {moduleSubmodules.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {moduleSubmodules.map((sub) => (
              <Chip key={sub.id} color="warning" variant="flat" size="sm">
                {sub.name}
              </Chip>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Sin submódulos</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <code className="px-2 py-1 rounded text-sm">${module.basePrice}</code>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {module.created &&
          new Date(module.created).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            color="primary"
            variant="flat"
            onPress={() => onOpenSubmodules(module)}
            startContent={<PlusCircleIcon size={14} />}
          >
            Agregar submódulo
          </Button>
          <Button
            size="sm"
            color="danger"
            variant="flat"
            onPress={() => onDelete(module)}
            startContent={<PlusCircleIcon size={14} />}
          >
            Eliminar módulo
          </Button>
        </div>
      </td>
    </tr>
  );
}
