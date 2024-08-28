import { type RouteObject } from 'react-router-dom';

import { UserList } from '@/components/UserList';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <div className="h-screen text-center">
        <h1 className="py-6">Frontend</h1>
        <UserList />
      </div>
    ),
  },
];
