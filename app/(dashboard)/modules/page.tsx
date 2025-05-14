'use client';
import { useEffect, useState } from 'react';
import { addToast, Button, Card } from '@heroui/react';
import { ChevronLeftIcon, PlusIcon } from 'lucide-react';
import { NewModuleForm } from '@/app/(dashboard)/modules/components/NewModuleForm/NewModuleForm';
import { SubmoduleForm } from '@/app/(dashboard)/modules/components/SubModuleForm/SubmoduleForm';
import TableModules from '@/app/(dashboard)/modules/components/TableModules/TableModules';
import { Module, Submodule, ViewState } from '@/types/modules';
import NoModulesContent from '@/app/(dashboard)/modules/components/NoModulesContent/NoModulesContent';
import { useModuleManager } from '@/app/(dashboard)/modules/hooks/useModuleManager';
import TableModulesSkeleton from '@/app/(dashboard)/modules/components/TableModulesSkeleton/TableModulesSkeleton';


export default function ModulesPage() {
  const [viewState, setViewState] = useState<ViewState>('list');
  const [currentModule, setCurrentModule] = useState<Module | null>(null);

  const {
    saveModule,
    modules,
    submodules,
    addSubModule,
    loadingModules,
    onDeleteModule,
    loadingDelete,
  } = useModuleManager();

  const shouldShowNewModuleButton = viewState === 'list' && modules.length > 0;

  const handleSaveModule = async (moduleData: Omit<Module, 'id' | 'createdAt'>) => {
    const newModule: Module = {
      ...moduleData,
    };
    const moduleSaved: Module | null = await saveModule(newModule);
    if (moduleSaved) {
      addToast({
        title: 'Módulo creado',
        color: 'success',
      });
      setCurrentModule(moduleSaved);
      setViewState('list');
    }
  };

  const handleAddSubmodule = async (submodule: Submodule) => {
    if (currentModule?.id) {
      const newSubmodule: Submodule = {
        ...submodule,
        moduleId: currentModule.id,
      };
      const subModuleUpdated: Submodule | null = await addSubModule(newSubmodule);
      if (subModuleUpdated) {
        addToast({
          title: `Submódulo "${subModuleUpdated.name}" agregado al módulo "${currentModule.name}"`,
          color: 'success',
        });
      }
      setViewState('list');
    }
  };

  useEffect(() => {
    if (loadingModules) setViewState('loading');
    else setViewState('list');
  }, [loadingModules]);

  const openSubmoduleView = (module: Module) => {
    setCurrentModule(module);
    setViewState('add-submodule');
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-4 px-1">
        <h1 className="text-2xl font-bold">Gestión de Módulos</h1>
        <div className="flex gap-3">
          {shouldShowNewModuleButton && (
            <Button
              color="warning"
              className="text-white"
              onPress={() => setViewState('new-module')}
              startContent={<PlusIcon size={18} />}
            >
              Nuevo módulo
            </Button>
          )}
          {viewState === 'new-module' && (
            <Button
              color="default"
              variant="flat"
              onPress={() => setViewState('list')}
              startContent={<ChevronLeftIcon size={18} />}
            >
              Volver a la lista
            </Button>
          )}
        </div>
      </div>

      {viewState === 'loading'
        && (
          <TableModulesSkeleton />
        )}

      {viewState === 'list' && (
        <>
          {modules.length > 0 ? (
            <TableModules
              openSubmoduleView={openSubmoduleView}
              onDeleteModule={onDeleteModule}
              modules={modules}
              submodules={submodules}
              loadingDelete={loadingDelete}
            />
          ) : (
            <NoModulesContent setViewState={setViewState} />
          )}
        </>
      )}

      {viewState === 'new-module' && (
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-center">Crear nuevo módulo</h2>
          <NewModuleForm onSaveModule={handleSaveModule} />
        </Card>
      )}

      {viewState === 'add-submodule' && currentModule && (
        <SubmoduleForm
          moduleName={currentModule.name}
          onSave={handleAddSubmodule}
          onBack={() => setViewState('list')}
        />
      )}
    </div>
  );
}
