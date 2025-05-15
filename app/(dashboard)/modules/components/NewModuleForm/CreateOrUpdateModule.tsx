'use client';

import React, { ChangeEvent } from 'react';
import { Input, Textarea } from '@heroui/input';
import { Module } from '@/types/modules';
import { Button } from '@heroui/react';
import { Hash, IndentIncrease } from 'lucide-react';

interface NewModuleFormProps {
  onSaveModule: (module: Module) => void;
  onUpdateModule: (module: Module) => void;
  isModeUpdate?: boolean;
  isLoading?: boolean;
  module?: Module | null;
}

export const CreateOrUpdateModule: React.FC<NewModuleFormProps> = (
  {
    onSaveModule,
    onUpdateModule,
    isModeUpdate = false,
    module = null,
    isLoading = false,
  }) => {
  const [title, setTitle] = React.useState<string>(module?.name || '');
  const [description, setDescription] = React.useState<string>(module?.description || '');
  const [basePrice, setBasePrice] = React.useState<string>(module?.basePrice.toString() || '');

  const onChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };
  const onChangeDescription = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setDescription(target.value);
  };
  const onChangePrice = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setBasePrice(target.value);
  };

  const onFetchModule = () => {
    const baseModule = {
      name: title,
      description,
      basePrice: Number(basePrice),
    };

    const dataModule: Module = isModeUpdate && module?.id
      ? { ...baseModule, id: module.id }
      : baseModule;

    if (isModeUpdate) {
      onUpdateModule(dataModule);
    } else {
      onSaveModule(dataModule);
    }
  };

  return (
    <div className="flex flex-col w-full items-center py-8 bg-gradient-to-br ">

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 p-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="white" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-black relative z-10 text-center">
            {isModeUpdate ? 'Actualizar módulo' : 'Crear nuevo módulo'}
          </h2>
        </div>

        <div className="p-6">
          <div className="flex gap-5 flex-col">
            <div className="relative">
              <Input
                label="Título"
                onChange={onChangeTitle}
                size="sm"
                className="border-gray-300 focus:border-blue-500"
                value={title}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Hash width={15} />
              </div>
            </div>

            <div className="relative">
              <Textarea
                label="Descripción"
                value={description}
                onChange={onChangeDescription}
                className="min-h-24 border-gray-300 focus:border-blue-500"
              />
              <div className="absolute right-3 top-6 text-gray-400">
                <IndentIncrease width={15} />
              </div>
            </div>

            <div className="relative">
              <Input
                label="Precio"
                value={basePrice}
                type="number"
                onChange={onChangePrice}
                size="sm"
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onPress={onFetchModule}
                color="success"
                isLoading={isLoading}
                className="text-white px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2"
              >
                {isModeUpdate ? 'Actualizar módulo' : 'Guardar módulo'}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
    ;
};
