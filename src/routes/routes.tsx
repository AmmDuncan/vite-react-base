import { UserList } from '@/components/UserList';
import { type RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <div className="h-screen text-center">
        <h1 className="py-6">Carduvy Frontend</h1>
        <UserList />
      </div>
    ),
  },
];
