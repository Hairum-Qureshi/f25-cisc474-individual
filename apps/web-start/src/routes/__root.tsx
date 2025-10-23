/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TanStackQueryDevtools from '../integrations/devtools';
import appCss from '../styles.css?url';
import Navbar from '../components/Navbar';
import type {QueryClient} from '@tanstack/react-query';
import type { User } from '../interfaces';

export interface MyRouterContext {
  queryClient: QueryClient;
}

const CURR_UID = 'cmh2ol4jb001ksb0rhr07fa3j';

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  loader: async (context) => {
    const courseID = (context.params as { courseID?: string }).courseID ?? '';

    const [courseRes, userRes] = await Promise.all([
      fetch(`${import.meta.env.VITE_BACKEND_URL}/courses/${courseID}`),
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${CURR_UID}`),
    ]);

    const [courseData, userData] = await Promise.all([
      courseRes.json(),
      userRes.json(),
    ]);

    return { courseData, userData };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const initialData = Route.useLoaderData();
  const [currUserData, setCurrUserData] = useState<User | undefined>();

  const { data: courseData } = useQuery({
    queryKey: ['currUserData'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${CURR_UID}`).then((r) =>
        r.json(),
      ),
    initialData,
  });

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col">
        <Navbar
          courseName={courseData?.courseName}
          courseID={courseData?.id}
          user={currUserData}
        />
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
