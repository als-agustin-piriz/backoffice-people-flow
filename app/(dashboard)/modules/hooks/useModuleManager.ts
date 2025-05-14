import { useEffect, useState } from 'react';
import { Module, Submodule } from '@/types/modules';
import { addToast } from '@heroui/react';
import { createModule } from '@/services/modules/createModule';
import { fetchModules } from '@/services/modules/fetchModules';
import { createSubModule } from '@/services/modules/createSubModule';
import { deleteModule } from '@/services/modules/deleteModule';
import { updateModule } from '@/services/modules/updateModule';


export const useModuleManager = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [submodules, setSubmodules] = useState<Submodule[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const saveModule = async (moduleData: Module) => {
    try {
      const data = await createModule(moduleData);
      if (data) {
        setModules((prev) => [...prev, data]);
        return data;
      }
      return null;
    } catch (err) {
      addToast({
        title: 'Error al crear módulo',
        color: 'danger',
      });
      console.log('Error creating module:', err);
      return null;
    }
  };

  const onUpdateModule = async (
    {
      moduleId,
      newDataModule,
    }: {
      moduleId: string;
      newDataModule: Module;
    }) => {
    try {
      const updated: Module = await updateModule({ moduleId, newDataModule });
      if (updated) {
        setModules((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m)),
        );
        addToast({
          title: 'Módulo actualizado',
          color: 'success',
        });
        return updated;
      }
      return false;
    } catch (err) {
      console.error('Error updating module:', err);
      addToast({
        title: 'Error al actualizar módulo',
        color: 'danger',
      });
      return false;
    }
  };


  const onDeleteModule = async (moduleData: Module) => {
    try {
      setLoadingDelete(true);
      if (moduleData.id) {
        const data = await deleteModule(moduleData.id);
        if (data) {
          setModules((prevModules) =>
            prevModules.filter((m) => m.id !== moduleData.id),
          );
          addToast({
            title: 'Módulo eliminado',
            color: 'success',
          });
          return true;
        }
        return false;
      }
    } catch (err) {
      addToast({
        title: 'Error al crear módulo',
        color: 'danger',
      });
      console.log('Error creating module:', err);
      return false;
    }
    setLoadingDelete(false);
    return false;
  };


  useEffect(() => {
    const onGetModules = async () => {
      setLoading(true);
      try {
        const modules = await fetchModules();
        setModules(modules.items);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
      setLoading(false);
    };

    onGetModules();
  }, []);

  const addSubModule = async (submodule: Submodule) => {
    try {
      const data: Submodule = await createSubModule(submodule);
      if (data) {
        setSubmodules((prev) => [...prev, data]);
        return data;
      }
      return null;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
      addToast({
        title: message,
        color: 'danger',
      });
      console.log('Error creating module:', err);
      return null;
    }
  };


  return {
    modules,
    submodules,
    saveModule,
    onUpdateModule,
    onDeleteModule,
    addSubModule,
    loadingModules: loading,
    loadingDelete: loadingDelete,
  };
};
