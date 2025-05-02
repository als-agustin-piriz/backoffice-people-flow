'use client';

import { Button } from '@heroui/react';
import { PlusCircleIcon, PlusIcon } from 'lucide-react';
import { ViewState } from '@/types/modules';

type Props = {
  setViewState: (view: ViewState) => void;
};

export default function NoModulesContent({ setViewState }: Props) {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <div className="mb-4">
        <PlusCircleIcon size={48} className="mx-auto text-gray-400" />
      </div>
      <h3 className="font-medium text-lg mb-2">No hay módulos registrados</h3>
      <p className="text-gray-500 mb-6">
        Crea tu primer módulo para comenzar
      </p>
      <Button
        color="warning"
        onPress={() => setViewState('new-module')}
        startContent={<PlusIcon size={18} />}
      >
        Nuevo módulo
      </Button>
    </div>
  );
}
