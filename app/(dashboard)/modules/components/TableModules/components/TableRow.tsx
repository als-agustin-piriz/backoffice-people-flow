import { Module, Submodule } from '@/types/modules';
import { useState } from 'react';
import { useModuleManager } from '@/app/hooks/useModuleManager';
import { IdCell } from './TableRow/components/IdCell';
import { ModuleInfoCell } from './TableRow/components/ModuleInfoCell';
import { PriceCell } from './TableRow/components/PriceCell';
import { CreatedDateCell } from './TableRow/components/CreatedDateCell';
import { StatusCell } from './TableRow/components/StatusCell';
import { SubmodulesCell } from './TableRow/components/SubmodulesCell';
import { SubmoduleList } from './TableRow/components/SubmoduleList';
import { ActionsCell } from './TableRow/components/ActionsCell';

type Props = {
  module: Module;
  submodules: Submodule[];
  onDelete: (m: Module) => void;
  onDeleteSubmodule: (submodule: Submodule) => Promise<boolean>;
  isLoadingDeleteSubmodule?: boolean;
  onOpenSubmodules: (m: Module) => void;
  onEditModule: (m: Module) => void;
};


export function TableRow(
  {
    module,
    submodules,
    onDelete,
    onDeleteSubmodule,
    onOpenSubmodules,
    onEditModule,
    isLoadingDeleteSubmodule = false,
  }: Props) {
  const [isActive, setIsActive] = useState(module?.isActive || false);
  const [showSubmodules, setShowSubmodules] = useState(false);
  const { onUpdateModule, loading } = useModuleManager();

  const onChangeStatus = async (status: boolean) => {
    const newModule = {
      ...module,
      isActive: status,
    };

    if (module?.id) {
      const moduleUpdated: Module | false = await onUpdateModule({
        moduleId: module.id,
        newDataModule: newModule,
      });
      if (moduleUpdated) {
        setIsActive(moduleUpdated.isActive ?? false);
      }
    }
  };

  const toggleSubmodules = () => {
    setShowSubmodules(!showSubmodules);
  };

  return (
    <>
      <tr className="hover:bg-gray-50 border-b">
        <IdCell moduleId={module?.id || ''} />
        <ModuleInfoCell name={module.name} description={module?.description || ''} />
        <PriceCell price={module.basePrice} />
        <CreatedDateCell created={module?.created || ''} />
        <StatusCell isActive={isActive} onChangeStatus={onChangeStatus} loading={loading} />
        <ActionsCell
          module={module}
          onEditModule={onEditModule}
          onDelete={onDelete}
          onOpenSubmodules={onOpenSubmodules}
        />
        <SubmodulesCell
          submodules={submodules}
          showSubmodules={showSubmodules}
          toggleSubmodules={toggleSubmodules}
        />
      </tr>
      {showSubmodules && submodules.length > 0 && (
        <SubmoduleList
          submodules={submodules}
          onDeleteSubmodule={onDeleteSubmodule}
          isLoadingDeleteSubmodule={isLoadingDeleteSubmodule}
        />
      )}
    </>
  );
}