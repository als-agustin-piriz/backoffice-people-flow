'use client';
import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/react';

export function ProviderHeroUi({ children }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      {children}
    </HeroUIProvider>
  );
}