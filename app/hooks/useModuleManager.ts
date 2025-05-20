import { useState } from 'react';
import { Module, Submodule } from '@/types/modules';
import { addToast } from '@heroui/react';
import { createModule } from '@/services/modules/createModule';
import { fetchModules } from '@/services/modules/fetchModules';
import { createSubModule } from '@/services/modules/createSubModule';
import { deleteModule } from '@/services/modules/deleteModule';
import { updateModule } from '@/services/modules/updateModule';
import { deleteSubModule } from '@/services/modules/deleteSubModule';


export const useModuleManager = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingModules, setLoadingModules] = useState(false);

  const saveModule = async (moduleData: Module) => {
    try {
      setLoading(true);
      const data = await createModule(moduleData);
      if (data) {
        setModules((prev) => [...prev, data]);
        setLoading(false);
        return data;
      }
      setLoading(false);
      return null;
    } catch (err) {
      addToast({
        title: 'Error al crear módulo',
        color: 'danger',
      });
      console.log('Error creating module:', err);
      setLoading(false);
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
      setLoading(true);
      const updated: Module = await updateModule({ moduleId, newDataModule });
      if (updated) {
        setModules((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m)),
        );
        addToast({
          title: 'Módulo actualizado',
          color: 'success',
        });
        setLoading(false);
        return updated;
      }
      setLoading(false);
      return false;
    } catch (err) {
      console.error('Error updating module:', err);
      addToast({
        title: 'Error al actualizar módulo',
        color: 'danger',
      });
      setLoading(false);
      return false;
    }
  };


  const onDeleteModule = async (moduleData: Module) => {
    try {
      setLoading(true);
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
          setLoading(false);
          return true;
        }
        setLoading(false);
        return false;
      }
    } catch (err) {
      addToast({
        title: 'Error al crear módulo',
        color: 'danger',
      });
      setLoading(false);
      console.log('Error creating module:', err);
      return false;
    }
    setLoading(false);
    return false;
  };

  const onDeleteSubmodule = async (submoduleData: Submodule) => {
    try {
      setLoading(true);
      if (submoduleData.id) {
        const data = await deleteSubModule(submoduleData.id);
        if (data) {
          setModules((prevModules) => {
            return prevModules.map((mod) => {
              if (mod.id === submoduleData.moduleId) {
                return {
                  ...mod,
                  submodules: mod.submodules?.filter((sm) => sm.id !== submoduleData.id) || [],
                };
              }
              return mod;
            });
          });
          setLoading(false);
          return data;
        }
        setLoading(false);
        return false;
      }
    } catch (err) {
      addToast({
        title: 'Error al crear módulo',
        color: 'danger',
      });
      setLoading(false);
      console.log('Error creating module:', err);
      return false;
    }
    setLoading(false);
    return false;
  };

  const addSubModule = async (submodule: Submodule) => {
    try {
      setLoading(true);
      const data: Submodule = await createSubModule(submodule);

      if (data) {
        setModules((prevModules) => {
          return prevModules.map((mod) => {
            if (mod.id === data.moduleId) {
              const updatedSubmodules = mod.submodules ? [...mod.submodules, data] : [data];
              return { ...mod, submodules: updatedSubmodules };
            }
            return mod;
          });
        });

        setLoading(false);
        return data;
      }

      setLoading(false);
      return null;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
      addToast({
        title: message,
        color: 'danger',
      });
      console.log('Error creating submodule:', err);
      setLoading(false);
      return null;
    }
  };

  const onGetModules = async () => {
    setLoadingModules(true);
    try {
      const modules = await fetchModules();
      if (modules)
        setModules(modules.items);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
    setLoadingModules(false);
  };

  return {
    modules,
    saveModule,
    onUpdateModule,
    onDeleteModule,
    onDeleteSubmodule,
    addSubModule,
    loadingModules,
    loading,
    onGetModules,
  };
};
