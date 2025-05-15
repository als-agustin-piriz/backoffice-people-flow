'use client';
import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/react';
import { PropsWithChildren } from 'react';

export function ProviderHeroUi({ children }: PropsWithChildren) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" maxVisibleToasts={1} />
      {children}
    </HeroUIProvider>
  );
}