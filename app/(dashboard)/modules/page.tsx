'use client';
import { useEffect, useState } from 'react';
import { addToast, Button } from '@heroui/react';
import { ChevronLeftIcon, PlusIcon } from 'lucide-react';
import { CreateOrUpdateModule } from '@/app/(dashboard)/modules/components/NewModuleForm/CreateOrUpdateModule';
import { SubmoduleForm } from '@/app/(dashboard)/modules/components/SubModuleForm/SubmoduleForm';
import TableModules from '@/app/(dashboard)/modules/components/TableModules/TableModules';
import { Module, Submodule, ViewState } from '@/types/modules';
import NoModulesContent from '@/app/(dashboard)/modules/components/NoModulesContent/NoModulesContent';
import { useModuleManager } from '@/app/hooks/useModuleManager';
import TableModulesSkeleton from '@/app/(dashboard)/modules/components/TableModulesSkeleton/TableModulesSkeleton';

export default function ModulesPage() {
  const [viewState, setViewState] = useState<ViewState>('list');
  const [currentModule, setCurrentModule] = useState<Module | null>(null);

  const {
    saveModule,
    onUpdateModule,
    modules,
    addSubModule,
    loadingModules,
    loading,
    onDeleteModule,
    onDeleteSubmodule,
    onGetModules,
  } = useModuleManager();

  const shouldShowNewModuleButton = viewState === 'list' && modules.length > 0;
  const modeCreateOrUpdate = viewState === 'new-module' || viewState === 'edit-module';

  const handleSaveModule = async (moduleData: Module) => {
    if (moduleData) {
      const moduleSaved: Module | null = await saveModule(moduleData);
      if (moduleSaved) {
        addToast({
          title: 'Módulo creado',
          color: 'success',
        });
        setViewState('list');
      }
      setCurrentModule(null);
    }
  };

  const handleUpdateModule = async (moduleData: Module) => {
    if (moduleData?.id) {
      const moduleUpdated = await onUpdateModule({ moduleId: moduleData.id, newDataModule: moduleData });
      if (moduleUpdated) {
        addToast({
          title: 'Módulo actualizado',
          color: 'success',
        });
        setViewState('list');
      }
      setCurrentModule(null);
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
      setCurrentModule(null);
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

  const onBackList = () => {
    setCurrentModule(null);
    setViewState('list');
  };

  const onEditModule = (module: Module) => {
    setCurrentModule(module);
    setViewState('edit-module');
  };

  useEffect(() => {
    onGetModules();
  }, []);

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
          {modeCreateOrUpdate && (
            <Button
              color="default"
              variant="flat"
              onPress={onBackList}
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
              onEditModule={onEditModule}
              onDeleteModule={onDeleteModule}
              onDeleteSubmodule={onDeleteSubmodule}
              isLoadingDeleteSubmodule={loading}
              modules={modules}
              loadingDelete={loading}
            />
          ) : (
            <NoModulesContent setViewState={setViewState} />
          )}
        </>
      )}

      {modeCreateOrUpdate && (
        <div>
          <CreateOrUpdateModule
            onUpdateModule={handleUpdateModule}
            onSaveModule={handleSaveModule}
            module={currentModule}
            isModeUpdate={'edit-module' === viewState as string}
            isLoading={loading}
          />
        </div>
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
