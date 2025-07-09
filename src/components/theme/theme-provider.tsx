'use client'

import React from 'react'
import {ThemeProvider as NextThemesProvider, ThemeProviderProps} from "next-themes"
import Header from '../layout/header';
import { cn } from '@/lib/utils';

interface ExtendedThemeProviderProp extends ThemeProviderProps{
    children:React.ReactNode;
    containerClassname? : string,


}

const ThemeProvider = (
    {
        children,
        containerClassname,
        ...props
        
    } : ExtendedThemeProviderProp
) => {
  return (
    <NextThemesProvider {...props}>
        <Header/>
        <main className={cn("container mx-auto px-4")}>
            {children}
        </main>
    </NextThemesProvider>
  )
}

export default ThemeProvider