import { addToast, Button, Chip, Switch } from '@heroui/react';
import { CopyIcon, PlusCircleIcon } from 'lucide-react';
import { Module, Submodule } from '@/types/modules';
import { useState } from 'react';
import { useModuleManager } from '@/app/(dashboard)/modules/hooks/useModuleManager';

type Props = {
  module: Module;
  submodules: Submodule[];
  onDelete: (m: Module) => void;
  onOpenSubmodules: (m: Module) => void;
};

export function TableRow({ module, submodules, onDelete, onOpenSubmodules }: Props) {
  const moduleSubmodules = submodules.filter((s) => s.moduleId === module.id);
  const [isActive, setIsActive] = useState(module.isActive);
  const { onUpdateModule } = useModuleManager();

  const onChangeStatus = async (status: boolean) => {
    const newModule = {
      ...module,
      isActive: status,
    };

    if (module?.id) {
      const moduleUpdated = await onUpdateModule({ moduleId: module.id, newDataModule: newModule });
      if (moduleUpdated) {
        setIsActive(moduleUpdated.isActive);
      }
    }
  };

  const handleCopyId = async () => {
    try {
      if (module?.id) {
        await navigator.clipboard.writeText(module.id);
        addToast({
          title: 'Copiado al portapapeles',
          color: 'success',
        });
      }
    } catch (err) {
      console.error('Error al copiar el ID:', err);
    }
  };


  return (
    <tr className="hover:bg-gray-50 border-b">
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          type="button"
          onClick={handleCopyId}
          className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          <span className="font-mono">{module?.id && module.id.slice(0, 4)}...</span>
          <CopyIcon size={14} />
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-sm">{module.name}</div>
        {module.description && (
          <div className="text-sm text-gray-500">{module.description}</div>
        )}
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
      <td>
        <Switch
          isSelected={isActive}
          onValueChange={onChangeStatus}
          color="success"
          size="sm"
        >
          <p className="text-sm">{isActive ? 'Activo' : 'Inactivo'}</p>
        </Switch>
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
