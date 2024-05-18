'use client'

import dayjs from 'dayjs';
import 'dayjs/locale/tr'

import { SWRConfig } from 'swr'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react';

export const theme = extendTheme({
    fonts: {
        heading: 'var(--font-rubik)',
        body: 'var(--font-rubik)',
    }
});

dayjs.locale('tr')

export function Providers({ children }: { children: React.ReactNode }) {
    return (<SessionProvider>
        <ChakraProvider theme={theme}>
            <SWRConfig value={{
                refreshInterval: 3000,
                fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}>
                {children}
            </SWRConfig>
        </ChakraProvider>
    </SessionProvider>)
}