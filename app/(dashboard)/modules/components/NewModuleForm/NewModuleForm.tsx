'use client';

import React from 'react';
import { Input, Textarea } from '@heroui/input';
import { Module } from '@/types/modules';
import { Button } from '@heroui/react';

interface NewModuleFormProps {
  onSaveModule: (module: Module) => void;
}

export const NewModuleForm: React.FC<NewModuleFormProps> = (
  {
    onSaveModule,
  }) => {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [basePrice, setBasePrice] = React.useState<string>('');

  const onChangeTitle = ({ target }: any) => {
    setTitle(target.value);
  };
  const onChangeDescription = ({ target }: any) => {
    setDescription(target.value);
  };
  const onChangePrice = ({ target }: any) => {
    setBasePrice(target.value);
  };

  const onFetchModule = () => {
    const dataModule = {
      name: title,
      description,
      basePrice: Number(basePrice),
    };
    onSaveModule(dataModule);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex gap-3 flex-col w-1/2">
        <div>
          <Input label="Título" onChange={onChangeTitle} size="sm" />
        </div>
        <div>
          <Textarea label="Descripción" onChange={onChangeDescription} />
        </div>
        <div>
          <Input label="Precio" type="number" onChange={onChangePrice} size="sm" />
        </div>
        <div className="flex justify-center">
          <Button onPress={onFetchModule} color="success" className="text-white">Guardar</Button>
        </div>
      </div>
    </div>
  );
};
