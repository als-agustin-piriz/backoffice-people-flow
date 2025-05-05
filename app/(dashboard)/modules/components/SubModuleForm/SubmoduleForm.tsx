import { useState } from 'react';
import { Button, Card } from '@heroui/react';
import { ChevronLeftIcon, PlusIcon } from 'lucide-react';
import { generateGuid } from '@/lib/utils';

export const SubmoduleForm = ({ moduleId, moduleName, onSave, onBack }) => {
  const [submoduleName, setSubmoduleName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveSubmodule = () => {
    if (!submoduleName) return;

    setSaving(true);

    // Simulamos una operación asíncrona
    setTimeout(() => {
      const newSubmodule = {
        id: generateGuid(),
        name: submoduleName,
        moduleId: moduleId,
      };

      onSave(newSubmodule);
      setSubmoduleName('');
      setSaving(false);
    }, 600);
  };

  return (
    <Card className="p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Agregar submódulo para {moduleName}</h2>
        <p className="text-gray-500 text-sm">ID del módulo: {moduleId}</p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="submoduleName">
            Nombre del submódulo
          </label>
          <input
            id="submoduleName"
            type="text"
            value={submoduleName}
            onChange={(e) => setSubmoduleName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            placeholder="Ingrese nombre del submódulo"
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          color="default"
          variant="flat"
          onPress={onBack}
          startContent={<ChevronLeftIcon size={16} />}
        >
          Volver
        </Button>
        <Button
          color="warning"
          onPress={handleSaveSubmodule}
          isLoading={saving}
          startContent={!saving && <PlusIcon size={16} />}
          isDisabled={!submoduleName}
        >
          Agregar submódulo
        </Button>
      </div>
    </Card>
  );
};