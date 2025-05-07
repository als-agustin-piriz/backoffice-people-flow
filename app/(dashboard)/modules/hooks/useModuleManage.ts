import { useEffect, useState } from 'react';
import { Module, Submodule } from '@/types/modules';
import { addToast } from '@heroui/react';
import { createModule } from '@/services/modules/createModule';
import { fetchModules } from '@/services/modules/fetchModules';


export const useModuleManager = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [submodules, setSubmodules] = useState<Submodule[]>([]);

  const saveModule = async (moduleData: Omit<Module, 'id' | 'createdAt'>) => {
    const newModule: Module = {
      ...moduleData,
      createdAt: new Date().toISOString(),
    };

    try {
      const data = await createModule(newModule);
      if (data) {
        setModules((prev) => [...prev, newModule]);
        return newModule;
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

  useEffect(() => {
    const onGetModules = async () => {
      try {
        const modules = await fetchModules();
        setModules(modules.items);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    onGetModules();
  }, []);

  const addSubModule = (submodule: Submodule) => {
    setSubmodules((prev) => [...prev, submodule]);
    return submodule;
  };


  return {
    modules,
    submodules,
    saveModule,
    addSubModule,
  };
};
