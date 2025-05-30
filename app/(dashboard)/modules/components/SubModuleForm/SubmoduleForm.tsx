import { useState } from 'react';
import { Button, Card } from '@heroui/react';
import { ChevronLeftIcon, PlusIcon } from 'lucide-react';
import { Submodule } from '@/types/modules';

export const SubmoduleForm = ({ moduleName, onSave, onBack }: {
  moduleName: string,
  onSave: (subModule: Submodule) => void,
  onBack: () => void
}) => {
  const [submoduleName, setSubmoduleName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveSubmodule = () => {
    if (!submoduleName) return;
    setSaving(true);

    setTimeout(() => {
      const newSubmodule: Submodule = {
        name: submoduleName,
      };
      onSave(newSubmodule);
      setSubmoduleName('');
      setSaving(false);
    }, 600);
  };

  return (
    <Card className="p-6 shadow-md min-h-[400px] h-full">
      <div className="flex flex-col h-full justify-between">

        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Agregar submódulo para {moduleName}</h2>
          </div>

          <div className="space-y-4 mb-6 w-1/2">
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
        </div>

        <div className="flex gap-3 mt-36">
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
      </div>
    </Card>
  );
};
