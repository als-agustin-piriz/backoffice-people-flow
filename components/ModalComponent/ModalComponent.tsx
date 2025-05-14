import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  backdrop?: 'opaque' | 'blur' | 'transparent';
  title: string;
  description: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  actionColor?: 'primary' | 'danger' | 'success' | 'warning';
  isLoading?: boolean;
}

export const ModalComponent = (
  {
    isOpen,
    onClose,
    backdrop = 'opaque',
    title,
    description,
    onAction,
    actionLabel = 'Aceptar',
    actionColor = 'primary',
    isLoading = false,
  }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop={backdrop}>
      <ModalContent>
        <>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{description}</ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancelar
            </Button>
            {onAction && (
              <Button color={actionColor} onPress={onAction} isLoading={isLoading}>
                {actionLabel}
              </Button>
            )}
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
