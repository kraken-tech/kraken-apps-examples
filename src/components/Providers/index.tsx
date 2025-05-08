import { ReactNode, useState } from 'react';

import { TakoThemeProvider } from '@krakentech/tako';
import {
    QueryClient,
    QueryClientConfig,
    QueryClientProvider,
} from '@tanstack/react-query';

import { AppConfig } from '../../types/app';

import { ConfigProvider } from './Config';

export type CoreProviderProps = {
    children: ReactNode;
    /**
     * This is the config object that is passed to the `ConfigProvider` and is used to configure the app.
     * This is how the different apps can have every `core` component/utils scoped to them.
     */
    config: AppConfig;
    /**
     * There are some default options set for react-query, but you can override them through this prop.
     */
    queryClientConfig?: QueryClientConfig;
};

const defaultQueryClientConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
};

export const CoreProvider = ({
    children,
    config,
    queryClientConfig,
}: CoreProviderProps) => {
    const [queryClient] = useState(
        () => new QueryClient(queryClientConfig ?? defaultQueryClientConfig)
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider config={config}>
                {children && <TakoThemeProvider>{children}</TakoThemeProvider>}
            </ConfigProvider>
        </QueryClientProvider>
    );
};
