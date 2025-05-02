'use client';

import React from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { Input, Textarea } from '@heroui/input';

type BackdropType = 'opaque' | 'blur' | 'transparent';

interface NewModuleModaProps {
  isOpen: boolean;
  onClose: () => void;
  backdrop: BackdropType;
  onSaveModule: () => void;
}

export const NewModuleModal: React.FC<NewModuleModaProps> = (
  {
    isOpen,
    onClose,
    backdrop,
  }) => {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const onChangeTitle = ({ target }) => {
    setTitle(target.value);
  };
  const onChangeDescription = ({ target }) => {
    setDescription(target.value);
  };

  return (
    <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onCloseFn) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center"> Nuevo módulo</ModalHeader>
            <ModalBody className="p-20">
              <div>
                <Input label="Título" onChange={onChangeTitle} size="sm" />
              </div>
              <div>
                <Textarea label="Descripción" onChange={onChangeDescription} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onCloseFn}>
                Cerrar
              </Button>
              <Button color="primary" onPress={onCloseFn}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
