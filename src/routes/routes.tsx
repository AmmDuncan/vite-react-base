import { type RouteObject } from 'react-router-dom';

import { Icon } from '@/components';
import { UserList } from '@/components/UserList';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <div className="h-screen text-center">
        <h1 className="py-6">Carduvy Frontend</h1>
        <Icon name="Eyedafd" />
        <UserList />
      </div>
    ),
  },
];
