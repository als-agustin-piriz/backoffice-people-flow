import { useDisclosure } from '@heroui/react';
import { useState } from 'react';

export function useModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<'opaque' | 'blur' | 'transparent'>('opaque');

  const openWithBackdrop = (type: 'opaque' | 'blur' | 'transparent' = 'opaque') => {
    setBackdrop(type);
    onOpen();
  };

  return {
    isOpen,
    onOpen: openWithBackdrop,
    onClose,
    backdrop,
    setBackdrop,
  };
}
