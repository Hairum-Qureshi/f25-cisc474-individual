/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { useAuth0 } from '@auth0/auth0-react';
import TanStackQueryDevtools from '../integrations/devtools';
import appCss from '../styles.css?url';
import Navbar from '../components/Navbar';
import type { MyRouterContext } from '../interfaces';

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth0();
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col">
        {isAuthenticated && <Navbar />}
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
