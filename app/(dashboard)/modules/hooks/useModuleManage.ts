import { useState } from 'react';
import { Module, Submodule } from '@/types/modules';
import { addToast } from '@heroui/react';
import { createModule } from '@/services/modules/createModule';
import { generateGuid } from '@/lib/utils';


export const useModuleManager = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [submodules, setSubmodules] = useState<Submodule[]>([]);

  const saveModule = async (moduleData: Omit<Module, 'id' | 'createdAt'>) => {
    const newModule: Module = {
      ...moduleData,
      id: generateGuid(),
      createdAt: new Date().toISOString(),
    };

    try {
      await createModule(newModule);
      setModules((prev) => [...prev, newModule]);
      return newModule;
    } catch (err) {
      addToast({
        title: 'Error al crear módulo',
        color: 'danger',
      });
      console.log('Error creating module:', err);
      return null;
    }
  };

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
