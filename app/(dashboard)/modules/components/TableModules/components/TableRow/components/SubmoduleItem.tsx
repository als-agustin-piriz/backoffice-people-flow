import { Submodule } from '@/types/modules';
import { useState } from 'react';
import { Button } from '@heroui/react';
import { Archive } from 'lucide-react';

interface SubmoduleItemProps {
  submodule: Submodule;
  onDeleteSubmodule: (submodule: Submodule) => Promise<boolean>;
  isLoadingDeleteSubmodule?: boolean;
}

export const SubmoduleItem = (
  {
    submodule,
    onDeleteSubmodule,
    isLoadingDeleteSubmodule = false,
  }: SubmoduleItemProps) => {
  const [deleteSubModuleQuestion, setDeleteSubModuleQuestion] = useState(false);

  const handleDeleteSubmodule = () => {
    setDeleteSubModuleQuestion(true);
  };

  const confirmDeleteSubmodule = async () => {
    const wasDeletedSubmodule = await onDeleteSubmodule(submodule);
    if (wasDeletedSubmodule) setDeleteSubModuleQuestion(false);
  };

  return (
    <li
      className="flex items-center justify-between
      text-sm py-1 px-2 rounded hover:bg-gray-100
      cursor-pointer md:w-3/4 w-full p-4"
    >
      {submodule.name}
      <div>
        {deleteSubModuleQuestion && (
          <div className="flex whitespace-nowrap items-center m-3 gap-2">
            <p className="font-bold">¿Eliminar submódulo?</p>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onPress={confirmDeleteSubmodule}
              startContent={<Archive size={14} />}
              isLoading={isLoadingDeleteSubmodule}
            >
              Si, eliminar
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onPress={() => setDeleteSubModuleQuestion(false)}
              startContent={<Archive size={14} />}
            >
              Cancelar
            </Button>
          </div>
        )}
        {!deleteSubModuleQuestion && (
          <div className="m-3">
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onPress={handleDeleteSubmodule}
              startContent={<Archive size={14} />}
            >Eliminar submódulo</Button>
          </div>
        )}
      </div>
    </li>
  );
};

