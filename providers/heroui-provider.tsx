'use client';
import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';


export function ProviderHeroUi({ children }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}