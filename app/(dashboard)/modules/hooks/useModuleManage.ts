import { useEffect, useState } from 'react';
import { Module, Submodule } from '@/types/modules';
import { addToast } from '@heroui/react';
import { createModule } from '@/services/modules/createModule';
import { fetchModules } from '@/services/modules/fetchModules';
import { createSubModule } from '@/services/modules/createSubModule';
import { deleteModule } from '@/services/modules/deleteModule';


export const useModuleManager = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [submodules, setSubmodules] = useState<Submodule[]>([]);
  const [loading, setLoading] = useState(false);

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

  const onDeleteModule = async (moduleData: Module) => {
    try {
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
          return data;
        }
        return null;
      }
    } catch (err) {
      addToast({
        title: 'Error al crear módulo',
        color: 'danger',
      });
      console.log('Error creating module:', err);
      return null;
    }
    return null;
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
    } catch (err) {
      addToast({
        title: 'Error al crear módulo',
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
    onDeleteModule,
    addSubModule,
    loadingModules: loading,
  };
};
