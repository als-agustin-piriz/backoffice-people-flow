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

  const onChangeTitle = ({ target }) => {
    setTitle(target.value);
  };
  const onChangeDescription = ({ target }) => {
    setDescription(target.value);
  };

  const onFetchModule = () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: Module = {
      name: title,
      description,
      id: '',
      createdAt: '',
    };
    onSaveModule(module);
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
        <div className="flex justify-center">
          <Button onPress={onFetchModule} color="success" className="text-white">Guardar</Button>
        </div>
      </div>
    </div>
  );
};
